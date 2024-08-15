const mongoose = require("mongoose");

const NotificationPermissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: Boolean,
      required: true,
      default: false,
    },
    push: {
      type: Boolean,
      required: true,
      default: false,
    },
    inApp: {
      type: Boolean,
      required: true,
      default: false,
    },
    topics: {
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
module.exports = (db) =>
  db.model("NotificationPermission", NotificationPermissionSchema);
