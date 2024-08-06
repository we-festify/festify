const RBACService = require("../services/rbac");
const { BadRequestError } = require("../utils/errors");

class RBACController {
  static async getMyPermissions(req, res, next) {
    try {
      const role = req.user?.role || "guest";
      const permissions = await RBACService.getPermissions(role);
      return res.status(200).json({
        permissions,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllActions(req, res) {
    try {
      const actions = await RBACService.getAllActions();
      return res.status(200).json({
        actions,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllPermissions(req, res) {
    try {
      const permissions = await RBACService.getAllPermissions();
      return res.status(200).json({
        permissions,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updatePermissions(req, res, next) {
    try {
      const { permissionsMap } = req.body;
      if (!permissionsMap) {
        throw new BadRequestError("No permissions map in request body");
      }
      for (const { role, permissions } of permissionsMap) {
        await RBACService.updatePermissions(role, permissions);
      }
      return res.status(200).json({
        message: "Permissions updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RBACController;
