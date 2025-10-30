const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  bookingId: { 
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["credit-card", "paypal", "google-pay", "debit-card", "upi", "wallet"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["PaymentPending", "PaymentSuccess", "PaymentFailed"],
    default: "PaymentPending",
  },
  paymentTransactionId: {
    type: String,
    required: true,
  },
  paymentCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);