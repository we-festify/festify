const EntryPassService = require("../services/entryPass");

class EntryPassController {
  static async purchase(req, res, next) {
    try {
      const { user } = req;
      const { eventId } = req.params;
      const { entryPass, order, type } = await EntryPassService.purchase({
        user,
        eventId,
      });
      return res.status(200).json({
        order,
        entryPass,
        type,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EntryPassController;
