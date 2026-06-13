const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASS
)}@db-system.alg6axz.mongodb.net/?retryWrites=true&w=majority&appName=DB-system`;

let client;
let db;

async function connectDB() {
  if (db) return db;

  client = new MongoClient(uri);

  await client.connect();

  db = client.db(process.env.DB_NAME);

  console.log("MongoDB connected ✅");

  return db;
}

function getDB() {
  return db;
}

module.exports = {
  connectDB,
  getDB,
};