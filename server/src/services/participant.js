const EventRepository = require("../repositories/event");
const ParticipantRepository = require("../repositories/participant");
const UserRepository = require("../repositories/user");
const { BadRequestError } = require("../utils/errors");

class ParticipantService {
  static checkRequiredFields(participant) {
    if (!participant) throw new BadRequestError("Missing participant");
    const requiredFields = ["event", "leader"];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!participant[field]) missingFields.push(field);
    });
    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }
  }

  static async #checkValidMembers(members) {
    const valid = await UserRepository.checkAllVerified(members);
    if (!valid) {
      throw new BadRequestError("Some members are not verified, or invalid");
    }
  }

  static async #checkExistingParticipation(event, participant) {
    const existingParticipations =
      await ParticipantRepository.getAllByEventAndMembers(
        event._id,
        participant.members
      );
    if (existingParticipations.length > 0) {
      throw new BadRequestError(
        "Some members are already participating in this event"
      );
    }
  }

  static async #checkValidParticipation(event, participant) {
    const date = new Date();
    if (new Date(event.registrationsStart) > date) {
      throw new BadRequestError("Registrations have not started yet");
    } else if (new Date(event.registrationsEnd) < date) {
      throw new BadRequestError("Registrations have ended");
    }
    if (participant.isTeam) {
      if (!participant.teamName) {
        throw new BadRequestError("Team name is required");
      }
      if (event.minTeamSize > participant.members.length) {
        throw new BadRequestError(
          `Team must have at least ${event.minTeamSize} members`
        );
      }
      if (event.maxTeamSize < participant.members.length) {
        throw new BadRequestError(
          `Team can have at most ${event.maxTeamSize} members`
        );
      }
    } else {
      if (participant.members.length > 1) {
        throw new BadRequestError(`Solo event can have at most 1 member`);
      }
    }
  }

  static async create(participant) {
    try {
      this.checkRequiredFields(participant);
      const event = await EventRepository.getById(participant.event);
      if (!event) throw new BadRequestError("Invalid event");

      participant.members = [
        ...new Set([participant.leader, ...(participant.members || [])]),
      ]; // add leader and remove duplicates

      await this.#checkValidMembers(participant.members);
      await this.#checkExistingParticipation(event, participant);

      if (event.minTeamSize > 1) {
        participant.isTeam = true;
      } else {
        participant.isTeam = false;
        participant.teamName = null;
      }
      await this.#checkValidParticipation(event, participant);

      return await ParticipantRepository.create(participant);
    } catch (err) {
      throw err;
    }
  }

  static async getAllParticipationsBySelf(userId) {
    try {
      if (!userId) throw new BadRequestError("Missing userId");
      const participations =
        await ParticipantRepository.getAllParticipationsBySelf(userId);
      return participations;
    } catch (err) {
      throw err;
    }
  }

  static async getAllByUserId(userId) {
    try {
      if (!userId) throw new BadRequestError("Missing userId");
      const participations = await ParticipantRepository.getAllByUserId(userId);
      return participations;
    } catch (err) {
      throw err;
    }
  }

  static async getAllByEventId(eventId) {
    try {
      if (!eventId) throw new BadRequestError("Missing eventId");
      const participations = await ParticipantRepository.getAllByEventId(
        eventId
      );
      return participations;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ParticipantService;
