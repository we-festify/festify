const mongoose = require("mongoose");

const RazorpayPayment = new mongoose.Schema({
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
  },
  razorpaySignature: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    // This is the type of product that the user is buying
    // eg. Event, Merchandise, etc.
    type: String,
    required: true,
    enum: ["Event"],
  },
  reference: {
    // This is the id of the product that the user is buying
    // eg. event id, merchandise id, etc.
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "type",
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    // This is the status of the payment
    // eg. success, failed, etc.
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RazorpayPayment", RazorpayPayment);
