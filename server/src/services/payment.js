const RazorpayPaymentRepository = require("../repositories/razorpayPayment");
const RazorpayService = require("./razorpay");

class PaymentService {
  static async createOrder({ amountInINR, receipt, notes }) {
    try {
      return await RazorpayService.createOrder({
        amountInINR,
        receipt,
        notes,
      });
    } catch (err) {
      throw err;
    }
  }

  static async createPayment({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    user,
    type,
    reference,
    amount,
    status,
    description,
  }) {
    try {
      console.log(description);
      return await RazorpayPaymentRepository.create({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        user,
        type,
        reference,
        amount,
        status,
        description,
      });
    } catch (err) {
      throw err;
    }
  }

  static async verifyPayment({ body, headers }) {
    try {
      const isValid = await RazorpayService.verifyWebhookSignature({
        body,
        headers,
      });
      if (!isValid) {
        throw new Error("Invalid signature");
      }
    } catch (err) {
      throw err;
    }
  }

  static async getPaymentById(id, { extended } = {}) {
    try {
      return await RazorpayPaymentRepository.getById(id, { extended });
    } catch (err) {
      throw err;
    }
  }

  static async getPaymentsByUser(user) {
    try {
      return await RazorpayPaymentRepository.getByUser(user);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PaymentService;
