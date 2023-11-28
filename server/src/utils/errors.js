class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

const handleErrors = (err, req, res, next) => {
  const { statusCode } = err;
  const { message } = err;
  sendError(res, statusCode, message);
};

const sendError = (res, statusCode, message) => {
  try {
    return res.status(statusCode || 500).json({
      status: "error",
      statusCode: statusCode || 500,
      message: message || "Internal Server Error",
    });
  } catch (err) {
    console.log("Error while sending error response", err.message);
  }
};

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  handleErrors,
  sendError,
};
