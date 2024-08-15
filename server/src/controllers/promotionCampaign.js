const PromotionCampaignService = require("../services/promotionCampaign");
const { BadRequestError } = require("../utils/errors");

class PromotionCampaignController {
  static async create(req, res, next) {
    try {
      const { promotionCampaign } = req.body;
      const createdPromotionCampaign = await PromotionCampaignService.create(
        promotionCampaign
      );
      res.status(201).json({ promotion: createdPromotionCampaign });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const promotionCampaign = await PromotionCampaignService.getById(id);
      res.status(200).json({ promotion: promotionCampaign });
    } catch (err) {
      next(err);
    }
  }

  static async getByCode(req, res, next) {
    try {
      const { code } = req.params;
      const promotionCampaign = await PromotionCampaignService.getByCode(code);
      res.status(200).json({ promotion: promotionCampaign });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { extended } = req.query;
      const promotionCampaigns = await PromotionCampaignService.getAll({
        extended,
      });
      res.status(200).json({ promotions: promotionCampaigns });
    } catch (err) {
      next(err);
    }
  }

  static async getAllValidByUserEmail(req, res, next) {
    try {
      const { email, _id: userId } = req.user;
      const promotionCampaigns =
        await PromotionCampaignService.getAllValidByUserEmail(userId, email);

      res.status(200).json({ promotions: promotionCampaigns });
    } catch (err) {
      next(err);
    }
  }

  static async getBestApplicable(req, res, next) {
    try {
      let { orderType, orderAmount } = req.query;
      const { email, _id: userId } = req.user;
      orderType = orderType.toString().trim();
      orderAmount = parseFloat(orderAmount);
      console.log({ email, orderType, orderAmount });
      const promotion = await PromotionCampaignService.getBestApplicable(
        userId,
        {
          email,
          orderType,
          orderAmount,
        }
      );
      res.status(200).json({ promotion });
    } catch (err) {
      next(err);
    }
  }

  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { promotionCampaign } = req.body;

      const updatedPromotionCampaign =
        await PromotionCampaignService.updateById(id, promotionCampaign);
      res.status(200).json({ promotionCampaign: updatedPromotionCampaign });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PromotionCampaignController;
