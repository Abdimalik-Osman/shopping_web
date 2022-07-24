require("dotenv").config();
const stripe = require("stripe")('sk_test_51LOmdPGmBsg9iGAL7mmRzVyas5DNeC3ILFqYQTzJyrlrJqAEuOZBbr8XpXdl8A4U7Fio2azKDunUKUQmahmCLPQ400ZXcJLo6l');

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};