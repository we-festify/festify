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
  }) {
    try {
      return await RazorpayPaymentRepository.create({
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

  static async verifyAndPersistPayment({ body, headers }) {
    try {
      const isValid = await RazorpayService.verifyWebhookSignature({
        body,
        headers,
      });
      if (!isValid) {
        throw new Error("Invalid signature");
      }
      const razorpaySignature = headers["x-razorpay-signature"];
      const {
        payload: {
          payment: {
            entity: {
              id: razorpayPaymentId,
              order_id: razorpayOrderId,
              notes: { type, user, reference },
              amount,
              status,
            },
          },
        },
      } = body;
      return await PaymentService.createPayment({
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
}

module.exports = PaymentService;
