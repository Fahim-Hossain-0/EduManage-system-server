const {get} = require('../app')
const { getDB } = require('../config/db');

const collection = ()=> getDB().collection('classes');

const addNewClass = async(classData)=>{
    const result = await collection().insertOne(classData);
    return result;
}

const getAllClasses = async(page, limit)=>{

    const result = await collection()
    .find()
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray()
const totalClasses = await collection()
        .countDocuments();

    return { result, totalClasses };
}

module.exports = {
    addNewClass,
    getAllClasses
}