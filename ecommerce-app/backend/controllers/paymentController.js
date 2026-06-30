const razorpay = require("../config/razorpay");

const createPayment = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // rupees → paise
      currency: "INR",
      receipt: "order_rcptid_1",
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPayment };