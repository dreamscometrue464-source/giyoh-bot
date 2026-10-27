// Telegram bot: katalog Mini App (index.html) orqali ochiladi.
// Mahsulotlar ro'yxati index.html ichida, rasmlar ildizda.
// Bir martalik sozlash: https://<loyiha>.vercel.app/api/webhook?setup=<WEBHOOK_SECRET>

function createBot({ token, webAppUrl }) {
  const call = async (method, body) => {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!data.ok) console.error(method, data.description);
    return data;
  };

  const mainKeyboard = {
    keyboard: [[{ text: "🛍 Katalog", web_app: { url: webAppUrl } }]],
    resize_keyboard: true,
    is_persistent: true,
  };
  const openButton = { inline_keyboard: [[{ text: "🛍 Katalogni ochish", web_app: { url: webAppUrl } }]] };

  async function handle(update) {
    const msg = update.message;
    if (!msg?.chat) return;
    if (msg.text?.trim().startsWith("/start")) {
      await call("sendMessage", {
        chat_id: msg.chat.id,
        text: "Assalomu alaykum! Tabiiy giyoh mahsulotlarimiz katalogiga xush kelibsiz. 68 xil tabiiy mahsulot bo'limlar bo'yicha saralangan.",
        reply_markup: mainKeyboard,
      });
    }
    return call("sendMessage", {
      chat_id: msg.chat.id,
      text: "Mahsulotlarni rasmlari bilan ko'rish uchun tugmani bosing:",
      reply_markup: openButton,
    });
  }

  async function setup(webhookUrl, secret) {
    await call("setMyCommands", {
      commands: [
        { command: "start", description: "Boshlash" },
        { command: "katalog", description: "Mahsulotlar katalogi" },
      ],
    });
    await call("setChatMenuButton", { menu_button: { type: "web_app", text: "Katalog", web_app: { url: webAppUrl } } });
    return call("setWebhook", { url: webhookUrl, secret_token: secret, allowed_updates: ["message"] });
  }

  return { handle, setup };
}

module.exports = async function handler(req, res) {
  const base = `https://${req.headers.host}`;
  const bot = createBot({ token: process.env.BOT_TOKEN, webAppUrl: `${base}/` });
  const secret = process.env.WEBHOOK_SECRET;
  if (req.method !== "POST") {
    if (secret && req.query && req.query.setup === secret) {
      const r = await bot.setup(`${base}/api/webhook`, secret);
      return res.status(200).json(r);
    }
    return res.status(200).send("Bot ishlayapti");
  }
  if (secret && req.headers["x-telegram-bot-api-secret-token"] !== secret) return res.status(401).send("no");
  try {
    await bot.handle(req.body);
  } catch (e) {
    console.error(e);
  }
  res.status(200).send("ok");
};
