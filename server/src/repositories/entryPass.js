const EntryPass = require("../models/EntryPass");

class EntryPassRepository {
  static async create(user, event) {
    try {
      return await EntryPass.create({ user, event });
    } catch (err) {
      throw err;
    }
  }

  static async getByUserAndEvent({ user, event }) {
    try {
      return await EntryPass.findOne({ user, event });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EntryPassRepository;
