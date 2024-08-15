const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      // This is the type of product that the user is buying
      // eg. PromotionCampaign etc.
      type: String,
      required: true,
      enum: ["PromotionCampaign"],
    },
    reference: {
      // This is the id of the product that the user is buying
      // eg. event id, participant id, merchandise id, etc.
      // This is a dynamic reference, hence the type is ObjectId
      type: mongoose.Schema.Types.ObjectId,
      required: false, // for failed payments, this will be null
      refPath: "type",
      unique: true, // one reward can be used only once
    },
    status: {
      type: String,
      enum: ["used", "unused", "expired"],
      required: true,
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("Reward", RewardSchema);
