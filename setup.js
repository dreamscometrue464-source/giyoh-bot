// Bir marta ochiladi: botni shu Vercel manziliga ulaydi va menyuni sozlaydi.
// Manzil: https://<loyiha>.vercel.app/api/setup?key=<WEBHOOK_SECRET>
import { createBot } from "../lib/bot.js";

export default async function handler(req, res) {
  if (!process.env.WEBHOOK_SECRET || req.query.key !== process.env.WEBHOOK_SECRET) {
    return res.status(401).send("Kalit noto'g'ri");
  }
  const bot = createBot({ token: process.env.BOT_TOKEN, photoOf: () => "" });
  const result = await bot.setup(`https://${req.headers.host}/api/webhook`, process.env.WEBHOOK_SECRET);
  res.status(200).json(result);
}
