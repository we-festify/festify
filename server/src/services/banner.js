const BannerRepository = require("../repositories/banner");
const { BadRequestError } = require("../utils/errors");

class BannerService {
  static checkRequiredFields(banner) {
    if (!banner) throw new BadRequestError("Missing banner");
    const requiredFields = ["text", "variant", "target"];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!banner[field]) missingFields.push(field);
    });
    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }
  }

  static async create(banner) {
    try {
      this.checkRequiredFields(banner);
      return await BannerRepository.create(banner);
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      return await BannerRepository.getAll();
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await BannerRepository.getById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAllByTarget(target) {
    try {
      return await BannerRepository.getAllByTarget(target);
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, banner) {
    try {
      this.checkRequiredFields(banner);
      return await BannerRepository.updateById(id, banner);
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await BannerRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BannerService;
