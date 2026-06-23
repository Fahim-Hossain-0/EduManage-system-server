require("dotenv").config();

// console.log("FB_SERVICE_KEY exists:", !!process.env.FB_SERVICE_KEY);
// console.log("Length:", process.env.FB_SERVICE_KEY?.length);

const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const decoded = Buffer.from(
  process.env.FB_SERVICE_KEY,
  "base64"
).toString("utf8");
const serviceAccount = JSON.parse(decoded);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

module.exports = getAuth();