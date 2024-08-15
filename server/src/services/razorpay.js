const Razorpay = require("razorpay");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const { BadRequestError } = require("../utils/errors");

class RazorpayService {
  constructor() {
    try {
      this.razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      console.log("Razorpay initialized");
    } catch (err) {
      console.error("Razorpay initialization failed:", err);
    }
  }

  async createOrder({ amountInINR, receipt, notes }) {
    try {
      if (!amountInINR)
        throw new BadRequestError("Missing amountInINR for order");

      const order = await this.razorpay.orders.create({
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

  async verifyWebhookSignature({ body, headers }) {
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

module.exports = new RazorpayService();
