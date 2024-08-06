const UserService = require("../services/user");
const { BadRequestError } = require("../utils/errors");

class UserController {
  static async getAll(req, res, next) {
    try {
      const { limit = 10, page = 1, search = "" } = req.query;
      const users = await UserService.getAll({
        limit: Number(limit),
        page: Number(page),
        search: search.toString(),
      });
      const totalCount = await UserService.getTotalCount({ search });
      res.status(200).json({
        users,
        pagination: { total: totalCount, count: users.length },
      });
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
      const { role } = req.user;
      if (!user) {
        throw new BadRequestError("Missing user");
      }
      const userPayload = await UserService.update(userId, user, { role });
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

  static async selfValidator(req) {
    try {
      const { userId } = req.params;
      const { user } = req;
      if (!userId !== user._id) return false;
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = UserController;
