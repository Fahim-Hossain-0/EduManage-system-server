const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASS
)}@db-system.alg6axz.mongodb.net/?retryWrites=true&w=majority&appName=DB-system`;

let client;
let db;

async function connectDB() {
  try {
    client = new MongoClient(uri);

    await client.connect(); // MUST CONNECT

    db = client.db(process.env.DB_NAME);

    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error(error);
  }
}
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

function getDB() {
  if (!db) {
    throw new Error("DB not initialized");
  }

  return db;
}

module.exports = {
  connectDB,
  getDB,
};