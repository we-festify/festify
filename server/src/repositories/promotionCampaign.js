const { applicationDB } = require("../../database");

const PromotionCampaign = require("../models/PromotionCampaign")(applicationDB);

class PromotionCampaignRepository {
  static async create(promotionCampaign) {
    try {
      return await PromotionCampaign.create(promotionCampaign);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await PromotionCampaign.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getByCode(code) {
    try {
      return await PromotionCampaign.findOne({ promoCode: code });
    } catch (err) {
      throw err;
    }
  }

  static async getAll({ extended = false }) {
    try {
      if (extended) return await PromotionCampaign.find();
      return await PromotionCampaign.find().select(
        "-description -termsAndConditions"
      );
    } catch (err) {
      throw err;
    }
  }

  static async getAllByPatterns(patterns) {
    try {
      return await PromotionCampaign.find({ pattern: { $in: patterns } });
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, promotionCampaign) {
    try {
      return await PromotionCampaign.findByIdAndUpdate(id, promotionCampaign, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PromotionCampaignRepository;
