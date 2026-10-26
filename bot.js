// Botning asosiy mantig'i. Telegram'dan kelgan har bir xabarga javob beradi.
import { products, categories } from "./data.js";

const KATALOG = "📋 Katalog";

export function createBot({ token, photoOf }) {
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
    keyboard: [[{ text: KATALOG }]],
    resize_keyboard: true,
    is_persistent: true,
  };

  const categoryMenu = () => ({
    inline_keyboard: categories.map((c) => [{ text: c.title, callback_data: `c:${c.id}` }]),
  });

  const productMenu = (cat) => ({
    inline_keyboard: [
      ...cat.items.map((id) => [{ text: products[id].name, callback_data: `p:${id}:${cat.id}` }]),
      [{ text: "⬅️ Bo'limlarga qaytish", callback_data: "k" }],
    ],
  });

  const caption = (p) => {
    const parts = [`<b>${p.name}</b>`];
    if (p.tarkibi) parts.push(`<b>Tarkibi:</b> ${p.tarkibi}`);
    parts.push(`<b>Foydasi:</b> ${p.foydasi}`);
    if (p.ehtiyot) parts.push(`⚠️ ${p.ehtiyot}`);
    parts.push(`<b>Qo'llanilishi:</b> ${p.qollanilishi}`);
    if (p.saqlash) parts.push(`<i>${p.saqlash}</i>`);
    return parts.join("\n\n");
  };

  const sendCatalog = (chatId) =>
    call("sendMessage", {
      chat_id: chatId,
      text: "Qaysi kasallik bo'yicha mahsulot kerak? Bo'limni tanlang:",
      reply_markup: categoryMenu(),
    });

  async function handle(update) {
    const msg = update.message;
    if (msg?.text) {
      const t = msg.text.trim();
      if (t.startsWith("/start")) {
        await call("sendMessage", {
          chat_id: msg.chat.id,
          text: "Assalomu alaykum! Tabiiy giyoh mahsulotlarimiz katalogiga xush kelibsiz.\n\nPastdagi «📋 Katalog» tugmasini bosing.",
          reply_markup: mainKeyboard,
        });
        return sendCatalog(msg.chat.id);
      }
      if (t === KATALOG || t.startsWith("/katalog")) return sendCatalog(msg.chat.id);
      return call("sendMessage", { chat_id: msg.chat.id, text: "Mahsulotlarni ko'rish uchun «📋 Katalog» tugmasini bosing.", reply_markup: mainKeyboard });
    }

    const cb = update.callback_query;
    if (!cb) return;
    const chatId = cb.message.chat.id;
    const msgId = cb.message.message_id;
    await call("answerCallbackQuery", { callback_query_id: cb.id });
    const [kind, a, b] = cb.data.split(":");

    if (kind === "k") {
      if (cb.message.photo) return sendCatalog(chatId);
      return call("editMessageText", { chat_id: chatId, message_id: msgId, text: "Qaysi kasallik bo'yicha mahsulot kerak? Bo'limni tanlang:", reply_markup: categoryMenu() });
    }
    if (kind === "c") {
      const cat = categories.find((c) => c.id === a);
      if (!cat) return;
      const text = `<b>${cat.title}</b>\n\nMahsulotni tanlang:`;
      if (cb.message.photo) return call("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", reply_markup: productMenu(cat) });
      return call("editMessageText", { chat_id: chatId, message_id: msgId, text, parse_mode: "HTML", reply_markup: productMenu(cat) });
    }
    if (kind === "p") {
      const p = products[a];
      if (!p) return;
      return call("sendPhoto", {
        chat_id: chatId,
        photo: photoOf(a),
        caption: caption(p),
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⬅️ Shu bo'limga qaytish", callback_data: `c:${b || "hammasi"}` }],
            [{ text: "📋 Barcha bo'limlar", callback_data: "k" }],
          ],
        },
      });
    }
  }

  async function setup(webhookUrl, secret) {
    await call("setMyCommands", {
      commands: [
        { command: "start", description: "Boshlash" },
        { command: "katalog", description: "Mahsulotlar katalogi" },
      ],
    });
    await call("setChatMenuButton", { menu_button: { type: "commands" } });
    if (webhookUrl) return call("setWebhook", { url: webhookUrl, secret_token: secret, allowed_updates: ["message", "callback_query"] });
  }

  return { handle, setup, call, caption };
}
