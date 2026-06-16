const { getDB } = require("../config/db");

const verifyTeacher = async (req, res, next) => {
  try {
    const email = req.decoded.email;

    const user = await getDB()
      .collection("users")
      .findOne({ email });

    if (
      !user ||
      (user.role !== "teacher" &&
        user.role !== "admin")
    ) {
      return res.status(403).send({
        message: "Teacher/Admin Access Only",
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = verifyTeacher;