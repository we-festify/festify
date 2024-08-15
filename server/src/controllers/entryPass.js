const EntryPassService = require("../services/entryPass");

class EntryPassController {
  static async purchase(req, res, next) {
    try {
      const { user } = req;
      const { eventId } = req.params;
      const { promoCode } = req.body;
      const { entryPass, order, type } = await EntryPassService.purchase(
        {
          user,
          eventId,
        },
        promoCode
      );
      return res.status(200).json({
        order,
        entryPass,
        type,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllBySelf(req, res, next) {
    try {
      const { user } = req;
      const entryPasses = await EntryPassService.getByUser(user);
      return res.status(200).json({
        entryPasses,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { entryPassId } = req.params;
      const entryPass = await EntryPassService.getById(entryPassId);
      return res.status(200).json({
        entryPass,
      });
    } catch (err) {
      next(err);
    }
  }

  static async checkIn(req, res, next) {
    try {
      const { entryPassId } = req.params;
      const entryPass = await EntryPassService.checkIn(entryPassId);
      return res.status(200).json({
        entryPass,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EntryPassController;
