const ParticipantService = require("../services/participant");

class ParticipantController {
  static async create(req, res, next) {
    try {
      const { participant } = req.body;
      const participantPayload = await ParticipantService.create(participant);
      res.status(201).json({
        message: "Participant created successfully",
        participant: participantPayload,
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
        message: "Participations fetched successfully",
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
        message: "Participations fetched successfully",
        participations,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ParticipantController;
