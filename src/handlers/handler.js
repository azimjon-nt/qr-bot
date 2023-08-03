const { Keyboard, InputFile } = require("grammy");
const { GET_QR, SCAN_QR, ABOUT_US } = require("../enums/keyboard.vars");
const generateQr = require("../helper/generateQr.helper");
const readQr = require("../helper/readQr.helper");

class Handler {
  start(ctx, mainMenu) {
    try {
      const user = ctx.from;

      // dbga salqash

      const labels = [GET_QR, SCAN_QR, ABOUT_US];

      const buttonRows = [[Keyboard.text(GET_QR), Keyboard.text(SCAN_QR), Keyboard.text(ABOUT_US)]];

      const keyboard = Keyboard.from(buttonRows).resized().oneTime(true);

      if (mainMenu === true) {
        return ctx.reply(`<b><i>Botdan foydalanish uchun menyulardan birini tanlang</i></b> 👇`, {
          parse_mode: "HTML",
          reply_markup: keyboard,
        });
      }

      return ctx.reply(
        `Assalomu Aleykum,<a href="tg://user?id=${user.id}"> ${user.first_name} ${user.last_name}</a>`,
        {
          parse_mode: "HTML",
          reply_markup: keyboard,
        }
      );
    } catch (err) {}
  }

  getQr(ctx) {
    try {
      ctx.session.menu = GET_QR;
      ctx.reply("Marhamat endi url(text) ni tashlang va men sizga QR kodga o'girib beraman!");
    } catch (err) {}
  }

  scanQr(ctx) {
    ctx.session.menu = SCAN_QR;
    ctx.reply("Marha.reply_markup va men sizga ulr(text)ni qaytaraman");
  }

  async handleImage(ctx) {
    try {
      const file = await ctx.getFile();

      console.log(file.file_path);

      const result = await readQr(file.file_path);

      console.log(result);

      ctx.reply(result);
    } catch (err) {}
  }

  async message(ctx) {
    try {
      const text = ctx.msg.text;

      switch (ctx.session.menu) {
        case SCAN_QR:
          return this.handleImage(ctx);

        case GET_QR:
          {
            const filePath = await generateQr(text);
            await ctx.replyWithPhoto(new InputFile(filePath));
          }
          break;

        default: {
          this.start(ctx, true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  aboutUs(ctx) {
    try {
      ctx.reply("N120 guruhi");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new Handler();
