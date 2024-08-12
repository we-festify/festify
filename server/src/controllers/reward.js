const RewardService = require("../services/reward");
const { BadRequestError } = require("../utils/errors");

class RewardController {
  static async create(req, res, next) {
    try {
      const { reward } = req.body;
      const createdReward = await RewardService.create(reward);
      res.status(201).json({ reward: createdReward });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const reward = await RewardService.getById(id);
      res.status(200).json({ reward });
    } catch (err) {
      next(err);
    }
  }

  static async getAllByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { extended } = req.query;
      const rewards = await RewardService.getAllByUser(userId, { extended });
      res.status(200).json({ rewards });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = RewardController;
