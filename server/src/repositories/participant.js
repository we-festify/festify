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
}

module.exports = ParticipantRepository;
