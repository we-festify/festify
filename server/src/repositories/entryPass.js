const { applicationDB } = require("../../database");

const EntryPass = require("../models/EntryPass")(applicationDB);

class EntryPassRepository {
  static async getById(entryPassId) {
    try {
      return await EntryPass.findById(entryPassId)
        .populate("event")
        .populate("user");
    } catch (err) {
      throw err;
    }
  }

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

  static async getByUser(user) {
    try {
      return await EntryPass.find({ user }).populate("event");
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, entryPass) {
    try {
      return await EntryPass.findByIdAndUpdate(id, entryPass, { new: true });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EntryPassRepository;
