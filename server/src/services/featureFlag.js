const FeatureFlagRepository = require("../repositories/featureFlag");
const features = require("../config/features");

class FeatureFlagService {
  static async initFeatureFlags(callback) {
    try {
      // Check if feature flags exist in the database
      // If not, insert default feature flags
      features.forEach(async (feature) => {
        const featureFlag = await FeatureFlagRepository.getByName(feature.name);
        if (!featureFlag) {
          await FeatureFlagRepository.create(feature);
        }
      });

      if (callback instanceof Function) callback();
    } catch (err) {
      throw err;
    }
  }

  static async getByName(name) {
    try {
      return await FeatureFlagRepository.getByName(name);
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      return await FeatureFlagRepository.getAll();
    } catch (err) {
      throw err;
    }
  }

  static async create(featureFlag) {
    try {
      return await FeatureFlagRepository.create(featureFlag);
    } catch (err) {
      throw err;
    }
  }

  static async toggleByName(name) {
    try {
      const featureFlag = await FeatureFlagRepository.getByName(name);
      if (!featureFlag) throw new Error("Feature flag not found.");

      return await FeatureFlagRepository.toggleByName(name);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FeatureFlagService;
