const TeachersModel = require("../models/teacher.models");

// GET ALL
const getAllTeacherRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await TeachersModel.getAllTeacherRequests(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE REQUEST
const createTeacher = async (req, res) => {
  try {
    const result = await TeachersModel.createTeacher(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPROVE
const teacherRequestApprove = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await TeachersModel.teacherRequestApprove(id);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REJECT
const teacherRequestReject = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await TeachersModel.teacherRequestReject(id);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeacher,
  teacherRequestApprove,
  teacherRequestReject,
  getAllTeacherRequests,
};