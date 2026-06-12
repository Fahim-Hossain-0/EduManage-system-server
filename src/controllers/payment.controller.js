const stripe = require("../config/stripe");

const paymentModel = require("../models/payment.model");

const { ObjectId } = require("mongodb");

const { getDB } = require("../config/db");

const createPaymentIntent =
  async (req, res) => {
    try {

      const { price } =
        req.body;

      const amount =
        parseInt(price * 100);

      const paymentIntent =
        await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          payment_method_types: [
            "card",
          ],
        });

      res.send({
        clientSecret:
          paymentIntent.client_secret,
      });

    } catch (error) {

      console.log(error);

      res.status(500).send({
        message:
          error.message,
      });

    }
  };

const savePayment = async (req, res) => {
  try {
    const result = await paymentModel.savePayment(req.body);

    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const saveEnrollment = async (req, res) => {
  try {
    const result = await paymentModel.saveEnrollment(req.body);

    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const email = req.params.email;

    const result = await paymentModel.getEnrollmentsByEmail(email);

    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const increaseEnrollment = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await getDB()
      .collection("classes")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $inc: {
            totalEnrollment: 1,
          },
        },
      );

    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  createPaymentIntent,
  savePayment,
  saveEnrollment,
  getMyEnrollments,
  increaseEnrollment,
};
