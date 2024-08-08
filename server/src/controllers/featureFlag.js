const FeatureFlagService = require("../services/featureFlag");

class FeatureFlagController {
  static async getByName(req, res, next) {
    try {
      const { name } = req.params;
      const featureFlag = await FeatureFlagService.getByName(name);
      res.json({ featureFlag });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const featureFlags = await FeatureFlagService.getAll();
      res.json({ featureFlags });
    } catch (err) {
      next(err);
    }
  }

  static async toggle(req, res, next) {
    try {
      const { name } = req.params;
      const featureFlag = await FeatureFlagService.toggleByName(name);
      res.json({ featureFlag });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FeatureFlagController;
