const AuthService = require("../services/auth");
const { UnauthorizedError } = require("../utils/errors");

class AuthController {
  static async login(req, res, next) {
    try {
      const { user } = req.body;
      const { email, password } = user;
      const { accessToken, refreshToken } =
        await AuthService.loginWithEmailPassword(email, password);
      res.cookie("festifyRefreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(process.env.JWT_REFRESH_EXPIRES_IN),
      });
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { user } = req.body;
      const { accessToken, refreshToken } = await AuthService.register(user);
      res.cookie("festifyRefreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(process.env.JWT_REFRESH_EXPIRES_IN),
      });
      res.status(201).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      if (!req.cookies) throw new UnauthorizedError("Missing refresh token");
      const { festifyRefreshToken } = req.cookies;
      const { accessToken, refreshToken } =
        await AuthService.refreshAccessToken(festifyRefreshToken);
      res.cookie("festifyRefreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(process.env.JWT_REFRESH_EXPIRES_IN),
      });
      res.status(200).json({ accessToken });
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
}

module.exports = AuthController;
