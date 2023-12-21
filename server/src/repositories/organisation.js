const { applicationDB } = require("../../database");

const Organisation = require("../models/Organisation")(applicationDB);

class OrganisationRepository {
  static async create(organisation) {
    try {
      return await Organisation.create(organisation);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await Organisation.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    try {
      return await Organisation.find();
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, organisation) {
    try {
      return await Organisation.findByIdAndUpdate(id, organisation, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await Organisation.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrganisationRepository;
