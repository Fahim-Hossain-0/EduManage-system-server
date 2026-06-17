const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

// const collection = ()=> getDB().collection('classes');

// const assignmentCollection = () =>
//   getDB().collection("assignments");

// const submissionCollection = () =>
//   getDB().collection("submissions");

const classesCollections = async () => {
  const db = await getDB();
  return db.collection("classes");
}
const assignmentsCollections = async () => {
  const db = await getDB();
  return db.collection("assignments");
}
const submissionsCollections = async () => {
  const db = await getDB();
  return db.collection("submissions");
}


const addNewClass = async(classData)=>{
  const classesCollection = await classesCollections()
    const result = await classesCollection.insertOne(classData);
    return result;
}

const getAllClasses = async (page, limit) => {
const classesCollection = await classesCollections()
    const query = { status: "approved" }; // always approved only

    const result = await classesCollection
        .find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .toArray();

    const totalClasses = await classesCollection
        .countDocuments(query);

    return {
        result,
        totalClasses
    };
};

const getSingleClass = async (id) => {
  const classesCollection = await classesCollections()
    const result = await classesCollection.findOne({
        _id: new ObjectId(id)
    });

    return result;
};

const getMyClasses = async (email, status , page, limit) => {

  const classesCollection = await classesCollections()
    const query = { email };

    if (status) {
        query.status = status;
    }

    const result = await classesCollection
        .find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ created_at: 1 })
        .toArray()

        const totalClasses = await classesCollection
        .countDocuments(query);
        return{
            result,
            totalClasses
        }
};

const getPendingClasses = async (page, limit) => {
const classesCollection = await classesCollections()
    const query = {
        status: "pending"
    };

    const result = await classesCollection
        .find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .toArray();

    const totalClasses = await classesCollection
        .countDocuments(query);

    return {
        result,
        totalClasses
    };
};

const getClassProgress = async (id) => {
  const classesCollection = await classesCollections()
  const assignmentCollection = await assignmentsCollections()
  const submissionCollection = await submissionsCollections()
  const classData =
    await classesCollection.findOne({
      _id: new ObjectId(id),
    });

  const totalAssignments =
   
    await assignmentCollection
      .countDocuments({
        classId: id,
      });

  const totalSubmissions =
    await submissionCollection
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

  const classesCollection = await classesCollections()
    return await classesCollection.updateOne(
        filter,
        updateDoc
    );
};

const updateClass = async (
  id,
  updateData
) => {
  const classesCollection = await classesCollections()
  return await classesCollection.updateOne(
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