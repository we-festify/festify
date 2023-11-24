const AuthService = require("../services/auth");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");

class AuthController {
  static async login(req, res, next) {
    try {
      const { user } = req.body;
      if (!user) {
        throw new BadRequestError("Missing user");
      }
      const { email, password } = user;
      const {
        accessToken,
        refreshToken,
        user: userPayload,
      } = await AuthService.loginWithEmailPassword(email, password);
      res.cookie("festifyRefreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 1000,
      });
      res.status(200).json({ accessToken, user: userPayload });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { user } = req.body;
      const {
        accessToken,
        refreshToken,
        user: userPayload,
      } = await AuthService.register(user);
      res.cookie("festifyRefreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 1000,
      });
      res.status(201).json({ accessToken, user: userPayload });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      if (!req.cookies) throw new UnauthorizedError("Missing refresh token");
      const { festifyRefreshToken } = req.cookies;
      const {
        accessToken,
        refreshToken,
        user: userPayload,
      } = await AuthService.refreshAccessToken(festifyRefreshToken);
      res.cookie("festifyRefreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 1000,
      });
      res.status(200).json({ accessToken, user: userPayload });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await AuthService.sendForgotPasswordEmail(email);
      res.status(200).json({
        message: `Reset password link has been sent to your email ${email}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;
      await AuthService.resetPassword(token, password);
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res.clearCookie("festifyRefreshToken");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const { token } = req.body;
      const user = await AuthService.verifyUserEmail(token);
      res.status(200).json({
        user,
        message: "Email verified successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async sendVerificationEmail(req, res, next) {
    try {
      const { user } = req;
      if (user.isVerified) {
        throw new BadRequestError("User is already verified");
      }
      await AuthService.trySendVerificationEmail(user._id);
      res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
