const paymentService = require('../services/payment.service');

const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.processPayment(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getPaymentForBooking = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentForBooking(req.params.bookingId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found for this booking' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const simulatePayment = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const result = await paymentService.simulatePayment({ bookingId, status });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  getPaymentForBooking,
  simulatePayment,
};