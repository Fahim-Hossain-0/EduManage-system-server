const assignmentModel = require(
  "../models/assignment.model"
);



const createAssignment = async (
  req,
  res
) => {
  try {
    const result =
      await assignmentModel.createAssignment(
        req.body
      );

    res.status(201).json({
      message:
        "Assignment created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAssignmentsByClass =async (req, res) => {
    try {
      const { classId } =
        req.params;

      const result =
        await assignmentModel.getAssignmentsByClass(
          classId
        );

      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  




module.exports = {
  createAssignment,
  getAssignmentsByClass,
 
};