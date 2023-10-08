const UserRepository = require("../repositories/user");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/password");

class AuthService {
  static async register(user) {
    try {
      const { email, password } = user;
      const existingUser = await UserRepository.getByEmail(email);
      if (existingUser) {
        throw new BadRequestError("User with email already exists");
      }

      const hashedPassword = await hashPassword(password);
      user.password = undefined;
      user.passwordHash = hashedPassword;

      const newUser = await UserRepository.create(user);

      const payload = {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }

  static async loginWithEmailPassword(email, password) {
    try {
      if (!email || !password)
        throw new BadRequestError("Invalid email or password");

      const user = await UserRepository.getByEmail(email);
      if (!user) {
        throw new BadRequestError("Invalid email or password");
      }

      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) {
        throw new BadRequestError("Invalid email or password");
      }

      const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };
      if (user.role === "organiser") {
        payload.organisation = user.organisation;
      }
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }

  static async refreshAccessToken(refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      const accessToken = generateAccessToken(payload);
      return { accessToken, refreshToken };
    } catch (err) {
      throw new UnauthorizedError("Invalid refresh token");
    }
  }
}

module.exports = AuthService;
