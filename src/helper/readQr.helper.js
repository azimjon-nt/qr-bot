const Jimp = require("jimp");
const fs = require("fs");
const qrCodeReader = require("qrcode-reader");
const { BOT_TOKEN } = require("../config/env.vars");

function readQr(filePath) {
  const imageUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
  console.log(imageUrl);

  return new Promise((resolve, reject) => {
    Jimp.read(imageUrl, function (err, image) {
      if (err) {
        reject(err);
      }

      const qrCodeInstance = new qrCodeReader();

      qrCodeInstance.callback = function (err, value) {
        if (err) {
          reject(err);
        }

        resolve(value.result);
      };

      qrCodeInstance.decode(image.bitmap);
    });
  });
}

module.exports = readQr;
