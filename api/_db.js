// Upstash Redis (Vercel Storage) bilan ishlash. Vercel o'zi KV_REST_API_URL va KV_REST_API_TOKEN ni qo'yadi.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function cmd(...args) {
  if (!URL_ || !TOKEN) throw new Error("Ma'lumot ombori ulanmagan (Vercel → Storage → Upstash Redis).");
  const res = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(args),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

const getJSON = async (key, def) => {
  const v = await cmd("GET", key);
  return v ? JSON.parse(v) : def;
};
const setJSON = (key, value, ttl) =>
  ttl ? cmd("SET", key, JSON.stringify(value), "EX", ttl) : cmd("SET", key, JSON.stringify(value));
const del = key => cmd("DEL", key);

// Kalitlar
const K = {
  extra: "katalog:qoshilgan", // admin qo'shgan mahsulotlar
  hidden: "katalog:yashirin", // o'chirilgan asosiy mahsulotlar ID lari
  cats: "katalog:bolimlar", // admin ochgan yangi bo'limlar
  admins: "adminlar",
  state: id => `holat:${id}`,
};

module.exports = { cmd, getJSON, setJSON, del, K, ready: () => !!(URL_ && TOKEN) };
