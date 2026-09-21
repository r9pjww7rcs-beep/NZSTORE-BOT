const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");
const qrcode = require("qrcode-terminal");

const catalog = require("./catalog");
const database = require("./database");

async function startBot() {

  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" })
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {

    const { connection, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
      console.log("Scan QR WhatsApp");
    }

    if (connection === "open") {
      console.log("NZSTORE BOT CONNECTED");
      console.log("Kategori:", Object.keys(catalog));
    }

    if (connection === "close") {
      console.log("Connection closed");
      startBot();
    }

  });

}

startBot();
