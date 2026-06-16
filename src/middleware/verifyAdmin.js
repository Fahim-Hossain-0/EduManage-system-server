const { getDB } = require("../config/db");

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded.email;

    const user = await getDB()
      .collection("users")
      .findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(403).send({
        message: "Forbidden Access",
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = verifyAdmin;