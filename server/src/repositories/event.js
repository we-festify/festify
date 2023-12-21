const { applicationDB } = require("../../database");

const Event = require("../models/Event")(applicationDB);

class EventRepository {
  static async create(event) {
    try {
      return await Event.create(event);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await Event.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAll({ extended = false }) {
    try {
      if (extended) return await Event.find();
      return await Event.find().select("-description -timeline");
    } catch (err) {
      throw err;
    }
  }

  static async getAllByType(type, { extended = false }) {
    try {
      if (extended) return await Event.find({ type });
      return await Event.find({ type }).select("-description -timeline");
    } catch (err) {
      throw err;
    }
  }

  static async getAllByOrganisation(organisationId, { extended = false }) {
    try {
      if (extended) return await Event.find({ organisation: organisationId });
      return await Event.find({ organisation: organisationId }).select(
        "-description -timeline"
      );
    } catch (err) {
      throw err;
    }
  }

  static async deleteAllByOrganisation(organisationId) {
    try {
      return await Event.deleteMany({ organisation: organisationId });
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, event) {
    try {
      return await Event.findByIdAndUpdate(id, event, { new: true });
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await Event.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EventRepository;
