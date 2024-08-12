const PromotionCampaignRepository = require("../repositories/promotionCampaign");
const { BadRequestError } = require("../utils/errors");

class PromotionCampaignService {
  static #checkRequiredFields(promotionCampaign) {
    if (!promotionCampaign)
      throw new BadRequestError("Missing promotionCampaign");
    const requiredFields = [
      "name",
      "description",
      "promoCode",
      "termsAndConditions",
      "pattern",
      "discountType",
      "expiry",
      "maxDiscountInINR",
      "discountValue",
      "applicableOn",
    ];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!promotionCampaign[field]) missingFields.push(field);
    });
    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }
  }

  static async create(promotionCampaign) {
    try {
      this.#checkRequiredFields(promotionCampaign);
      return await PromotionCampaignRepository.create(promotionCampaign);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      if (!id) throw new BadRequestError("Missing id");
      return await PromotionCampaignRepository.getById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAll({ extended = false }) {
    try {
      return await PromotionCampaignRepository.getAll({ extended });
    } catch (err) {
      throw err;
    }
  }

  static async getBestApplicable({ email, orderType, orderAmount } = {}) {
    try {
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, promotionCampaign) {
    try {
      if (!id) throw new BadRequestError("Missing id");
      this.#checkRequiredFields(promotionCampaign);

      const campaign = await PromotionCampaignRepository.getById(id);
      const currentDate = new Date();
      if (currentDate >= new Date(campaign.expiry)) {
        throw new BadRequestError(
          "Cannot update promotion campaign after expiry"
        );
      }

      return await PromotionCampaignRepository.updateById(
        id,
        promotionCampaign
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PromotionCampaignService;
