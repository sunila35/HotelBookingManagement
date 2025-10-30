const mongoose = require('mongoose');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');


const processPayment = async (paymentData) => {
  const { bookingId } = paymentData;

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  const existingPayment = await Payment.findOne({ bookingId });
  if (existingPayment) {
    throw new Error('Payment has already been processed for this booking');
  }
  
  const newPayment = new Payment({
    ...paymentData,
    paymentStatus: 'PaymentSuccess',
  });
  
  const payment = await newPayment.save();

  if (payment.paymentStatus === 'PaymentSuccess') {
    booking.bookingStatus = 'ConfirmedBooking';
    await booking.save();
    
  }

  return payment;
};

const getPaymentById = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  return payment;
};

const getPaymentForBooking = async (bookingId) => {
  const payment = await Payment.findOne({ bookingId });
  return payment;
};

const simulatePayment = async ({ bookingId, status }) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const booking = await Booking.findById(bookingId).session(session);
    if (!booking) {
      throw new Error('Booking not found');
    }

    const payment = await Payment.findOne({ bookingId }).session(session);
    if (!payment) {
      throw new Error('Payment not found for this booking');
    }

    if (status === 'success') {
      booking.bookingStatus = 'success';
      payment.paymentStatus = 'success';
    } else if (status === 'failure') {
      booking.bookingStatus = 'failed';
      payment.paymentStatus = 'failed';
    } else {
      throw new Error('Invalid simulation status');
    }

    await booking.save({ session });
    await payment.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { booking, payment };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = {
  processPayment,
  getPaymentById,
  getPaymentForBooking,
  simulatePayment,
};