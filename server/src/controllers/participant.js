const ParticipantService = require("../services/participant");

class ParticipantController {
  static async register(req, res, next) {
    try {
      const { participant, promoCode } = req.body;
      const { user } = req;
      const {
        type,
        participant: participantPayload,
        order,
      } = await ParticipantService.register(participant, {
        promoCode,
        email: user.email,
      });
      res.status(201).json({
        participant: participantPayload,
        order,
        type,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllParticipationsBySelf(req, res, next) {
    try {
      const { user } = req;
      const participations =
        await ParticipantService.getAllParticipationsBySelf(user._id);
      res.status(200).json({
        participations,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const participations = await ParticipantService.getAllByUserId(userId);
      res.status(200).json({
        participations,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllByEventId(req, res, next) {
    try {
      const { eventId } = req.params;
      const participations = await ParticipantService.getAllByEventId(eventId);
      res.status(200).json({
        participations,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ParticipantController;
