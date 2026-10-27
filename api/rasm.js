// Admin botga yuborgan rasmlarni Telegram'dan olib beradi: /api/rasm?f=<file_id>
const TYPES = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

module.exports = async function handler(req, res) {
  const f = req.query && req.query.f;
  if (!f || !/^[\w-]+$/.test(f)) return res.status(400).send("no");
  const token = process.env.BOT_TOKEN;
  const info = await (await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${f}`)).json();
  if (!info.ok) return res.status(404).send("Rasm topilmadi");
  const file = await fetch(`https://api.telegram.org/file/bot${token}/${info.result.file_path}`);
  if (!file.ok) return res.status(404).send("Rasm topilmadi");
  const ext = info.result.file_path.split(".").pop().toLowerCase();
  res.setHeader("Content-Type", TYPES[ext] || "image/jpeg");
  res.setHeader("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
  res.status(200).send(Buffer.from(await file.arrayBuffer()));
};
