const PromotionCampaignRepository = require("../repositories/promotionCampaign");
const { BadRequestError } = require("../utils/errors");
const RewardService = require("./rewards");

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

  static async getByCode(code) {
    try {
      if (!code) throw new BadRequestError("Missing code");
      return await PromotionCampaignRepository.getByCode(code);
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

  static async getAllValidByUserEmail(userId, email) {
    try {
      if (!email) throw new BadRequestError("Missing email");
      const patterns = ["email:" + email, "domain:" + email.split("@")[1]];
      const promotions = await PromotionCampaignRepository.getAllByPatterns(
        patterns
      );

      const currentDate = new Date();
      const usedRewards = await RewardService.getAllUsedByUser(userId);
      return promotions.filter(
        (promotion) =>
          currentDate < new Date(promotion.expiry) && // not expired
          !usedRewards.some(
            (reward) => reward.reference.toString() === promotion._id.toString()
          ) // not used
      );
    } catch (err) {
      throw err;
    }
  }

  static async getBestApplicable(
    userId,
    { email, orderType, orderAmount } = {}
  ) {
    try {
      if (!email) throw new BadRequestError("Missing email");
      if (!orderType) throw new BadRequestError("Missing orderType");
      if (!orderAmount) throw new BadRequestError("Missing orderAmount");

      const userPatterns = ["email:" + email, "domain:" + email.split("@")[1]];
      const campaigns = await PromotionCampaignRepository.getAllByPatterns(
        userPatterns
      );
      const usedRewards = await RewardService.getAllUsedByUser(userId);

      const currentDate = new Date();
      const validCampaigns = campaigns.filter(
        (campaign) =>
          currentDate < new Date(campaign.expiry) && // not expired
          !usedRewards.some(
            (reward) => reward.reference.toString() === campaign._id.toString()
          ) // not used
      );

      const applicableCampaigns = validCampaigns.filter((campaign) => {
        if (
          campaign.applicableOn.includes("event:*") ||
          campaign.applicableOn.includes("merchandise:*")
        ) {
          return true;
        }
        if (campaign.applicableOn.includes(orderType)) {
          return true;
        }
        return false;
      });

      if (applicableCampaigns.length === 0) return undefined;

      let bestCampaign = applicableCampaigns[0];
      let bestDiscount = 0;
      applicableCampaigns.forEach((campaign) => {
        let discount = 0;
        if (campaign.discountType === "percentage") {
          discount = (orderAmount * campaign.discountValue) / 100;
        } else {
          discount = campaign.discountValue;
        }
        discount = Math.min(discount, campaign.maxDiscountInINR);
        if (discount > bestDiscount) {
          bestDiscount = discount;
          bestCampaign = campaign;
        }
      });

      return bestCampaign;
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

  static async calculateDiscount(promotion, amount) {
    try {
      if (!promotion) return 0;
      if (!amount) return 0;

      if (promotion.discountType === "percentage") {
        return Math.min(
          (promotion.discountValue * amount) / 100,
          amount,
          promotion.maxDiscountInINR
        );
      } else {
        return Math.min(
          promotion.discountValue,
          amount,
          promotion.maxDiscountInINR
        );
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PromotionCampaignService;
