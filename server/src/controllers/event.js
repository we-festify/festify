const EventService = require("../services/event");
const { BadRequestError } = require("../utils/errors");

class EventController {
  static async create(req, res, next) {
    try {
      const { event } = req.body;
      if (!event) throw new BadRequestError("Event data is required");
      const createdEvent = await EventService.create(event);
      res.status(201).json({ event: createdEvent });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const event = await EventService.getById(id);
      res.status(200).json({ event });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { extended } = req.query;
      const events = await EventService.getAll({ extended });
      res.status(200).json({ events });
    } catch (err) {
      next(err);
    }
  }

  static async getAllByType(req, res, next) {
    try {
      const { extended } = req.query;
      const { type } = req.params;
      const events = await EventService.getAllByType(type, { extended });
      res.status(200).json({ events });
    } catch (err) {
      next(err);
    }
  }

  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { event } = req.body;
      if (!event) throw new BadRequestError("Event data is required");
      const updatedEvent = await EventService.updateById(id, event);
      res.status(200).json({ event: updatedEvent });
    } catch (err) {
      next(err);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const deletedEvent = await EventService.deleteById(id);
      res.status(200).json({ event: deletedEvent });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventController;
