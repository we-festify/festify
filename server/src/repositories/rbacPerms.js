const { actions, permissions } = require("../config/permissions");
const { applicationDB } = require("../../database");
const RBACPerms = require("../models/RBACPerms")(applicationDB);
const { BadRequestError } = require("../utils/errors");

class RBACPermsRepository {
  static async getAllActions() {
    return actions;
  }

  static async getAllPermissions() {
    return permissions;
  }

  static async getPermissionsForRole(role) {
    return permissions[role] || [];
  }

  static async updatePermissionsForRole(role, newPermissions) {
    try {
      const perms = await RBACPerms.findOne({ role });
      if (!perms) throw new BadRequestError("Role not found");

      perms.permissions = newPermissions;
      await perms.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RBACPermsRepository;
