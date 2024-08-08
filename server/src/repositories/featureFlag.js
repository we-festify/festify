const { applicationDB } = require("../../database");

const FeatureFlag = require("../models/FeatureFlag")(applicationDB);

class FeatureFlagRepository {
  static async getByName(name) {
    try {
      return await FeatureFlag.findOne({ name });
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      return await FeatureFlag.find();
    } catch (err) {
      throw err;
    }
  }

  static async create(featureFlag) {
    try {
      return await FeatureFlag.create(featureFlag);
    } catch (err) {
      throw err;
    }
  }

  static async toggleByName(name) {
    try {
      const featureFlag = await FeatureFlag.findOne({ name });
      featureFlag.enabled = !featureFlag.enabled;
      return await featureFlag.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FeatureFlagRepository;
