// Mini App shu manzildan admin qo'shgan/o'chirgan mahsulotlarni oladi.
const db = require("./_db");

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const empty = { extra: [], hidden: [], cats: [] };
  if (!db.ready()) return res.status(200).json(empty);
  try {
    const [extra, hidden, cats] = await Promise.all([
      db.getJSON(db.K.extra, []),
      db.getJSON(db.K.hidden, []),
      db.getJSON(db.K.cats, []),
    ]);
    res.status(200).json({ extra, hidden, cats });
  } catch (e) {
    console.error(e);
    res.status(200).json(empty);
  }
};
