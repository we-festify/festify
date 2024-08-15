const EventRepository = require("../repositories/event");
const ParticipantRepository = require("../repositories/participant");
const UserRepository = require("../repositories/user");
const { BadRequestError } = require("../utils/errors");
const PaymentService = require("./payment");
const PromotionCampaignService = require("./promotionCampaign");
const RewardService = require("./rewards");

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
      return await ParticipantRepository.create(participant);
    } catch (err) {
      throw err;
    }
  }

  static async register(participantData, { promoCode, email }) {
    try {
      this.checkRequiredFields(participantData);
      const event = await EventRepository.getById(participantData.event);
      if (!event) throw new BadRequestError("Invalid event");

      if (!event.isRegistrationRequired) {
        throw new BadRequestError(
          "Registrations are not required for this event"
        );
      }

      participantData.members = [
        ...new Set([
          participantData.leader,
          ...(participantData.members || []),
        ]),
      ]; // add leader and remove duplicates

      await this.#checkValidMembers(participantData.members);
      await this.#checkExistingParticipation(event, participantData);

      if (event.minTeamSize > 1) {
        participantData.isTeam = true;
      } else {
        participantData.isTeam = false;
        participantData.teamName = null;
      }
      await this.#checkValidParticipation(event, participantData);

      let promotion,
        amountToPay = event.registrationFeesInINR;
      console.log("Amount to pay:", amountToPay);
      if (promoCode) {
        promotion = await PromotionCampaignService.getByCode(promoCode);
        if (!promotion) throw new BadRequestError("Invalid promo code");

        // check user eligibility
        let isEligible = false;
        if (promotion.type === "general") isEligible = true;
        else if (promotion.type === "targeted") {
          const userPatterns = [
            `email:${email}`,
            `domain:${email.split("@")[1]}`,
          ];
          isEligible = promotion.pattern.some((pattern) =>
            userPatterns.some((userPattern) =>
              new RegExp(pattern).test(userPattern)
            )
          );

          if (!isEligible) {
            throw new BadRequestError("User not eligible for this promotion");
          }
        }

        // check applicable on validity
        const validApplicableOn = ["event:*", `event:${event._id.toString()}`];
        let isApplicable = false;
        validApplicableOn.forEach((applicableOn) => {
          if (promotion.applicableOn.includes(applicableOn)) {
            isApplicable = true;
          }
        });
        if (!isApplicable) {
          throw new BadRequestError("Promotion not applicable on this event");
        }

        const discount = await PromotionCampaignService.calculateDiscount(
          promotion,
          event.registrationFeesInINR
        );
        console.log("Discount:", discount);
        amountToPay = event.registrationFeesInINR - discount;
      }

      // everything is fine, its payment time
      if (amountToPay === 0) {
        const participant = await ParticipantRepository.create(participantData);

        // create used reward for the promotion
        const reward = {
          user: participant.leader,
          type: "PromotionCampaign",
          reference: promotion._id,
          status: "used",
          usedBy: participant.leader,
        };
        await RewardService.create(reward);

        return {
          participant,
          type: "participant",
        };
      }

      console.log("Amount to pay:", amountToPay);
      const order = await PaymentService.createOrder({
        amountInINR: amountToPay,
        notes: {
          type: "Participant",
          user: participantData.leader,
          participant: JSON.stringify(participantData),
          appliedPromotionId: promotion._id,
        },
      });
      return {
        order,
        type: "order",
      };
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
