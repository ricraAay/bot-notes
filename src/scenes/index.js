const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const Extra = require("telegraf/extra")
const Notes = require("../Notes/Notes")
const setTimeNote = require("../../utils/setTimeNote")

class SceneControll {

	constructor() {
		this.dataUser = {}
	}

	NotesType() {
		const sceneNotesType = new Scene("NotesType")
		
		sceneNotesType.enter(ctx => {
			ctx.reply(
				`${ctx.message.from.first_name}, ну давай начнем 🚀`,
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
		const scenesetTimeNotes = new Scene("SetDateAndTimeNotes")

		scenesetTimeNotes.enter(ctx => {
			ctx.reply("Когда нужно будет тебя оповестить? 🧐\n<i>(формат ввода времени: чч:мм>')</i>",
				Extra.HTML()
			)
		})

		scenesetTimeNotes.on("text", ctx => {
			if(!ctx.message.text) {
				return ctx.scene.reenter()
			}

			const userTime = ctx.message.text

			if(!userTime || !userTime.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
				ctx.reply("Давай попробуем еще раз...😏")
				return ctx.scene.reenter()
			}		
			console.log(typeof userTime);
			const period = setTimeNote(userTime)

			console.log(period)

			if(period < 0) {
				ctx.reply(`Прости, но я не док Браун\nДавай попробуем еще раз...😏`)
				return ctx.scene.reenter()
			} 
			
			const notes = new Notes(this.dataUser)

			setTimeout(() => {
				ctx.reply(`📍Эй, не забудь: \n — ${ notes.msg }`)
			}, period)
			
			ctx.reply("Так, ну вроде запомнил 😅\nКак время подойдет оповещу ⏰")

			ctx.scene.leave()

		}) 

		scenesetTimeNotes.leave()

		return scenesetTimeNotes
	}
} 

module.exports = new SceneControll()