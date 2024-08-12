const { applicationDB } = require("../../database");
const Reward = require("../models/Reward")(applicationDB);

class RewardRepository {
  static async create(reward) {
    try {
      return await Reward.create(reward);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await Reward.findById(id).populate("reference").populate("user").populate("usedBy");
    } catch (err) {
      throw err;
    }
  }

  static async getAllByUser(userId, { extended = false }) {
    try {
      if (extended) {
        return await Reward.find({ user: userId })
          .populate("reference")
          .populate("user")
          .populate("usedBy");
      }
      return await Reward.find({ user: userId })
        .select("-user -usedBy")
        .populate("reference")
        .populate("user")
        .populate("usedBy");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RewardRepository;
