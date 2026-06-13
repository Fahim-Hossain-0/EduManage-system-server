const serverless = require("serverless-http");

const app = require("../src/app");
const { connectDB } = require("../src/config/db");

let handler;
let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  if (!handler) {
    handler = serverless(app);
  }

  return handler(req, res);
};