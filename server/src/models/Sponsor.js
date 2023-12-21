const mongoose = require("mongoose");

const SponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  websiteUrl: {
    type: String,
    required: [true, "Website URL is required"],
  },
  logoUrl: {
    type: String,
    required: [true, "Logo URL is required"],
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  priority: {
    type: Number,
    min: 1,
    required: [true, "Priority is required"],
  },
});

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("Sponsor", SponsorSchema);
