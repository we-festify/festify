const { verifyAccessToken } = require("../utils/token");
const { sendError } = require("../utils/errors");

const checkLoggedIn = (req, res, next) => {
  const { headers } = req;
  const { authorization } = headers;
  if (authorization) {
    const tokenType = authorization.split(" ")[0];
    if (tokenType !== "Bearer") {
      sendError(res, 401, "Invalid token");
    } else {
      const token = authorization.split(" ")[1];
      const decoded = verifyAccessToken(token);
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        sendError(res, 401, "Invalid token");
      }
    }
  } else {
    sendError(res, 401, "You are not logged in");
  }
};

module.exports = {
  checkLoggedIn,
};
