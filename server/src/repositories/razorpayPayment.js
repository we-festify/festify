const RazorpayPayment = require("../models/RazorpayPayment");

class RazorpayPaymentRepository {
  static async create({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    user,
    type,
    reference,
    amount,
    status,
  }) {
    try {
      return await RazorpayPayment.create({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        user,
        type,
        reference,
        amount,
        status,
      });
    } catch (err) {
      throw err;
    }
  }

  static async getByUser(user) {
    try {
      return await RazorpayPayment.find({ user })
        .sort({ createdAt: -1 });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RazorpayPaymentRepository;
