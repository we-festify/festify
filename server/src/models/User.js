const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  passwordHash: {
    type: String,
    required: [true, "Password is required"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"],
  },
  college: {
    type: String,
    required: [true, "College is required"],
  },
  zipCode: {
    type: String,
    required: [true, "Zip code is required"],
  },
  degree: {
    type: String,
    required: [true, "Degree is required"],
  },
  yearOfGraduation: {
    type: Number,
    required: [true, "Year of graduation is required"],
  },
  role: {
    type: String,
    enum: ["admin", "organiser", "user"],
    required: [true, "Role is required"],
    default: "user",
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    default: null,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
