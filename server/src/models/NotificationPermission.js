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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "NotificationPermission",
  NotificationPermissionSchema
);
