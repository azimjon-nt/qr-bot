const { Bot, session } = require("grammy");
const handler = require("./handlers/handler");

const { GET_QR, SCAN_QR, ABOUT_US } = require("./enums/keyboard.vars");

const { BOT_TOKEN } = require("./config/env.vars");

const bot = new Bot(BOT_TOKEN);

function initial() {
  return { menu: null };
}

bot.use(session({ initial }));

bot.command("start", handler.start.bind(handler));

bot.hears(GET_QR, handler.getQr.bind(handler));
bot.hears(SCAN_QR, handler.scanQr.bind(handler));
bot.hears(ABOUT_US, handler.aboutUs.bind(handler));

bot.on("message", handler.message.bind(handler));

bot.start();
console.log("bot started");
