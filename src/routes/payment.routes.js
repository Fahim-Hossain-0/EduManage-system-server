const express = require("express");

const router = express.Router();

const {
  createPaymentIntent,
  savePayment,
  saveEnrollment,
  getMyEnrollments,
  increaseEnrollment,
} = require("../controllers/payment.controller");

router.post("/create-payment-intent", createPaymentIntent);

router.post("/payments", savePayment);

router.post("/enrollments", saveEnrollment);

router.get("/enrollments/:email", getMyEnrollments);

router.patch("/classes/enroll/:id", increaseEnrollment);

module.exports = router;
