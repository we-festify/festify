const MapMarkerRepository = require("../repositories/mapMarker");
const { BadRequestError } = require("../utils/errors");

class MapMarkerService {
  static #checkRequiredFields(marker) {
    const requiredFields = ["name", "description", "latitude", "longitude"];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!marker[field]) {
        missingFields.push(field);
      }
    });
    if (missingFields.length) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }
  }

  static async create(marker) {
    try {
      this.#checkRequiredFields(marker);
      return await MapMarkerRepository.create(marker);
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      return await MapMarkerRepository.getAll();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      return await MapMarkerRepository.getById(id);
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, marker) {
    try {
      this.#checkRequiredFields(marker);
      return await MapMarkerRepository.updateById(id, marker);
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await MapMarkerRepository.deleteById(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MapMarkerService;
