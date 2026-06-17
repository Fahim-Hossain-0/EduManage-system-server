const { getDB } = require("../config/db");

// const collection = () =>
  // getDB().collection("evaluationReports");

const collection = async () => {
  const db = await getDB();
  return db.collection("evaluationReports");
}
const createEvaluation = async ( data) => {
  const evaluationReportsCollection = await collection()
  const existing = 
    await evaluationReportsCollection.findOne({
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
    await evaluationReportsCollection.insertOne(
      data
    );

  return {
    success: true,
    data: result,
  };
};

const getClassEvaluations =async (classId) => {
  const evaluationReportsCollection = await collection()
      return await evaluationReportsCollection
      .find({
        classId,
      })
      .toArray();
  };

  const getStudentEvaluation =async (
    classId,
    email
  ) => {
     const evaluationReportsCollection = await collection()
    return await evaluationReportsCollection.findOne({
      classId,
      studentEmail: email,
    });
  };

  const getAllEvaluations =
  async () => {
     const evaluationReportsCollection = await collection()
    return await evaluationReportsCollection
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