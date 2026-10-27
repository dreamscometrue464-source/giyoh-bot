// Telegram bot: katalog Mini App (index.html) orqali ochiladi.
// Asosiy mahsulotlar index.html ichida, admin qo'shganlari ma'lumot omborida (api/_db.js).
// Admin buyruqlari: /qosh, /ochir, /bekor, /admin <maxfiy so'z>
// Bir martalik sozlash: https://<loyiha>.vercel.app/api/webhook?setup=<WEBHOOK_SECRET>

const db = require("./_db");

const SKIP = "⏭ O'tkazish";
const CANCEL = "❌ Bekor qilish";
const SAVE = "✅ Saqlash";
const NEWCAT = "➕ Yangi bo'lim";
const YES = "🗑 Ha, o'chirilsin";

function createBot({ token, webAppUrl, base }) {
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

  // Pastdagi doimiy tugma: bosilganda katalog Mini App bo'lib ochiladi
  const mainKeyboard = {
    keyboard: [[{ text: "🛍 Katalog", web_app: { url: webAppUrl } }]],
    resize_keyboard: true,
    is_persistent: true,
  };
  const openButton = { inline_keyboard: [[{ text: "🛍 Katalogni ochish", web_app: { url: webAppUrl } }]] };
  const kb = rows => ({ keyboard: rows.map(r => r.map(text => ({ text }))), resize_keyboard: true });
  const send = (chat_id, text, reply_markup = mainKeyboard) => call("sendMessage", { chat_id, text, reply_markup });

  // Asosiy katalogni index.html dan o'qiymiz
  let baseCache = null;
  async function baseCatalog() {
    if (baseCache) return baseCache;
    const html = await (await fetch(`${base}/index.html`)).text();
    const m = html.match(/const DATA = (\{.*?\});\n/s);
    baseCache = m ? JSON.parse(m[1]) : { products: [], categories: [] };
    return baseCache;
  }
  async function catalog() {
    const [b, extra, hidden, cats] = await Promise.all([
      baseCatalog(),
      db.getJSON(db.K.extra, []),
      db.getJSON(db.K.hidden, []),
      db.getJSON(db.K.cats, []),
    ]);
    const products = [...b.products, ...extra].filter(p => !hidden.includes(p.id));
    const categories = [...b.categories.map(c => ({ id: c.id, title: c.title })), ...cats];
    const inCat = (c, p) => (b.categories.find(x => x.id === c.id)?.items || []).includes(p.id) || (p.c || []).includes(c.id);
    return { b, extra, hidden, cats, products, categories, inCat };
  }

  async function isAdmin(id) {
    const env = (process.env.ADMIN_IDS || "").split(",").map(s => s.trim()).filter(Boolean);
    if (env.includes(String(id))) return true;
    return (await db.getJSON(db.K.admins, [])).includes(id);
  }

  const photoId = msg =>
    msg.photo ? msg.photo[msg.photo.length - 1].file_id
    : msg.document && /^image\//.test(msg.document.mime_type || "") ? msg.document.file_id
    : null;

  // /qosh qadamlari
  const STEPS = [
    { k: "reklama", photo: true, q: "1/10. Reklama rasmini yuboring." },
    { k: "foyuz", photo: true, skip: true, q: "2/10. «Фойдаси» rasmini (o'zbekcha) yuboring." },
    { k: "foyru", photo: true, skip: true, q: "3/10. «Польза» rasmini (ruscha) yuboring." },
    { k: "shisha", photo: true, skip: true, q: "4/10. Kartochka uchun mahsulot rasmini yuboring (o'tkazsangiz, reklama rasmi qo'yiladi)." },
    { k: "name", q: "5/10. Mahsulot nomini yozing. Masalan: Долчин — Корица" },
    { k: "hajmi", skip: true, q: "6/10. Hajmini yozing. Masalan: 150 мл" },
    { k: "tarkibi", skip: true, q: "7/10. Tarkibini yozing." },
    { k: "istemoli", skip: true, q: "8/10. Iste'mol qilish tartibini yozing." },
    { k: "foydasi", skip: true, q: "9/10. Foydasini yozing, har bir foydasi alohida qatorda." },
    { k: "bolim", q: "10/10. Bo'limni tanlang (bir nechta tanlash mumkin), keyin «✅ Saqlash» ni bosing." },
  ];

  async function ask(chatId, st) {
    const step = STEPS[st.i];
    if (step.k === "bolim") {
      const { categories } = await catalog();
      const rows = [];
      for (let i = 0; i < categories.length; i += 2)
        rows.push(categories.slice(i, i + 2).map(c => ((st.d.c || []).includes(c.id) ? "✅ " : "") + c.title));
      rows.push([NEWCAT], [SAVE, CANCEL]);
      return send(chatId, step.q, kb(rows));
    }
    return send(chatId, step.q, kb(step.skip ? [[SKIP, CANCEL]] : [[CANCEL]]));
  }

  async function saveProduct(chatId, d) {
    const extra = await db.getJSON(db.K.extra, []);
    const { b } = await catalog();
    const max = Math.max(0, ...[...b.products, ...extra].map(p => parseInt(p.id, 10) || 0));
    const id = String(max + 1).padStart(2, "0");
    const imgs = [d.reklama, d.foyuz, d.foyru].filter(Boolean);
    extra.push({
      id, name: d.name, name_ru: "", tarkibi: d.tarkibi || "", istemoli: d.istemoli || "", ogoh: "",
      hajmi: d.hajmi || "", muddati: "",
      foydasi: (d.foydasi || "").split("\n").map(s => s.trim()).filter(Boolean),
      foydasi_ru: [], c: d.c, imgs, thumb: d.shisha || d.reklama,
    });
    await db.setJSON(db.K.extra, extra);
    await db.del(db.K.state(chatId));
    return send(chatId, `✅ Qo'shildi: ${d.name} (№${id}). Katalogni ochib ko'ring.`);
  }

  async function wizard(msg, st) {
    const chatId = msg.chat.id, text = (msg.text || "").trim();
    const save = s => db.setJSON(db.K.state(chatId), s, 86400);

    // --- qo'shish ---
    if (st.t === "qosh") {
      const step = STEPS[st.i];
      if (step.k === "bolim") {
        const { categories } = await catalog();
        if (text === SAVE) {
          if (!(st.d.c || []).length) return send(chatId, "Kamida bitta bo'lim tanlang.");
          return saveProduct(chatId, st.d);
        }
        if (text === NEWCAT) { st.newcat = true; await save(st); return send(chatId, "Yangi bo'lim nomini yozing:", kb([[CANCEL]])); }
        if (st.newcat && text) {
          const cats = await db.getJSON(db.K.cats, []);
          const c = { id: "b" + Date.now().toString(36), title: text };
          cats.push(c);
          await db.setJSON(db.K.cats, cats);
          st.newcat = false;
          st.d.c = [...(st.d.c || []), c.id];
          await save(st);
          return ask(chatId, st);
        }
        const c = categories.find(x => x.title === text.replace(/^✅ /, ""));
        if (!c) return ask(chatId, st);
        const sel = st.d.c || [];
        st.d.c = sel.includes(c.id) ? sel.filter(x => x !== c.id) : [...sel, c.id];
        await save(st);
        return ask(chatId, st);
      }
      if (text === SKIP && step.skip) {
        st.i++;
      } else if (step.photo) {
        const f = photoId(msg);
        if (!f) return send(chatId, "Rasm yuboring" + (step.skip ? " yoki «O'tkazish» ni bosing." : "."), kb(step.skip ? [[SKIP, CANCEL]] : [[CANCEL]]));
        st.d[step.k] = f;
        st.i++;
      } else {
        if (!text) return ask(chatId, st);
        st.d[step.k] = text;
        st.i++;
      }
      await save(st);
      return ask(chatId, st);
    }

    // --- o'chirish ---
    if (st.t === "ochir") {
      const cat = await catalog();
      if (st.s === "bolim") {
        const c = cat.categories.find(x => x.title === text);
        if (!c) return send(chatId, "Ro'yxatdagi bo'limni tanlang.");
        const items = cat.products.filter(p => cat.inCat(c, p));
        if (!items.length) return send(chatId, "Bu bo'limda mahsulot yo'q.");
        st.s = "mahsulot";
        await save(st);
        return send(chatId, "Qaysi mahsulotni o'chiramiz?", kb([...items.map(p => [`${p.id}. ${p.name}`]), [CANCEL]]));
      }
      if (st.s === "mahsulot") {
        const p = cat.products.find(x => text.startsWith(x.id + ". "));
        if (!p) return send(chatId, "Ro'yxatdagi mahsulotni tanlang.");
        st.s = "tasdiq"; st.id = p.id;
        await save(st);
        return send(chatId, `«${p.name}» katalogdan o'chirilsinmi?`, kb([[YES], [CANCEL]]));
      }
      if (st.s === "tasdiq" && text === YES) {
        if (cat.extra.some(p => p.id === st.id)) {
          await db.setJSON(db.K.extra, cat.extra.filter(p => p.id !== st.id));
        } else {
          await db.setJSON(db.K.hidden, [...cat.hidden, st.id]);
        }
        await db.del(db.K.state(chatId));
        return send(chatId, `🗑 №${st.id} katalogdan o'chirildi.`);
      }
      return send(chatId, "Tugmalardan birini bosing.");
    }
  }

  async function admin(msg) {
    const chatId = msg.chat.id, text = (msg.text || "").trim();
    if (text === "/bekor" || text === CANCEL) {
      await db.del(db.K.state(chatId));
      return send(chatId, "Bekor qilindi.");
    }
    if (text === "/qosh") {
      const st = { t: "qosh", i: 0, d: {} };
      await db.setJSON(db.K.state(chatId), st, 86400);
      return ask(chatId, st);
    }
    if (text === "/ochir") {
      const { categories } = await catalog();
      await db.setJSON(db.K.state(chatId), { t: "ochir", s: "bolim" }, 86400);
      const rows = [];
      for (let i = 0; i < categories.length; i += 2) rows.push(categories.slice(i, i + 2).map(c => c.title));
      return send(chatId, "Qaysi bo'limdan o'chiramiz?", kb([...rows, [CANCEL]]));
    }
    if (text === "/yordam" || text === "/admin") {
      return send(chatId, "Admin buyruqlari:\n/qosh — yangi mahsulot qo'shish\n/ochir — mahsulotni o'chirish\n/bekor — boshlangan ishni bekor qilish");
    }
    const st = await db.getJSON(db.K.state(chatId), null);
    if (st) { await wizard(msg, st); return true; }
    return false;
  }

  async function handle(update) {
    const msg = update.message;
    if (!msg?.chat) return;
    const text = (msg.text || "").trim();

    // Admin bo'lish: /admin <WEBHOOK_SECRET>
    const m = text.match(/^\/admin\s+(\S+)/);
    if (m && db.ready()) {
      if (m[1] !== process.env.WEBHOOK_SECRET) return send(msg.chat.id, "So'z noto'g'ri.");
      const list = await db.getJSON(db.K.admins, []);
      if (!list.includes(msg.from.id)) await db.setJSON(db.K.admins, [...list, msg.from.id]);
      return send(msg.chat.id, "✅ Siz admin bo'ldingiz.\n/qosh — yangi mahsulot qo'shish\n/ochir — mahsulotni o'chirish\n/bekor — bekor qilish");
    }
    if (db.ready() && msg.from && (await isAdmin(msg.from.id))) {
      const done = await admin(msg);
      if (done !== false) return;
    } else if (/^\/(qosh|ochir)/.test(text)) {
      return send(msg.chat.id, db.ready() ? "Bu buyruq faqat admin uchun." : "Ma'lumot ombori hali ulanmagan.");
    }

    if (text.startsWith("/start")) {
      await send(msg.chat.id, "Assalomu alaykum! Tabiiy giyoh mahsulotlarimiz katalogiga xush kelibsiz. Mahsulotlar bo'limlar bo'yicha saralangan.");
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
  const bot = createBot({ token: process.env.BOT_TOKEN, webAppUrl: `${base}/`, base });
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
    try {
      const chat = req.body?.message?.chat?.id;
      if (chat) await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chat, text: "Xatolik: " + e.message }),
      });
    } catch {}
  }
  res.status(200).send("ok");
};
