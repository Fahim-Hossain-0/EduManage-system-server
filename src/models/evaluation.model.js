const { getDB } = require("../config/db");

const collection = () =>
  getDB().collection("evaluationReports");

const createEvaluation = async (
  data
) => {
  const existing =
    await collection().findOne({
      classId: data.classId,
      studentEmail:
        data.studentEmail,
    });

  if (existing) {
    return {
      success: false,
      message:
        "You already submitted evaluation",
    };
  }

  const result =
    await collection().insertOne(
      data
    );

  return {
    success: true,
    data: result,
  };
};

const getClassEvaluations =
  async (classId) => {
    return await collection()
      .find({
        classId,
      })
      .toArray();
  };
  const getStudentEvaluation =
  async (
    classId,
    email
  ) => {
    return await collection().findOne({
      classId,
      studentEmail: email,
    });
  };

  const getAllEvaluations =
  async () => {
    return await collection()
      .find({})
      .sort({
        createdAt: -1,
      })
      .toArray();
  };

module.exports = {
  createEvaluation,
  getClassEvaluations,
    getStudentEvaluation,
    getAllEvaluations,
};