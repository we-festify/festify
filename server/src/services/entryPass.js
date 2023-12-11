const EntryPassRepository = require("../repositories/entryPass");
const EventRepository = require("../repositories/event");
const PaymentService = require("./payment");

class EntryPassService {
  static async create(user, event) {
    try {
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
      const entryPasses = await EntryPassRepository.getByUser(user);
      return entryPasses;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EntryPassService;
