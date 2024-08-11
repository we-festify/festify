const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

const BannerController = require("../controllers/banner");

router.get(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("banners:read"),
  BannerController.getAllByTarget
);
router.get(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("banners:read"),
  BannerController.getById
);
router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("banners:create"),
  BannerController.create
);
router.put(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("banners:update", [
    "banners:updateSelf",
    BannerController.selfValidator,
  ]),
  BannerController.updateById
);
router.delete(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("banners:delete", [
    "banners:deleteSelf",
    BannerController.selfValidator,
  ]),
  BannerController.deleteById
);

module.exports = router;
