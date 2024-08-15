const mongoose = require("mongoose");

const FCMTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokens: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("FCMToken", FCMTokenSchema);
