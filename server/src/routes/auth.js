const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");
const AuthController = require("../controllers/auth");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/refresh", AuthController.refresh);
router.get("/logout", AuthMiddleware.requireLoggedIn, AuthController.logout);
router.post(
  "/send-verification-email",
  AuthMiddleware.requireLoggedIn,
  AuthController.sendVerificationEmail
);
router.get("/verify-email", AuthController.verifyEmail);

module.exports = router;
