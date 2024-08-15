const RewardService = require("../services/rewards");

class RewardController {
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const reward = await RewardService.getById(id);
      res.status(200).json({ reward });
    } catch (err) {
      next(err);
    }
  }

  static async getAllBySelf(req, res, next) {
    try {
      const { user } = req;
      const { extended } = req.query;
      const rewards = await RewardService.getAllByUser(user._id, { extended });
      res.status(200).json({ rewards });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RewardController;
