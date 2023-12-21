const { applicationDB } = require("../../database");

const Participant = require("../models/Participant")(applicationDB);

class ParticipantRepository {
  static async create(participant) {
    try {
      return await Participant.create(participant);
    } catch (err) {
      throw err;
    }
  }

  static async getAllByEventAndMembers(eventId, members) {
    try {
      return await Participant.find({
        event: eventId,
        members: { $in: members },
      });
    } catch (err) {
      throw err;
    }
  }

  static async getAllParticipationsBySelf(userId) {
    try {
      return await Participant.find({
        members: { $in: [userId] },
      })
        .populate("event")
        .populate("members");
    } catch (err) {
      throw err;
    }
  }

  static async getAllByUserId(userId) {
    try {
      return await Participant.find({
        members: { $in: [userId] },
      });
    } catch (err) {
      throw err;
    }
  }

  static async getAllByEventId(eventId) {
    try {
      return await Participant.find({
        event: eventId,
      })
        .populate("leader")
        .populate("members");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ParticipantRepository;
