const mongoose = require("mongoose");

const PromotionCampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  termsAndConditions: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  promoCode: {
    type: String,
    required: true,
    unique: true,
    validate: {
      message: "Promo code should only contain capital letters and numbers",
      validator: (v) => /^[A-Z0-9]+$/.test(v),
    },
  },
  type: {
    type: String,
    enum: ["general", "targeted"],
    required: true,
    default: "general",
  },
  pattern: {
    type: [String],
    required: true,
    default: [],
    validate: {
      validator: (v) => {
        if (!v) return true;
        const patterns = [
          /^email:[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          /^domain:([\w-]+\.)+[\w-]{2,4}$/,
        ];
        return v.every((pattern) => patterns.some((p) => p.test(pattern)));
      },
      message: "Invalid value for pattern",
    },
  },
  expiry: {
    type: Date,
    required: true,
  },
  maxDiscountInINR: {
    type: Number,
    required: true,
    min: [1, "Max discount must be greater than 0 INR"],
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    required: true,
    default: "percentage",
  },
  discountValue: {
    type: Number,
    required: true,
  },
  applicableOn: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => {
        const patterns = [
          /^event:\*$/,
          /^event:[0-9a-fA-F]{24}$/,
          /^merchandise:\*$/,
          /^merchandise:.+$/,
        ];

        return v.every((applicableOn) =>
          patterns.some((pattern) => pattern.test(applicableOn))
        );
      },
      message: "Invalid value for applicableOn",
    },
  },
  currentUsage: {
    type: Number,
    required: true,
    default: 0,
    min: [0, "Current usage must be greater than equal to 0"],
  },
  maxUsage: {
    type: Number,
    required: true,
    default: 0,
    min: [0, "Max usage must be greater than equal to 0"],
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("PromotionCampaign", PromotionCampaignSchema);
