const mongoose = require("mongoose");

const EntryPassSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  usedAt: {
    type: Date,
  },
});

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("EntryPass", EntryPassSchema);
