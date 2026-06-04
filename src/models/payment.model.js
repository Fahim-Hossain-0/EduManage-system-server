const { getDB } = require("../config/db");

const paymentsCollection = () =>
  getDB().collection("payments");

const enrollmentsCollection = () =>
  getDB().collection("enrollments");

const savePayment = async (data) => {
  return await paymentsCollection()
    .insertOne(data);
};

const saveEnrollment = async (data) => {
  return await enrollmentsCollection()
    .insertOne(data);
};

const getEnrollmentsByEmail =
async (email) => {

  return await enrollmentsCollection()
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