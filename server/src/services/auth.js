const UserRepository = require("../repositories/user");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyEmailVerificationToken,
  generateEmailVerificationToken,
  generateResetPasswordToken,
  verifyResetPasswordToken,
} = require("../utils/token");
const { hashPassword, comparePassword } = require("../utils/password");
const { validateEmail } = require("../utils/validations");
const MailerService = require("./mailer");

class AuthService {
  static #checkRequiredFields(user) {
    const requiredFields = [
      "name",
      "email",
      "password",
      "gender",
      "college",
      "zipCode",
      "degree",
      "yearOfGraduation",
    ];
    const missingFields = requiredFields.filter((field) => !user[field]);
    if (missingFields.length) {
      throw new BadRequestError(`Missing ${missingFields.join(", ")}`);
    }
  }

  static async register(user) {
    try {
      this.#checkRequiredFields(user);
      const { email, password } = user;
      if (!validateEmail(email)) throw new BadRequestError("Invalid email");
      const existingUser = await UserRepository.getByEmail(email);
      if (existingUser) {
        throw new BadRequestError("User with email already exists, try login");
      }

      if (password.length < 8)
        throw new BadRequestError(
          "Password must be at least 8 characters long"
        );

      const hashedPassword = await hashPassword(password);
      user.password = undefined;
      user.passwordHash = hashedPassword;

      email = email.trim().toLowerCase();
      user.email = email;
      if (!validateEmail(email)) throw new BadRequestError("Invalid email");

      const newUser = await UserRepository.create(user);

      this.trySendVerificationEmail(newUser._id);

      const payload = {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return {
        accessToken,
        refreshToken,
        user: UserRepository.excludeSensitiveFields(newUser),
      };
    } catch (err) {
      throw err;
    }
  }

  static async loginWithEmailPassword(email, password) {
    try {
      if (!email || !password)
        throw new BadRequestError("Invalid email or password");

      email = email.trim().toLowerCase();
      if (!validateEmail(email)) throw new BadRequestError("Invalid email");

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

      return {
        accessToken,
        refreshToken,
        user: UserRepository.excludeSensitiveFields(user),
      };
    } catch (err) {
      throw err;
    }
  }

  static async refreshAccessToken(refreshToken) {
    try {
      if (!refreshToken) throw new UnauthorizedError("Missing refresh token");
      const payload = verifyRefreshToken(refreshToken);
      if (!payload) throw new UnauthorizedError("Invalid refresh token");
      const { _id } = payload;
      const user = await UserRepository.getById(_id);
      if (!user) throw new UnauthorizedError("User not found");
      const newPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };
      if (user.role === "organiser") {
        newPayload.organisation = user.organisation;
      }
      const accessToken = generateAccessToken(newPayload);
      return {
        accessToken,
        refreshToken,
        user: UserRepository.excludeSensitiveFields(user),
      };
    } catch (err) {
      throw err;
    }
  }

  static async trySendVerificationEmail(userId) {
    try {
      const user = await UserRepository.getById(userId);
      if (!user) throw new BadRequestError("User not found");
      const verificationToken = generateEmailVerificationToken({
        _id: user._id,
      });
      await MailerService.sendVerificationEmail({
        email: user.email,
        verificationToken,
      });
    } catch (err) {
      throw err;
    }
  }

  static async verifyUserEmail(token) {
    try {
      const payload = verifyEmailVerificationToken(token);
      if (!payload) throw new BadRequestError("Invalid token");
      const { _id } = payload;
      const user = await UserRepository.verifyById(_id);
      if (!user) throw new BadRequestError("User not found");
      return UserRepository.excludeSensitiveFields(user);
    } catch (err) {
      throw err;
    }
  }

  static async sendForgotPasswordEmail(email) {
    try {
      if (!email) throw new BadRequestError("Email is required");
      email = email.trim().toLowerCase();
      if (!validateEmail(email)) throw new BadRequestError("Invalid email");
      const user = await UserRepository.getByEmail(email);
      if (!user) throw new BadRequestError("User not found");
      const userPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };
      const token = generateResetPasswordToken(userPayload, user.passwordHash);
      user.resetPasswordToken = token;
      await user.save();
      await MailerService.sendForgotPasswordMail({
        to: user.email,
        resetPasswordToken: token,
        user: UserRepository.excludeSensitiveFields(user),
      });
    } catch (err) {
      throw err;
    }
  }

  static async resetPassword(token, newPassword) {
    try {
      if (!token || !newPassword)
        throw new BadRequestError("Token and new password are required");
      const user = await UserRepository.getByResetPasswordToken(token);
      if (!user) throw new BadRequestError("Invalid token");
      const payload = verifyResetPasswordToken(token, user.passwordHash);
      if (!payload) throw new BadRequestError("Invalid token");
      const hashedPassword = await hashPassword(newPassword);
      user.passwordHash = hashedPassword;
      user.resetPasswordToken = null;
      await user.save();
      return UserRepository.excludeSensitiveFields(user);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthService;
