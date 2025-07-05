export default async function handler(req, res) {
  const { MongoClient } = await import("mongodb");
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    const db = client.db("movie-app");
    const collections = await db.listCollections().toArray();
    res.status(200).json({ ok: true, collections });
  } catch (error) {
    console.error("❌ RAW MongoDB error:", error.message);
    res.status(500).json({ message: "Connection failed" });
  }
}
