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
        const classes = await newClassModel.getAllClasses(page, limit);
        res.json(classes);
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }

}

module.exports = {
    addNewClass,
    getAllClasses
}