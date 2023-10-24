const EventRepository = require("../repositories/event");
const RegistrationRepository = require("../repositories/registration");
const TeamRepository = require("../repositories/team");
const { BadRequestError } = require("../utils/errors");

class RegistrationService {
  static checkRequiredFields(registration) {
    if (!registration) throw new BadRequestError("Missing registration");
    const requiredFields = ["event", "team"];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!registration[field]) missingFields.push(field);
    });
    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }
  }

  static async #validateEvent(eventId) {
    const event = await EventRepository.getById(eventId);
    if (!event) throw new BadRequestError("Invalid event id");
    if (event.registrationsOpen === false)
      throw new BadRequestError("Event registration is closed");
    return event;
  }

  static async #validateTeam(teamId) {
    const team = await TeamRepository.getById(teamId);
    if (!team) throw new BadRequestError("Invalid team id");
    if (team.status !== "active")
      throw new BadRequestError("Team is not active");
    return team;
  }

  static async #validateRegistration(event, team) {
    if (team.members.length > event.maxTeamSize)
      throw new BadRequestError("Team is too large");
    if (team.members.length < event.minTeamSize)
      throw new BadRequestError("Team is too small");

    const existingRegistrations =
      await RegistrationRepository.findByEventAndMembers(
        event._id,
        team.members
      );

    if (existingRegistrations.length > 0)
      throw new BadRequestError("Some members are already registered");
  }

  static async create(registration) {
    try {
      this.checkRequiredFields(registration);

      const event = await this.#validateEvent(registration.event);
      const team = await this.#validateTeam(registration.team);

      registration.event = event;
      registration.team = team;

      await this.#validateRegistration(event, team);

      return await RegistrationRepository.create(registration);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RegistrationService;
