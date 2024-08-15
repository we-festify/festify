const EventService = require("../services/event");
const AnnouncementService = require("../services/announcement");
const NotificationService = require("../services/notification");
const { BadRequestError } = require("../utils/errors");

class EventController {
  static async create(req, res, next) {
    try {
      const { event } = req.body;
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

  static async getAllByOrganisation(req, res, next) {
    try {
      const { extended } = req.query;
      const { organisationId } = req.params;
      const events = await EventService.getAllByOrganisation(organisationId, {
        extended,
      });
      res.status(200).json({ events });
    } catch (err) {
      next(err);
    }
  }

  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { event } = req.body;

      const existingEvent = await EventService.getById(id);
      const updatedEvent = await EventService.updateById(id, event);

      // send notification
      try {
        const notificationPayload = {
          title: `Event Update: ${existingEvent.name} Changed`,
          body: `The event ${existingEvent.name} has been updated. Check the details for the latest information!`,
          redirectUrl: `/events/${updatedEvent._id}`,
          imageUrl: updatedEvent.image,
        };
        NotificationService.sendNotificationToTopic(
          updatedEvent._id.toString(),
          notificationPayload
        );
      } catch (err) {
        console.error(err);
      }

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

  static async creatorValidator(req) {
    try {
      const { id: eventId } = req.params;
      const { user } = req;
      // check if the user is a member of the organisation
      // that the event belongs to
      const event = await EventService.getById(eventId);
      if (!event) return false;
      if (event.organisation.toString() !== user.organisation.toString())
        return false;
      return true;
    } catch (err) {
      return false;
    }
  }

  static async createAnnouncement(req, res, next) {
    try {
      const { announcement } = req.body;
      const { eventId } = req.params;
      const { user } = req;
      if (!announcement) throw new BadRequestError("Announcement is required");
      if (!eventId) throw new BadRequestError("Event ID is required");
      const createdAnnouncement = await AnnouncementService.create({
        ...announcement,
        createdBy: user._id,
        event: eventId,
      });
      return res.status(201).json({
        announcement: createdAnnouncement,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllAnnouncementsByEventId(req, res, next) {
    try {
      const { eventId } = req.params;
      const { page, limit } = req.query;
      const announcements = await AnnouncementService.getAllByEventId(eventId, {
        page,
        limit,
      });
      return res.status(200).json({
        announcements,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteAnnouncementById(req, res, next) {
    try {
      const { id } = req.params;
      const deletedAnnouncement = await AnnouncementService.deleteById(id);
      return res.status(200).json({
        announcement: deletedAnnouncement,
      });
    } catch (err) {
      next(err);
    }
  }

  static async announcementSelfValidator(req) {
    try {
      const { id: announcementId } = req.params;
      const { user } = req;
      // check if the user is the creator of the announcement
      const announcement = await AnnouncementService.getById(announcementId);
      if (!announcement) return false;
      if (announcement.createdBy.toString() !== user._id.toString())
        return false;
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = EventController;
