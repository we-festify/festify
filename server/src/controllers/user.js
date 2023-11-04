const UserService = require("../services/user");

class UserController {
  static async getAll(req, res, next) {
    try {
      const users = await UserService.getAll();
      res.status(200).json({ users });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
