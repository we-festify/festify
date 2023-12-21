const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("Organisation", organisationSchema);
