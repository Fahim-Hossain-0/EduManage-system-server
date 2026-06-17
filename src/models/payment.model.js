const { getDB } = require("../config/db");

// const paymentsCollection = () =>
//   getDB().collection("payments");

// const enrollmentsCollection = () =>
//   getDB().collection("enrollments");

const paymentCollections = async () => {
  const db = await getDB();
  return db.collection("payments");
};
const enrollmentCollections = async () => {
  const db = await getDB();
  return db.collection("enrollments");
};

const savePayment = async (data) => {
  const paymentCollection = await paymentCollections()

  return await paymentCollection
    .insertOne(data);
};

const saveEnrollment = async (data) => {
  const enrollmentCollection = await enrollmentCollections()
  return await enrollmentCollection
    .insertOne(data);
};

const getEnrollmentsByEmail =
async (email) => {
const enrollmentCollection = await enrollmentCollections()
  return await enrollmentCollection
    .find({
      studentEmail: email,
    })
    .toArray();
};

module.exports = {
  savePayment,
  saveEnrollment,
  getEnrollmentsByEmail,
};