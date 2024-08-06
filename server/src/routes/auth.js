const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");
const AuthController = require("../controllers/auth");

const rateLimiter = require("express-rate-limit");
const emailRateLimiter = rateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: "Too many requests, please try again in an hour",
});

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/refresh", AuthController.refresh);
router.get("/logout", AuthMiddleware.requireLoggedIn, AuthController.logout);
router.post(
  "/send-verification-email",
  emailRateLimiter,
  AuthMiddleware.requireLoggedIn,
  AuthController.sendVerificationEmail
);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;
