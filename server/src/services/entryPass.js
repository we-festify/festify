const EntryPassRepository = require("../repositories/entryPass");
const EventRepository = require("../repositories/event");
const { BadRequestError } = require("../utils/errors");
const PaymentService = require("./payment");

class EntryPassService {
  static #checkRequiredFields(entryPass) {
    if (!entryPass) {
      throw new BadRequestError("Entry pass is required");
    }
    const requiredFields = ["user", "event"];
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!(field in entryPass)) {
        missingFields.push(field);
      }
    });
    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }
  }

  static async getById(entryPassId) {
    try {
      if (!entryPassId) {
        throw new BadRequestError("Entry pass id is required");
      }
      const entryPass = await EntryPassRepository.getById(entryPassId);
      return entryPass;
    } catch (err) {
      throw err;
    }
  }

  static async create(user, event) {
    try {
      if (!user) {
        throw new BadRequestError("User is required");
      }
      if (!event) {
        throw new BadRequestError("Event is required");
      }
      const entryPass = await EntryPassRepository.create(user, event);
      return entryPass;
    } catch (err) {
      throw err;
    }
  }

  static async purchase({ user, eventId }) {
    try {
      const event = await EventRepository.getById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      const alreadyPurchased = await EntryPassRepository.getByUserAndEvent({
        user,
        event,
      });
      if (alreadyPurchased) {
        throw new Error("Entry pass already purchased");
      }

      if (event.entryPassPriceInINR === 0) {
        const entryPass = await EntryPassService.create(user, event);
        return {
          entryPass,
          type: "entry-pass",
        };
      }
      const order = await PaymentService.createOrder({
        amountInINR: event.entryPassPriceInINR,
        notes: {
          type: "EntryPass",
          user: user._id,
          event: event._id,
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

  static async getByUser(user) {
    try {
      if (!user) {
        throw new BadRequestError("User is required");
      }
      const entryPasses = await EntryPassRepository.getByUser(user);
      return entryPasses;
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, entryPass) {
    try {
      if (!id) {
        throw new BadRequestError("Entry pass id is required");
      }
      this.#checkRequiredFields(entryPass);
      const updatedEntryPass = await EntryPassRepository.updateById(
        id,
        entryPass
      );
      return updatedEntryPass;
    } catch (err) {
      throw err;
    }
  }

  static async checkIn(entryPassId) {
    try {
      if (!entryPassId) {
        throw new BadRequestError("Entry pass id is required");
      }
      const entryPass = await EntryPassRepository.getById(entryPassId);
      if (!entryPass) {
        throw new Error("Entry pass not found");
      }
      if (entryPass.isUsed) {
        throw new Error("Entry pass already used once");
      }
      const updatedEntryPass = await EntryPassRepository.updateById(entryPassId, {
        isUsed: true,
        usedAt: new Date(),
      });
      return updatedEntryPass;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EntryPassService;
