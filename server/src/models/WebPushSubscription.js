const mongoose = require("mongoose");

const WebPushSubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subscriptions: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  ],
});

module.exports = mongoose.model(
  "WebPushSubscription",
  WebPushSubscriptionSchema
);
