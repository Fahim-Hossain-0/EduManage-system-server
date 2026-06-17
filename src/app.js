const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const addNewClassRoutes = require("./routes/addNewClass.routes");
const teacherRoutes = require("./routes/teacher.routes");
const paymentRoutes = require("./routes/payment.routes");
const assignmentRoutes = require("./routes/assignment.route");
const submissionRoutes = require("./routes/submission.route");
const evaluationRoutes = require("./routes/evaluation.route");

const app = express();


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("EduManage API Running 🚀");
});

// Routes
app.use("/", userRoutes);
app.use("/", addNewClassRoutes);
app.use("/", teacherRoutes);
app.use("/", paymentRoutes);
app.use("/", assignmentRoutes);
app.use("/", submissionRoutes);
app.use("/", evaluationRoutes);

module.exports = app;