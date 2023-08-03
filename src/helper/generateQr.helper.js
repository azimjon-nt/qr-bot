const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

function generateQr(payload) {
  const fileUrl = path.join(process.cwd(), "images", `${uuidv4()}.png`);
  console.log(fileUrl, payload);

  return new Promise((resolve, reject) => {
    QRCode.toFile(
      fileUrl,
      payload,
      {
        color: {
          dark: "#00F",
          light: "#0000",
        },
      },
      function (err) {
        if (err) reject(err);
        return resolve(fileUrl);
      }
    );
  });
}

module.exports = generateQr;
