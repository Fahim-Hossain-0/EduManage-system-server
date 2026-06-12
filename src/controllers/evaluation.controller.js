const evaluationModel =
  require("../models/evaluation.model");

const createEvaluation =
  async (req, res) => {
    try {
      const result =
        await evaluationModel.createEvaluation(
          req.body
        );

      if (!result.success) {
        return res
          .status(400)
          .send(result);
      }

      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

const getClassEvaluations =
  async (req, res) => {
    try {
      const classId =
        req.params.classId;

      const result =
        await evaluationModel.getClassEvaluations(
          classId
        );

      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

  const getStudentEvaluation =
  async (req, res) => {
    const { classId, email } =
      req.params;

    const result =
      await evaluationModel.getStudentEvaluation(
        classId,
        email
      );

    res.send(result);
  };

const getAllEvaluations =
  async (req, res) => {
    try {
      const result =
        await evaluationModel.getAllEvaluations();

      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };
  
module.exports = {
  createEvaluation,
  getClassEvaluations,
  getStudentEvaluation,
    getAllEvaluations,
};