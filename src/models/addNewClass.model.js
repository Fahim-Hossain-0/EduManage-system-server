const {get} = require('../app')
const { getDB } = require('../config/db');

const collection = ()=> getDB().collection('classes');

const addNewClass = async(classData)=>{
    const result = await collection().insertOne(classData);
    return result;
}

const getAllClasses = async (page, limit) => {

    const query = { status: "approved" }; // always approved only

    const result = await collection()
        .find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .toArray();

    const totalClasses = await collection()
        .countDocuments(query);

    return {
        result,
        totalClasses
    };
};

const getMyClasses = async (email, status , page, limit) => {

    const query = { email };

    if (status) {
        query.status = status;
    }

    const result = await collection()
        .find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ created_at: 1 })
        .toArray()

        const totalClasses = await collection()
        .countDocuments(query);
        return{
            result,
            totalClasses
        }
};

const getPendingClasses = async (page, limit) => {

    const query = {
        status: "pending"
    };

    const result = await collection()
        .find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .toArray();

    const totalClasses = await collection()
        .countDocuments(query);

    return {
        result,
        totalClasses
    };
};

const updateClassStatus = async (
    filter,
    updateDoc
) => {

    return await collection().updateOne(
        filter,
        updateDoc
    );
};

module.exports = {
    addNewClass,
    getAllClasses,
    getMyClasses,
    getPendingClasses,
    updateClassStatus
}