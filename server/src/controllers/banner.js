const BannerService = require("../services/banner");

class BannerController {
  static async create(req, res, next) {
    try {
      const { banner } = req.body;
      const { user } = req;
      const newBanner = await BannerService.create({
        ...banner,
        createdBy: user._id,
      });
      return res.status(201).json({ banner: newBanner });
    } catch (err) {
      return next(err);
    }
  }

  static async getAllByTarget(req, res, next) {
    try {
      const { target } = req.query;

      let banners;
      if (!target) banners = await BannerService.getAll();
      else banners = await BannerService.getAllByTarget(target);

      return res.status(200).json({ banners });
    } catch (err) {
      return next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const banner = await BannerService.getById(id);
      return res.status(200).json({ banner });
    } catch (err) {
      return next(err);
    }
  }

  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { banner } = req.body;
      const updatedBanner = await BannerService.updateById(id, banner);
      return res.status(200).json({ banner: updatedBanner });
    } catch (err) {
      return next(err);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      await BannerService.deleteById(id);
      return res.status(200).json({ message: "Banner deleted" });
    } catch (err) {
      return next(err);
    }
  }

  static async selfValidator(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;
      const banner = await BannerService.getById(id);
      if (banner.createdBy.toString() !== user._id.toString()) {
        return false;
      }
      return true;
    } catch (err) {
      return true;
    }
  }
}

module.exports = BannerController;
