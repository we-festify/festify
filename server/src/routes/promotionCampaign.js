const express = require("express");
const router = express.Router();
const PromotionCampaignController = require("../controllers/promotionCampaign");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("promotionCampaign:create"),
  PromotionCampaignController.create
);
router.get(
  "/best",
  RBACMiddleware.requirePermissions("promotionCampaign:read"),
  PromotionCampaignController.getBestApplicable
);
router.get(
  "/me",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("promotionCampaign:read"),
  PromotionCampaignController.getAllValidByUserEmail
);
router.get(
  "/:id",
  RBACMiddleware.requirePermissions("promotionCampaign:read"),
  PromotionCampaignController.getById
);
router.get(
  "/code/:code",
  RBACMiddleware.requirePermissions("promotionCampaign:read"),
  PromotionCampaignController.getByCode
);
router.get(
  "/",
  RBACMiddleware.requirePermissions("promotionCampaign:read"),
  PromotionCampaignController.getAll
);
router.put(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("promotionCampaign:update"),
  PromotionCampaignController.updateById
);

module.exports = router;
