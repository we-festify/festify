const mongoose = require("mongoose");

const RazorpayPayment = new mongoose.Schema(
  {
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
      // eg. Event, Participant, Merchandise, etc.
      type: String,
      required: true,
      enum: ["Participant", "EntryPass"],
    },
    reference: {
      // This is the id of the product that the user is buying
      // eg. event id, participant id, merchandise id, etc.
      // This is a dynamic reference, hence the type is ObjectId
      type: mongoose.Schema.Types.ObjectId,
      required: false, // for failed payments, this will be null
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
    description: {
      type: String,
      required: true,
      default: "No description provided",
    },
    appliedReward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reward",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("RazorpayPayment", RazorpayPayment);
