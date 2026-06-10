const { ObjectId } = require('mongodb');
const newClassModel = require('../models/addNewClass.model');

const addNewClass = async(req,res)=>{
    try {
        const result = await newClassModel.addNewClass(req.body);
        res.status(201).json({
            message:"Class added successfully",
            data:result
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllClasses = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        

        const result = await newClassModel.getAllClasses(page, limit);
        res.json(result);
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }

}

const getSingleClass = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await newClassModel.getSingleClass(id);

        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getMyClasses = async (req, res) => {

    try {

        const email = req.params.email;
        const status = req.query.status;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await newClassModel.getMyClasses(email,status, page, limit);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getPendingClasses = async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const result = await newClassModel.getPendingClasses(page, limit);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};
const getClassProgress = async (
  req,
  res
) => {
  try {
    const id = req.params.id;

    const result =
      await newClassModel.getClassProgress(
        id
      );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateClassStatus = async (req, res) => {

    try {
        

        const id = req.params.id;

        const { status } = req.body;

        const filter = {
            _id: new ObjectId(id)
        };

        const updateDoc = {
            $set: {
                status
            }
        };

        const result = await newClassModel.updateClassStatus(
            filter,
            updateDoc
        );

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const updateClass = async (
  req,
  res
) => {
  try {
    const id = req.params.id;

    const updateData = {
      ...req.body,

      status: "pending",
    };

    const result =
      await newClassModel.updateClass(
        id,
        updateData
      );

    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


module.exports = {
    addNewClass,
    getAllClasses,
    getSingleClass,
    getMyClasses,
    getPendingClasses,
        getClassProgress,
    updateClassStatus,
    updateClass
}