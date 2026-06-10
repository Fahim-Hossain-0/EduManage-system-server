const express = require("express");
const router = express.Router();

const {
  addNewClass,
  getAllClasses,
  getSingleClass,
  getMyClasses,
  updateClassStatus,
  getClassProgress,
  getPendingClasses,
  updateClass
} = require("../controllers/addNewClass.controller");

router.post("/add-class", addNewClass);
router.get("/all-classes", getAllClasses);
router.get("/all-classes/:id", getSingleClass);
router.get("/my-classes/:email", getMyClasses);
router.get("/pending-classes", getPendingClasses);
router.patch("/classes/status/:id", updateClassStatus);
router.get("/class-progress/:id", getClassProgress);
router.patch("/update-class/:id", updateClass);
module.exports = router;
