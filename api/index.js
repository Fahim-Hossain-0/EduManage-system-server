require("dotenv").config();

const serverless = require("serverless-http");

const app = require("../src/app");
const { connectDB } = require("../src/config/db");

let initialized = false;

async function init() {
  if (!initialized) {
    await connectDB();
    initialized = true;
  }
}

const handler = serverless(app);

module.exports = async (req, res) => {
  await init();

  return handler(req, res);
};