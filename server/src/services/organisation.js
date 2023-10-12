const OrganisationRepository = require("../repositories/organisation");
const EventRepository = require("../repositories/event");
const { BadRequestError } = require("../utils/errors");

class OrganisationService {
  static checkRequiredFields(organisation) {
    if (!organisation) throw new BadRequestError("Missing organisation");
    const requiredFields = ["name"];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!organisation[field]) missingFields.push(field);
    });
    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }
  }

  static async create(organisation) {
    try {
      this.checkRequiredFields(organisation);
      return await OrganisationRepository.create(organisation);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      if (!id) throw new BadRequestError("Missing id");
      return await OrganisationRepository.getById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAll({ extended = false }) {
    try {
      return await OrganisationRepository.getAll({ extended });
    } catch (err) {
      throw err;
    }
  }

  static async getAllByType(type, { extended = false }) {
    try {
      if (!type) throw new BadRequestError("Missing type");
      return await OrganisationRepository.getAllByType(type, { extended });
    } catch (err) {
      throw err;
    }
  }

  static async getAllByOrganisation(organisationId, { extended = false }) {
    try {
      if (!organisationId) throw new BadRequestError("Missing organisationId");
      return await OrganisationRepository.getAllByOrganisation(organisationId, {
        extended,
      });
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, organisation) {
    try {
      if (!id) throw new BadRequestError("Missing id");
      return await OrganisationRepository.updateById(id, organisation);
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      if (!id) throw new BadRequestError("Missing id");
      await EventRepository.deleteAllByOrganisation(id);
      return await OrganisationRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrganisationService;
