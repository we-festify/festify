const { permissions } = require("../config/permissions");
const { sendError } = require("../utils/errors");

class RBACMiddleware {
  static async #executeRule(rule, req) {
    if (typeof rule === "string") {
      rule = [rule];
    }
    const [action, validator] = rule;

    const { user } = req;
    const role = user?.role || "guest";
    console.log(role, action);
    const permissionGranted = permissions[role].includes(action);

    if (!permissionGranted) return false;

    if (validator instanceof Function) {
      return await validator(req);
    }

    return true;
  }
  /**
   * Middleware to check if the user has permission to perform an action
   * and optionally validate the request
   *
   * Note: All rules are ORed together i.e. if any rule is satisfied, the user is granted permission
   *
   * @param {Array<[string, (req: Request) => Promise<boolean>] | string>} rules
   * @returns
   */
  static requirePermissions =
    (...rules) =>
    async (req, res, next) => {
      for (const rule of rules) {
        const result = await this.#executeRule(rule, req);
        if (result) {
          return next();
        }
      }

      return sendError(
        res,
        403,
        "You do not have permission to perform this action"
      );
    };
}

module.exports = RBACMiddleware;
