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
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    required: true,
  },
  isTicketed: {
    type: Boolean,
    required: true,
    default: false,
  },
  minTeamSize: {
    type: Number,
    required: true,
    default: 1,
  },
  maxTeamSize: {
    type: Number,
    required: true,
    default: 1,
  },
  registrationsOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  rulebookUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Event", EventSchema);
