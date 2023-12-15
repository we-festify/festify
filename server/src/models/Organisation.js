const mongoose = require("mongoose");
const { applicationDB } = require("../../database");

const organisationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

module.exports = applicationDB.model("Organisation", organisationSchema);
