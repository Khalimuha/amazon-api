const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !"
  });
});

app.post("/payment/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total);
    if (total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
      });
      console.log(paymentIntent);
      res.status(201).json({
        clientSecret: paymentIntent.client_secret
      });
    } else {
      res.status(403).json({
        message: "total must be greater than 0"
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Amazon server Running on PORT:5000, https://localhost:5000");
});
