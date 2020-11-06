require('dotenv').config()

const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const session = require('telegraf/session')
const Markup = require('telegraf/markup')

const SceneControll = require("./src/scenes")
const { resize } = require('telegraf/markup')

const bot = new Telegraf(process.env.BOT_TOKEN)

const stage = new Stage([
	SceneControll.NotesType(),
	SceneControll.CreateNotes(),
	SceneControll.SetDateAndTimeNotes()
]) 

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => {
	ctx.reply(`${ctx.message.from.first_name}, ну давай начнем 🚀`,
		Markup.keyboard([
			["Начать"]
		]).resize().oneTime().extra()
	)
})

bot.hears("Начать", ctx => {
	ctx.scene.enter("NotesType")
})

bot.catch((err, ctx) => {
	console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.startPolling()

console.log("bot started")

