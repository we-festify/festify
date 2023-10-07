const mongoose = require("mongoose");

const organisationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

module.exports = mongoose.model("Organisation", organisationSchema);
