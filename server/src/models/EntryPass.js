const mongoose = require("mongoose");
const { applicationDB } = require("../../database");

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

module.exports = applicationDB.model("EntryPass", EntryPassSchema);
