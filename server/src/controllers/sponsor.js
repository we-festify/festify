const SponsorService = require("../services/sponsor");
const { BadRequestError } = require("../utils/errors");

class SponsorController {
  static async create(req, res, next) {
    try {
      const { sponsor } = req.body;
      if (!sponsor) {
        throw new BadRequestError("No sponsor object in request body");
      }
      const newSponsor = await SponsorService.create(sponsor);
      return res.status(201).json({
        sponsor: newSponsor,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const sponsor = await SponsorService.getById(id);
      return res.status(200).json({
        sponsor,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const sponsors = await SponsorService.getAll();
      return res.status(200).json({
        sponsors,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { sponsor } = req.body;
      if (!sponsor) {
        throw new BadRequestError("No sponsor object in request body");
      }
      const updatedSponsor = await SponsorService.updateById(id, sponsor);
      return res.status(200).json({
        sponsor: updatedSponsor,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const deletedSponsor = await SponsorService.deleteById(id);
      return res.status(204).json({
        sponsor: deletedSponsor,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SponsorController;
