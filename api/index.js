const serverless = require("serverless-http");

const app = require("../src/app");
const { connectDB } = require("../src/config/db");

let handler;

connectDB();

handler = serverless(app);

module.exports = handler;