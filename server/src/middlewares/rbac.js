const permissions = require("../config/permissions");
const { sendError } = require("../utils/errors");

class RBACMiddleware {
  static requirePermission = (type, action) => (req, res, next) => {
    const { user } = req;
    const role = user?.role || "guest";
    const permissionGranted = permissions[role]?.[type]?.[action];
    if (permissionGranted) {
      next();
    } else {
      sendError(res, 403, "You do not have permission to perform this action");
    }
  };

  static requireAdmin = (req, res, next) => {
    const { user } = req;
    const role = user?.role;
    if (role === "admin") {
      next();
    } else {
      sendError(res, 403, "You do not have permission to perform this action");
    }
  };

  static requireOrganiser = (req, res, next) => {
    const { user } = req;
    const role = user?.role;
    const organisation = user?.organisation;
    if (role === "organiser" && organisation) {
      next();
    } else {
      sendError(res, 403, "You do not have permission to perform this action");
    }
  };
}

module.exports = RBACMiddleware;
