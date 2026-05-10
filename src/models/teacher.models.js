const { ObjectId } = require('mongodb');
const {get} = require('../app')
const { getDB } = require('../config/db');

const teacherCollection = ()=> getDB().collection('teachers');
const userCollection = ()=> getDB().collection('users');

const getAllTeacherRequests = async (page, limit) => {

    const query = { status: "pending" }; // always pending only
    const result = await teacherCollection()
        .find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .toArray(); 
    const totalTeacherRequests = await teacherCollection()
        .countDocuments(query);

    return {
        result,
        totalTeacherRequests
    };
}

const createTeacher = async (teacherData) => {

    // check existing request
    const existingRequest = await teacherCollection().findOne({
        email: teacherData.email,
        status: {
            $in: ["pending", "accepted"]
        }
    });

    // if already pending or accepted
    if (existingRequest) {

        // accepted
        if (existingRequest.status === "accepted") {
            return {
                success: false,
                message:
                    "You are already a teacher."
            };
        }

        // pending
        return {
            success: false,
            message:
                "Your teacher request is already pending."
        };
    }

    // create new request
    const result = await teacherCollection()
        .insertOne(teacherData);

    return {
        success: true,
        message:
            "Teacher request submitted successfully.",
        result
    };
};

const teacherRequestApprove = async (id, teacherData) => {

    const requestFilter = {
        _id: new ObjectId(id)
    };

    const updateDoc = {
        $set: {
            status: "accepted"
        }
    };

    const teacherRequestUpdate =
        await teacherCollection().updateOne(
            requestFilter,
            updateDoc
        );

    const userFilter = {
        email: teacherData.email
    };

    const userUpdateDoc = {
        $set: {
            role: "teacher"
        }
    };

    const userRoleUpdate =
        await userCollection().updateOne(
            userFilter,
            userUpdateDoc
        );

    return {
        teacherRequestUpdate,
        userRoleUpdate,
        message: "Teacher approved successfully"
    };
};

const teacherRequestReject = async (id) => {

    const requestFilter = {
        _id: new ObjectId(id)
    };

    const updateDoc = {
        $set: {
            status: "rejected"
        }
    };

    const teacherRequestUpdate =
        await teacherCollection().updateOne(
            requestFilter,
            updateDoc
        );

    return {
        teacherRequestUpdate,
        message: "Teacher rejected successfully"
    };
};


module.exports = {
    createTeacher,
    teacherRequestApprove,
    teacherRequestReject,
    getAllTeacherRequests
}
