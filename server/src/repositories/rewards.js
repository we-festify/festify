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
      return await Reward.findById(id).populate("reference");
    } catch (err) {
      throw err;
    }
  }

  static async getByReference(referenceId) {
    try {
      return await Reward.findOne({ reference: referenceId }).populate(
        "reference"
      );
    } catch (err) {
      throw err;
    }
  }

  static async getAllByUser(userId, { extended = false }) {
    try {
      if (extended) {
        return await Reward.find({ user: userId }).populate("reference");
      }
      return await Reward.find({ user: userId });
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsedByUser(userId, { extended = false } = {}) {
    try {
      if (extended) {
        return await Reward.find({ user: userId, status: "used" }).populate(
          "reference"
        );
      }
      return await Reward.find({ user: userId, status: "used" });
    } catch (err) {
      throw err;
    }
  }

  static async updateByReference(referenceId, reward) {
    try {
      return await Reward.findOneAndUpdate({ reference: referenceId }, reward, {
        new: true,
      }).populate("reference");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RewardRepository;
