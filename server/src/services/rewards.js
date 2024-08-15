const RewardRepository = require("../repositories/rewards");
const { BadRequestError } = require("../utils/errors");

class RewardService {
  static async create(reward) {
    try {
      return await RewardRepository.create(reward);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      if (!id) throw new BadRequestError("Missing id");
      return await RewardRepository.getById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getByReference(referenceId) {
    try {
      if (!referenceId) throw new BadRequestError("Missing referenceId");
      return await RewardRepository.getByReference(referenceId);
    } catch (err) {
      throw err;
    }
  }

  static async getAllByUser(userId, { extended = false }) {
    try {
      return await RewardRepository.getAllByUser(userId, { extended });
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsedByUser(userId, { extended = false } = {}) {
    try {
      return await RewardRepository.getAllUsedByUser(userId, { extended });
    } catch (err) {
      throw err;
    }
  }

  static async updateByReference(referenceId, reward) {
    try {
      return await RewardRepository.updateByReference(referenceId, reward);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RewardService;
