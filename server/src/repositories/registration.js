const Registration = require("../models/Registration");

class RegistrationRepository {
  static async create(registration) {
    try {
      return await Registration.create(registration);
    } catch (err) {
      throw err;
    }
  }

  static async findByEventAndMembers(eventId, members) {
    try {
      return await Registration.find({
        event: eventId,
        team: { $in: members },
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RegistrationRepository;
