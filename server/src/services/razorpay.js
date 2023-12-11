const Razorpay = require("razorpay");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class RazorpayService {
  static async createOrder({ amountInINR, receipt, notes }) {
    try {
      const order = await razorpay.orders.create({
        amount: amountInINR * 100,
        currency: "INR",
        receipt,
        notes,
      });
      return order;
    } catch (err) {
      throw err;
    }
  }

  static async verifyWebhookSignature({ body, headers }) {
    try {
      const signature = headers["x-razorpay-signature"];
      const isValid = validateWebhookSignature(
        JSON.stringify(body),
        signature,
        process.env.RAZORPAY_WEBHOOK_SECRET
      );
      return isValid;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RazorpayService;
