const mongoose = require("mongoose");

const FeatureFlagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (v) => /^[A-Z0-9_]+$/.test(v),
      message: (props) =>
        "Feature flag name can only contain capital letters and underscores.",
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("FeatureFlag", FeatureFlagSchema);
