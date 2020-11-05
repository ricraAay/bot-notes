require('dotenv').config()

const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const session = require('telegraf/session')

const SceneControll = require("./src/scenes")
const helpCommands = require("./utils/helpCommands")

const bot = new Telegraf(process.env.BOT_TOKEN)

const stage = new Stage([
	SceneControll.NotesType(),
	SceneControll.CreateNotes(),
	SceneControll.SetDateAndTimeNotes()
]) 

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => {
	ctx.scene.enter("NotesType")
})

bot.help(ctx => {
	ctx.reply(helpCommands)
})

bot.catch((err, ctx) => {
	console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.startPolling()

console.log("bot started")

