const PaymentService = require("../services/payment");
const EntryPassService = require("../services/entryPass");

class PaymentController {
  // for captured payments
  static async verify(req, res, next) {
    try {
      const { body, headers } = req;
      await PaymentService.verifyAndPersistPayment({ body, headers });
      // send response to payment gateway
      res.status(200).json({
        message: "Payment verified",
      });

      // create entities in database
      const {
        payload: {
          payment: {
            entity: {
              notes: { type, user, reference },
            },
          },
        },
      } = body;

      if (type === "Event") {
        // create entry pass
        await EntryPassService.create(user, reference);
      }
    } catch (err) {
      console.log(err);
      // send response to payment gateway
      res.status(200).json({
        message: "Payment verified",
      });
    }
  }
}

module.exports = PaymentController;
