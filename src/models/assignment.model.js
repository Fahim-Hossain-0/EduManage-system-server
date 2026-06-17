const { getDB } = require("../config/db");

// const collection = () =>
//   getDB().collection("assignments");


const collection = async () => {
  const db = await getDB();
  return db.collection("assignments");
}
// ====================
// CREATE ASSIGNMENT
// ====================

const createAssignment =
  async (assignmentData) => {
    const assignmentCollection = await collection()
    return await assignmentCollection.insertOne(
      assignmentData
    );
  };

// ====================
// GET ASSIGNMENTS BY CLASS
// ====================

const getAssignmentsByClass =
  async (classId) => {
const assignmentCollection = await collection()
    return await assignmentCollection
      .find({
        classId,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();
  };

module.exports = {
  createAssignment,
  getAssignmentsByClass,
};