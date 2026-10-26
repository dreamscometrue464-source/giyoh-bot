// Mahsulotlar va kasallik bo'limlari.
// Matnlar yorliqlardagi matndan lotin yozuviga o'girilgan.

const ILIQ_SAQLASH = "Quruq, yorug'likdan himoyalangan joyda, +5°C dan +25°C gacha haroratda saqlansin.";

const products = {
  romashka: {
    name: "Romashka, Kalendula, Tisyachelistnik yig'masi",
    tarkibi: "Romashka, Kalendula, Tisyachelistnik.",
    foydasi:
      "Oshqozon gastriti, pankreatit, qorataloq shishganda, enterokolit (ingichka ichak) kasalliklarida foyda beradi. " +
      "Ovqat hazmiga foyda berib, jig'ildon qaynashini davolaydi, ishtahani ochadi, xiltlarni pishiradi, tozalovchi xususiyatga ega. " +
      "Ayniqsa balg'am mizojlarga yaxshi foyda beradi.",
    qollanilishi: "5 ml ni 100 ml iliq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin ichiladi.",
    saqlash: ILIQ_SAQLASH,
  },
  kalendula: {
    name: "Kalendula (Tirnoqgul)",
    tarkibi: "Kalendula.",
    foydasi:
      "Kalendula ming dardga da'vodir. Uyqu sifatini yaxshilab, tinchlantiruvchi ta'sirga ega, yurak urishini mo'tadillashtiradi, " +
      "o'pkada havo almashinuvini yaxshilaydi, arterial bosimni tushiradi. Gastrit, 12 barmoqli ichak yaralarida, yo'g'on ichak kolitida, " +
      "teri toshmalarida, ugrida yordam beradi. Jigar, buyrak, ayol va erkak kasalliklarida tengi yo'q giyohdir.",
    qollanilishi: "5 ml ni 100 ml iliq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa oldin ichiladi.",
    saqlash: ILIQ_SAQLASH,
  },
  qizilmiya: {
    name: "Qizilmiya ildizi (Koren solodki)",
    tarkibi: "Qizilmiya ildizi.",
    foydasi:
      "Yuqori nafas yo'llaridan qiyin ajraluvchi balg'amli yo'tallarda. Antivirus, antibakterial. " +
      "Oshqozon gastritini davolab, jigar faoliyatini tiklaydi. Yuqori qon bosimini normallashtirib, asabni tinchlantiradi. " +
      "Limfani tozalaydi va suyultiradi. Metabolizmni yaxshilaydi. Organizmni shlaklardan tozalaydi. " +
      "Siydik haydovchi, ko'ngil aynashiga foydali.",
    qollanilishi: "5 ml ni 100 ml iliq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin ichiladi.",
    saqlash: ILIQ_SAQLASH,
  },
  achchiq_shuvoq: {
    name: "Achchiq shuvoq (Artemisia absinthium)",
    tarkibi: "Achchiq shuvoq.",
    foydasi:
      "Immunitetni ko'taruvchi, umumiy quvvatlovchi; ko'z, burun, tomoq shamollashida. " +
      "Yurak-qon tomir va asab kasalliklariga juda yaxshi foyda beradi. Oshqozon-ichak kasalliklari, gepatitda safroni ajratib, savdoni haydaydi. " +
      "Psoriaz, dermatitda va barcha parazitlarga qarshi kurashadi. Artrit, artroz, bo'g'im shamollashi, revmatizmda kasalni qo'zg'atib davolaydi.",
    qollanilishi: "5 ml ni 100 ml iliq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa oldin ichiladi.",
    saqlash: ILIQ_SAQLASH,
  },
  achchiq_bodom: {
    name: "Achchiq bodom (Amygdalus amararum)",
    foydasi:
      "Ko'ngil ochuvchi, yurakni quvvatlovchi, hazmni yaxshilovchi, ishtaha ochuvchi. " +
      "Parazit, zamburug', infeksiyalarga qarshi kurashuvchi va immunitetni ko'taruvchi. " +
      "Safrodan bo'lgan bosh og'rig'iga foyda bo'lib, qon bosimini me'yorlashtiruvchi giyohdir.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa oldin ichiladi.",
  },
  rastoropsha: {
    name: "Rastoropsha – Oq qarrak (Silybum)",
    foydasi:
      "Antioksidant. Immunitetni oshiruvchi. Jigar kasalliklari: sirroz, virusli, alkogolli gepatit va jigar zaharlanishida samarali. " +
      "O't qopi diskineziyasi va xolesistitda, o't tosh kasalligida ichiladi. Metabolizm buzilishi, semizlik, qabziyat, gemorroy, " +
      "disbakteriozda foydasi katta. Bachadon endometriozida boshqa giyohlar bilan kompleks holda foydalaniladi.",
    ehtiyot: "Bachadon, tuxumdon, ko'krak bezi rakida mumkin emas.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin ichiladi.",
  },
  zveroboy: {
    name: "Zveroboy – Dalachoy (Hypericum)",
    foydasi:
      "Gijja haydovchi. Shamollashga qarshi. Infeksiyaga qarshi. Qon to'xtatuvchi. Safro haydovchi. " +
      "Vena qon tomirlarida qon aylanishini yaxshilaydi. Ichki organ mikrosirkulyatsiyasini yaxshilaydi. Gripp simptomlarini yengillashtiradi. " +
      "Nevrozda tinchlantiruvchi. Ayollar kasalliklari: premenstrual sindrom, klimaksda foyda. " +
      "Bosh og'rig'i va uyqusizlik bilan kechuvchi nevrozda foydali.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 30 daqiqa keyin ichiladi.",
  },
  toloknyanka: {
    name: "Toloknyanka – Ayiqquloq (Arctostaphylos uva-ursi)",
    foydasi:
      "Buyrak va peshob yo'li kasalliklarida: sistit, uretrit, pielonefritni davolaydi. Shishlarni haydovchi. " +
      "Zamburug', infeksiyalar va yallig'lanishga qarshi vosita bo'lib, stafilokokk, streptokokk, enterokokklarga qarshi kurashadi.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin ichiladi.",
  },
  uzun_murch: {
    name: "Uzun murch – Perets dlinniy (Piper longum)",
    foydasi:
      "Hamma mizojga foydali. Issiqlikni oshiradi. O'pka kasalliklari, bronxitda, yo'talda yaxshi. " +
      "Hazmni yaxshilaydi, ishtahani ochadi; jig'ildon qaynashida, qorin dam bo'lishi va ich ketganda foyda beradi. " +
      "Ayollar va erkaklar kasalliklarida, depressiyaga yaxshi ta'sir ko'rsatib, ozdiruvchi hamdir.",
    ehtiyot: "2 yoshdan kattalarga mumkin.",
    qollanilishi:
      "Kattalarga: 5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin.\n" +
      "Bolalarga: 2,5 ml ni 50 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 20 daqiqa keyin.",
  },
  universal: {
    name: "Universal qon suyultiruvchi",
    tarkibi: "Ginkgo biloba, Chabrets, Boyarishnik, Dolchin, Lipa, Moychechak.",
    foydasi:
      "Qonni suyultiradi, tromboz xavfini pasaytiradi. Yurak-qon tomirni quvvatlaydi. Antioksidant himoyaga ega. " +
      "Hujayralarni erkin radikallardan himoya qiladi. Varikoz, tromb, gipertoniya va infarkt xavfini kamaytiradi. " +
      "Limfa va jigarni tozalashda samarali.",
    qollanilishi: "5 ml ni 100 ml issiq suvga qo'shib, kuniga 3 mahal ovqatdan 30 daqiqa oldin ichiladi.",
  },
};

