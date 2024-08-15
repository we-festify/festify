const { applicationDB } = require("../../database");

const RazorpayPayment = require("../models/RazorpayPayment")(applicationDB);

class RazorpayPaymentRepository {
  static async create(payment) {
    try {
      return await RazorpayPayment.create(payment);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id, { extended = false }) {
    try {
      if (extended) {
        return await RazorpayPayment.findById(id).populate({
          path: "appliedReward",
          populate: {
            path: "reference",
          },
        });
      }
      return await RazorpayPayment.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getByUser(user) {
    try {
      return await RazorpayPayment.find({ user }).sort({ createdAt: -1 });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RazorpayPaymentRepository;
