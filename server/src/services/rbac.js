const { applicationDB } = require("../../database");
const { permissions, actions } = require("../config/permissions");
const RBACPermsRepository = require("../repositories/rbacPerms");
const { BadRequestError } = require("../utils/errors");
const RBACPerms = require("../models/RBACPerms")(applicationDB);

class RBACService {
  static async initPermissions(callback) {
    try {
      const perms = await RBACPerms.find();

      // If no permissions are found, insert default permissions
      if (!perms || perms.length === 0) {
        const defaultPerms = [
          { role: "admin", permissions: permissions.admin },
          { role: "organiser", permissions: permissions.organiser },
          { role: "user", permissions: permissions.user },
          { role: "guest", permissions: permissions.guest },
        ];
        await RBACPerms.insertMany(defaultPerms);
      }
      perms.forEach((perm) => {
        permissions[perm.role] = perm.permissions;
      });

      // add permissions:read and permissions:update to admin
      permissions.admin.push("permissions:read");
      permissions.admin.push("permissions:update");
      permissions.admin = [...new Set(permissions.admin)]; // Remove duplicates

      // save permissions to db
      await RBACPermsRepository.updatePermissionsForRole(
        "admin",
        permissions.admin
      );

      if (callback instanceof Function) callback();
    } catch (err) {
      throw err;
    }
  }

  static async updatePermissions(role, permissions) {
    try {
      const perms = await RBACPermsRepository.getPermissionsForRole(role);
      if (!perms) throw new BadRequestError("Role not found");

      // cannot remove permissions:read and permissions:update from admin
      if (role === "admin") {
        permissions.push("permissions:read");
        permissions.push("permissions:update");
      }

      permissions = [...new Set(permissions)]; // Remove duplicates

      await RBACPermsRepository.updatePermissionsForRole(role, permissions);

      this.initPermissions();
    } catch (err) {
      throw err;
    }
  }

  static async getPermissions(role) {
    try {
      const perms = await RBACPerms.findOne({ role });
      if (!perms) throw new BadRequestError("Role not found");
      return perms.permissions;
    } catch (err) {
      throw err;
    }
  }

  static async getAllPermissions() {
    try {
      return await RBACPermsRepository.getAllPermissions();
    } catch (err) {
      throw err;
    }
  }

  static async getAllActions() {
    try {
      return await RBACPermsRepository.getAllActions();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RBACService;