// Kasallik bo'limlari: har bir mahsulot bir nechta bo'limda turishi mumkin.
const categories = [
  { id: "oshqozon", title: "Oshqozon-ichak, hazm", items: ["romashka", "kalendula", "qizilmiya", "achchiq_shuvoq", "achchiq_bodom", "rastoropsha", "uzun_murch"] },
  { id: "jigar", title: "Jigar va o't yo'llari", items: ["rastoropsha", "kalendula", "qizilmiya", "achchiq_shuvoq", "universal"] },
  { id: "buyrak", title: "Buyrak va siydik yo'llari", items: ["toloknyanka", "kalendula", "qizilmiya"] },
  { id: "yurak", title: "Yurak, qon bosimi, qon tomirlar", items: ["universal", "kalendula", "qizilmiya", "achchiq_shuvoq", "achchiq_bodom", "zveroboy"] },
  { id: "nafas", title: "Shamollash, yo'tal, immunitet", items: ["qizilmiya", "uzun_murch", "achchiq_shuvoq", "zveroboy", "achchiq_bodom", "rastoropsha"] },
  { id: "ayollar", title: "Ayollar salomatligi", items: ["kalendula", "rastoropsha", "zveroboy", "uzun_murch"] },
  { id: "erkaklar", title: "Erkaklar salomatligi", items: ["kalendula", "uzun_murch"] },
  { id: "asab", title: "Asab, uyqu, bosh og'rig'i", items: ["zveroboy", "kalendula", "qizilmiya", "achchiq_shuvoq", "achchiq_bodom", "uzun_murch"] },
  { id: "teri", title: "Teri kasalliklari", items: ["kalendula", "achchiq_shuvoq"] },
  { id: "parazit", title: "Parazit, zamburug', infeksiya", items: ["achchiq_shuvoq", "achchiq_bodom", "zveroboy", "toloknyanka"] },
  { id: "bogim", title: "Bo'g'imlar, revmatizm", items: ["achchiq_shuvoq"] },
  { id: "modda", title: "Modda almashinuvi, ozish", items: ["qizilmiya", "rastoropsha", "uzun_murch"] },
  { id: "hammasi", title: "Barcha mahsulotlar", items: Object.keys(products) },
];

// Botning asosiy mantig'i. Telegram'dan kelgan har bir xabarga javob beradi.

const KATALOG = "📋 Katalog";

function createBot({ token, photoOf }) {
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

// Vercel: Telegram har bir yangi xabarni shu manzilga yuboradi.
// Bir martalik sozlash: https://<loyiha>.vercel.app/api/webhook?setup=<WEBHOOK_SECRET>
module.exports = async function handler(req, res) {
  const base = `https://${req.headers.host}`;
  const bot = createBot({ token: process.env.BOT_TOKEN, photoOf: (id) => `${base}/${id}.jpg` });
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
