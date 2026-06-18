const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASS
)}@db-system.alg6axz.mongodb.net/?retryWrites=true&w=majority&appName=DB-system`;

let client;
let db;

async function connectDB() {
  try {
    if (db) return db;

    client = new MongoClient(uri);

    await client.connect();

    db = client.db(process.env.DB_NAME);

    console.log("MongoDB Connected ✅");

    return db;
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw error;
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized");
  }

  return db;
}

module.exports = {
  connectDB,
  getDB,
};