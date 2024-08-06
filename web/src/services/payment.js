class PaymentService {
  static async displayPaymentPopup({ user, order, description }) {
    try {
      const { amount, currency, id: orderId, notes } = order;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency,
        name: "Festify",
        description: description || "Festify Payment",
        order_id: orderId,
        notes,
        prefill: {
          name: user?.name,
          email: user?.email,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      throw err;
    }
  }
}

export default PaymentService;
