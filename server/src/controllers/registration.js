const RegistrationService = require("../services/registration");

class RegistrationController {
  static async create(req, res, next) {
    try {
      const { registration } = req.body;
      const createdRegistration = await RegistrationService.create(
        registration
      );
      res.status(201).json({ registration: createdRegistration });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RegistrationController;
