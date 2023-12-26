const EventRepository = require("../repositories/event");
const { BadRequestError } = require("../utils/errors");
const { createUpdateEventNotification } = require("../utils/notification");
const NotificationService = require("./notification");

class EventService {
  static checkRequiredFields(event) {
    if (!event) throw new BadRequestError("Missing event");
    const requiredFields = [
      "name",
      "type",
      "summary",
      "description",
      "venue",
      "timeline",
      "image",
      "organisation",
      "registrationsStart",
      "registrationsEnd",
      "startTime",
      "endTime",
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
      if (!id) throw new BadRequestError("Missing id");
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
      if (!type) throw new BadRequestError("Missing type");
      return await EventRepository.getAllByType(type, { extended });
    } catch (err) {
      throw err;
    }
  }

  static async getAllByOrganisation(organisationId, { extended = false }) {
    try {
      if (!organisationId) throw new BadRequestError("Missing organisationId");
      return await EventRepository.getAllByOrganisation(organisationId, {
        extended,
      });
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, event) {
    try {
      if (!id) throw new BadRequestError("Missing id");
      this.checkRequiredFields(event);
      const updatedEvent = await EventRepository.updateById(id, event);

      // send notification
      const notification = createUpdateEventNotification(updatedEvent);
      await NotificationService.sendInAppNotification(notification);

      return updatedEvent;
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      if (!id) throw new BadRequestError("Missing id");
      return await EventRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EventService;
