const SponsorRepository = require("../repositories/sponsor");
const { BadRequestError } = require("../utils/errors");

class SponsorService {
  static #checkRequiredFields(sponsor) {
    const requiredFields = [
      "name",
      "websiteUrl",
      "logoUrl",
      "type",
      "priority",
    ];
    const sponsorKeys = Object.keys(sponsor);
    const errors = [];
    requiredFields.forEach((field) => {
      if (!sponsorKeys.includes(field)) {
        errors.push(`Missing required field: ${field}`);
      }
    });
    if (errors.length) {
      throw new BadRequestError(errors);
    }
  }

  static async #checkAlreadyExists(sponsor) {
    const existingSponsor = await SponsorRepository.getByName(sponsor.name);
    if (existingSponsor && existingSponsor._id != sponsor._id) {
      throw new BadRequestError("Sponsor with name already exists");
    }

    const existingSponsorWebsiteUrl = await SponsorRepository.getByWebsiteUrl(
      sponsor.websiteUrl
    );
    if (
      existingSponsorWebsiteUrl &&
      existingSponsorWebsiteUrl._id != sponsor._id
    ) {
      throw new BadRequestError("Sponsor with website URL already exists");
    }
  }

  static async create(sponsor) {
    try {
      this.#checkRequiredFields(sponsor);
      await this.#checkAlreadyExists(sponsor);
      if (sponsor.priority < 1) {
        throw new BadRequestError("Priority must be greater than 0");
      }
      return await SponsorRepository.create(sponsor);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await SponsorRepository.getById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      return await SponsorRepository.getAll();
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, sponsor) {
    try {
      this.#checkRequiredFields(sponsor);
      await this.#checkAlreadyExists(sponsor);
      if (sponsor.priority < 1) {
        throw new BadRequestError("Priority must be greater than 0");
      }
      return await SponsorRepository.updateById(id, sponsor);
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await SponsorRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SponsorService;
