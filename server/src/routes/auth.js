const express = require("express");
const router = express.Router();
const { checkLoggedIn } = require("../middlewares/auth");
const AuthController = require("../controllers/auth");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/refresh", AuthController.refresh);
router.get("/logout", checkLoggedIn, AuthController.logout);
router.post(
  "/send-verification-email",
  checkLoggedIn,
  AuthController.sendVerificationEmail
);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;
