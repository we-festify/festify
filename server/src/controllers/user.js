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

  static async getById(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await UserService.getById(userId);
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { user } = req.body;
      if (!user) {
        throw new BadRequestError("Missing user");
      }
      const userPayload = await UserService.create(user);
      res.status(201).json({ user: userPayload });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { userId } = req.params;
      const { user } = req.body;
      if (!user) {
        throw new BadRequestError("Missing user");
      }
      const userPayload = await UserService.update(userId, user);
      res.status(200).json({ user: userPayload });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { userId } = req.params;
      const deletedUser = await UserService.delete(userId);
      res.status(200).json({ user: deletedUser });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
