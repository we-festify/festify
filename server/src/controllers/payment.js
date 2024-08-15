const PaymentService = require("../services/payment");
const EntryPassService = require("../services/entryPass");
const ParticipantService = require("../services/participant");
const RewardService = require("../services/rewards");

class PaymentController {
  // for captured or failed payments
  // this is the webhook endpoint
  // this is called by razorpay
  static async verify(req, res, next) {
    // send response to payment gateway
    res.status(200).json({
      message: "Payment reached server",
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
              notes: { type, user, participant, event, appliedPromotionId },
              amount,
              status,
            },
          },
        },
      } = body;

      let reference;
      let reward;
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

        // for any type of payment
        // Create an entry in rewards table if promotion is applied
        // and payment is successful
        try {
          if (appliedPromotionId) {
            const rewardData = {
              user,
              type: "PromotionCampaign",
              reference: appliedPromotionId,
              status: "used",
              usedBy: user,
            };
            reward = await RewardService.create(rewardData);
          }
        } catch (err) {
          // do nothing: reward creation failed
          // side effect: user can use the promotion again
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
        appliedReward: reward,
      };
      await PaymentService.createPayment(payment);
    } catch (err) {
      console.log(err);
    }
  }

  static async getPaymentById(req, res, next) {
    try {
      const { id } = req.params;
      const payment = await PaymentService.getPaymentById(id);
      res.status(200).json({
        payment,
      });
    } catch (err) {
      next(err);
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

  static async selfValidator(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;
      const payment = await PaymentService.getPaymentById(id, {
        extended: false,
      });
      if (payment.user.toString() !== user._id.toString()) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = PaymentController;
