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
}

module.exports = ParticipantController;
