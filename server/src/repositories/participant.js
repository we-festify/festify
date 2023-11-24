const Participant = require("../models/Participant");

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
      }).populate("event", "_id name");
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
}

module.exports = ParticipantRepository;
