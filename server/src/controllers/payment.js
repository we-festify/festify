const PaymentService = require("../services/payment");
const EntryPassService = require("../services/entryPass");
const ParticipantService = require("../services/participant");

class PaymentController {
  // for captured or failed payments
  // this is the webhook endpoint
  // this is called by razorpay
  static async verify(req, res, next) {
    // send response to payment gateway
    res.status(200).json({
      message: "Payment verified",
    });

    try {
      const { body, headers } = req;
      await PaymentService.verifyPayment({ body, headers });

      // create reference entities in database
      const razorpaySignature = headers["x-razorpay-signature"];
      const {
        payload: {
          payment: {
            entity: {
              id: razorpayPaymentId,
              order_id: razorpayOrderId,
              description,
              notes: { type, user, participant, event },
              amount,
              status,
            },
          },
        },
      } = body;

      let reference;
      if (status === "captured") {
        switch (type) {
          case "EntryPass": {
            const entryPass = await EntryPassService.create(user, event);
            reference = entryPass._id;
            break;
          }
          case "Participant": {
            const participantPayload = await ParticipantService.create(
              JSON.parse(participant)
            );
            reference = participantPayload._id;
            break;
          }
          default:
            break;
        }
      }

      const payment = {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        amount,
        user,
        type,
        reference,
        status,
        description,
      };
      await PaymentService.createPayment(payment);
    } catch (err) {
      console.log(err);
    }
  }

  static async getPaymentsBySelf(req, res, next) {
    try {
      const { user } = req;
      const payments = await PaymentService.getPaymentsByUser(user);
      res.status(200).json({
        payments,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PaymentController;
