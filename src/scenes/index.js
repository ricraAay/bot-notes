const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const Extra = require("telegraf/extra")
const Notes = require("../Notes/Notes")
const setDateAndTimeNote = require("../../utils/timer")

class SceneControll {

	constructor() {
		this.dataUser = {}
	}

	NotesType() {
		const sceneNotesType = new Scene("NotesType")
		
		sceneNotesType.enter(ctx => {
			ctx.reply(
				`${ctx.message.from.first_name}, ну давай начнем 😎`,
				Markup.inlineKeyboard([
					Markup.callbackButton("Новая заметка", "temporaryNotes")
				]).extra()
			)
		})

		sceneNotesType.action("temporaryNotes", ctx => {
			this.dataUser.NotesType = "temporaryNotes"
			ctx.scene.enter("CreateNotes")
		})

		return sceneNotesType
	}

	CreateNotes() {
		const sceneCreateNotes = new Scene("CreateNotes")
		sceneCreateNotes.enter(ctx => {
			ctx.reply("Ты ж без меня не справишься, что тебе напомнить? ✍🏼🧐")
		})

		sceneCreateNotes.on("message", ctx => {
			if(!ctx.message.text) {
				ctx.reply("Нет, давай все же по старинке, текстом 🙄")
				return ctx.scene.reenter()
			} 
			
			this.dataUser.chatId = ctx.message.chat.id
			this.dataUser.msg = ctx.message.text

			ctx.scene.enter("SetDateAndTimeNotes")
		})

		return sceneCreateNotes
	}

	SetDateAndTimeNotes() {
		const sceneSetDateAndTimeNotes = new Scene("SetDateAndTimeNotes")

		sceneSetDateAndTimeNotes.enter(ctx => {
			ctx.reply("Когда нужно будет тебя оповестить?\n<i>(формат ввода даты и времени: дд.мм.гггг чч:мм>')</i>",
				Extra.HTML()
			)
		})

		sceneSetDateAndTimeNotes.on("text", ctx => {
			if(!ctx.message.text) {
				return ctx.scene.reenter()
			}

			/* this.dataUser.dateAndTime = new Date(ctx.message.text) */
			const time = setDateAndTimeNote(ctx.message.text)
			
			if(!time && !Number(time) ) {
				ctx.reply("Давай попробуем еще раз...")
				return ctx.scene.reenter()
			}

			const notes = new Notes(this.dataUser)

			console.log(time);

			setTimeout(() => {
				ctx.reply(`📍Напоминаю:\n — ${notes.msg}`)
			}, time)

			ctx.scene.leave()

		}) 

		sceneSetDateAndTimeNotes.leave(ctx => {
			ctx.reply('Так, вроде запомнил 🤔\nКак время подойдет оповещу ⏰')
		})

		return sceneSetDateAndTimeNotes
	}
} 

module.exports = new SceneControll()