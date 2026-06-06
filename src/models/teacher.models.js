const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const teacherCollection = () => getDB().collection("teachers");
const userCollection = () => getDB().collection("users");

// ===============================
// GET ALL REQUESTS
// ===============================
const getAllTeacherRequests = async (page, limit) => {
  const query = { status: "pending" };

  const result = await teacherCollection()
    .find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .toArray();

  const totalTeacherRequests = await teacherCollection().countDocuments(query);

  return {
    result,
    totalTeacherRequests,
  };
};

// ===============================
// CREATE REQUEST
// ===============================
const createTeacher = async (teacherData) => {
  const existingRequest = await teacherCollection().findOne({
    email: teacherData.email,
    status: { $in: ["pending", "accepted"] },
  });

  if (existingRequest) {
    return {
      success: false,
      message:
        existingRequest.status === "accepted"
          ? "You are already a teacher."
          : "Your teacher request is already pending.",
    };
  }

  const result = await teacherCollection().insertOne(teacherData);

  return {
    success: true,
    message: "Teacher request submitted successfully.",
    result,
  };
};

// ===============================
// APPROVE TEACHER (FIXED)
// ===============================
const teacherRequestApprove = async (id) => {
  const request = await teacherCollection().findOne({
    _id: new ObjectId(id),
  });

  if (!request) {
    return {
      success: false,
      message: "Request not found",
    };
  }

  // 1. update teacher request status
  await teacherCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "accepted" } }
  );

  // 2. update user role
  await userCollection().updateOne(
    { email: request.email },
    { $set: { role: "teacher" } }
  );

  return {
    success: true,
    message: "Teacher approved successfully",
  };
};

// ===============================
// REJECT TEACHER
// ===============================
const teacherRequestReject = async (id) => {
  await teacherCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "rejected" } }
  );

  return {
    success: true,
    message: "Teacher rejected successfully",
  };
};

module.exports = {
  createTeacher,
  teacherRequestApprove,
  teacherRequestReject,
  getAllTeacherRequests,
};