const { verifyAccessToken } = require("../utils/token");
const { sendError } = require("../utils/errors");

class AuthMiddleware {
  static extractHeaders = (req, res, next) => {
    const { headers } = req;
    const { authorization } = headers;
    if (authorization) {
      const tokenType = authorization.split(" ")[0];
      if (tokenType === "Bearer") {
        const token = authorization.split(" ")[1];
        const decoded = verifyAccessToken(token);
        if (decoded) {
          req.user = decoded;
        }
      }
    }
    next();
  };

  static requireLoggedIn = (req, res, next) => {
    const { user } = req;
    if (!user) {
      sendError(res, 401, "You must be logged in to perform this action");
    }
    next();
  };
}

module.exports = AuthMiddleware;
