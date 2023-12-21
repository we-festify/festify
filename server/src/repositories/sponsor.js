const { applicationDB } = require("../../database");

const Sponsor = require("../models/Sponsor")(applicationDB);

class SponsorRepository {
  static async create(sponsor) {
    try {
      return await Sponsor.create(sponsor);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await Sponsor.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getByName(name) {
    try {
      return await Sponsor.findOne({ name });
    } catch (err) {
      throw err;
    }
  }

  static async getByWebsiteUrl(websiteUrl) {
    try {
      return await Sponsor.findOne({ websiteUrl });
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      return await Sponsor.find();
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, sponsor) {
    try {
      return await Sponsor.findByIdAndUpdate(id, sponsor, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await Sponsor.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SponsorRepository;
