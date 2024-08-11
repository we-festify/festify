const { applicationDB } = require("../../database");
const Banner = require("../models/Banner")(applicationDB);

class BannerRepository {
  static async create(banner) {
    try {
      return await Banner.create(banner);
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      return await Banner.find();
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await Banner.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAllByTarget(target) {
    try {
      return await Banner.find({ target });
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, banner) {
    try {
      return await Banner.findByIdAndUpdate(id, banner, { new: true });
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await Banner.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BannerRepository;
