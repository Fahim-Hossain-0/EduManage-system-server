const auth = require("../config/firebaseAdmin");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("AUTH HEADER:", req.headers.authorization);
  if (!authHeader) {
    return res.status(401).send({
      message: "Unauthorized Access",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      message: "Unauthorized Access",
    });
  }

  try {
    const decoded = await auth.verifyIdToken(token);

    req.decoded = decoded;

    next();
  } catch (error) {
    // console.log(error);

    return res.status(401).send({
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;