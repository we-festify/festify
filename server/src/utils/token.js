const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
  });
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN),
  });
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return null;
  }
};

const generateEmailVerificationToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_EMAIL_VERIFICATION_SECRET, {
    expiresIn: parseInt(process.env.JWT_EMAIL_VERIFICATION_EXPIRES_IN),
  });
};

const verifyEmailVerificationToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_EMAIL_VERIFICATION_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
};
