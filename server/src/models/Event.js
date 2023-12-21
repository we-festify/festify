const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["event", "competition", "exhibition", "workshop", "other"],
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  timeline: {
    type: [
      {
        time: {
          type: Date,
          required: true,
        },
        venue: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageBlurHash: {
    type: String,
    required: false,
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    required: true,
  },
  category: {
    type: String,
    enum: [
      "design",
      "management",
      "technical",
      "literary",
      "art",
      "dramatics",
      "dance",
      "music",
      "quiz",
      "gaming",
      "workshop",
      "other",
    ],
    required: true,
    default: "other",
  },
  tags: {
    type: [String],
    required: true,
  },
  rulebookUrl: {
    type: String,
  },

  // Registrations are required for events like competitions, workshops, etc.
  isRegistrationRequired: {
    type: Boolean,
    required: true,
    default: false,
  },
  minTeamSize: {
    type: Number,
    min: 1,
  },
  maxTeamSize: {
    type: Number,
    min: 1,
  },
  registrationsStart: {
    type: Date,
  },
  registrationsEnd: {
    type: Date,
  },
  registrationFeesInINR: {
    type: Number,
    default: 0,
  },

  // Entry Passes are required for events like concerts, standup comedy, etc.
  isEntryPassRequired: {
    type: Boolean,
    required: true,
    default: false,
  },
  entryPassPriceInINR: {
    type: Number,
    default: 0,
  },
  totalEntryPasses: {
    type: Number,
    default: 0, // 0 means unlimited
  },
  entryPassDistributionStart: {
    type: Date,
  },
  entryPassDistributionEnd: {
    type: Date,
  },
});

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("Event", EventSchema);
