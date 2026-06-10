const { ObjectId } = require('mongodb');
const {get} = require('../app')
const { getDB } = require('../config/db');

const collection = ()=> getDB().collection('classes');
const assignmentCollection = () =>
  getDB().collection("assignments");

const submissionCollection = () =>
  getDB().collection("submissions");


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

const getSingleClass = async (id) => {
    const result = await collection().findOne({
        _id: new ObjectId(id)
    });

    return result;
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

const getClassProgress = async (id) => {
  const classData =
    await collection().findOne({
      _id: new ObjectId(id),
    });

  const totalAssignments =
    await assignmentCollection()
      .countDocuments({
        classId: id,
      });

  const totalSubmissions =
    await submissionCollection()
      .countDocuments({
        classId: id,
      });

  return {
    totalEnrollment:
      classData?.totalEnrollment || 0,

    totalAssignments,

    totalSubmissions,
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

const updateClass = async (
  id,
  updateData
) => {
  return await collection().updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: updateData,
    }
  );
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