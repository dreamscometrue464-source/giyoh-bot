// Vercel: Telegram har bir yangi xabarni shu manzilga yuboradi.
import { createBot } from "../lib/bot.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("Bot ishlayapti");
  if (process.env.WEBHOOK_SECRET && req.headers["x-telegram-bot-api-secret-token"] !== process.env.WEBHOOK_SECRET) {
    return res.status(401).send("no");
  }
  const base = `https://${req.headers.host}`;
  const bot = createBot({ token: process.env.BOT_TOKEN, photoOf: (id) => `${base}/img/${id}.jpg` });
  try {
    await bot.handle(req.body);
  } catch (e) {
    console.error(e);
  }
  res.status(200).send("ok");
}
