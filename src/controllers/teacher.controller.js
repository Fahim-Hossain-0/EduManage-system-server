const { ObjectId } = require('mongodb');
const TeachersModel = require('../models/teacher.models');

const getAllTeacherRequests = async(req,res)=>{

    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10   
        const result = await TeachersModel.getAllTeacherRequests(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createTeacher = async (req, res) => {

    try {

        const teacherData = req.body;

        const result =
            await TeachersModel.createTeacher(
                teacherData
            );

        // prevent duplicate request
        if (!result.success) {
            return res.status(400).send(result);
        }

        res.send(result);

    } catch (error) {

        res.status(500).send({
            message: error.message
        });
    }
};

const teacherRequestApprove = async (req, res) => {

    try {

        const id = req.params.id;
        const teacherData = req.body;

        const result =
            await TeachersModel.teacherRequestApprove(
                id,
                teacherData
            );

        res.send(result);

    } catch (error) {

        res.status(500).send({
            message: error.message
        });
    }
};

const teacherRequestReject = async (req, res) => {

    try {

        const id = req.params.id;

        const result =
            await TeachersModel.teacherRequestReject(id);

        res.send(result);

    } catch (error) {

        res.status(500).send({
            message: error.message
        });
    }
};

module.exports = {
    createTeacher,
    teacherRequestApprove,
    teacherRequestReject,
    getAllTeacherRequests
}

