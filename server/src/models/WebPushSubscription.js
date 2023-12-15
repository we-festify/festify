const mongoose = require("mongoose");
const { applicationDB } = require("../../database");

const WebPushSubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // a problem might occur when a user tries to log two different accounts on the same browser
  // because the browser will have same subscription for both accounts
  // so we need to add index: false to not index this field
  subscriptions: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      index: false,
    },
  ],
});

module.exports = applicationDB.model(
  "WebPushSubscription",
  WebPushSubscriptionSchema
);
