const EventRepository = require("../repositories/event");
const { BadRequestError } = require("../utils/errors");

class EventService {
  static checkRequiredFields(event) {
    const requiredFields = [
      "name",
      "type",
      "summary",
      "description",
      "venue",
      "timeline",
      "image",
    ];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!event[field]) missingFields.push(field);
    });
    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }
  }

  static async create(event) {
    try {
      this.checkRequiredFields(event);
      return await EventRepository.create(event);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await EventRepository.getById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAll({ extended = false }) {
    try {
      return await EventRepository.getAll({ extended });
    } catch (err) {
      throw err;
    }
  }

  static async getAllByType(type, { extended = false }) {
    try {
      return await EventRepository.getAllByType(type, { extended });
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, event) {
    try {
      this.checkRequiredFields(event);
      return await EventRepository.updateById(id, event);
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await EventRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EventService;
