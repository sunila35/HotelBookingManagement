const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
  },
  guestDetails: {
    guestFullName: { type: String, required: true },
    guestEmail: { type: String, required: true },
    guestPhoneNumber: { type: String, required: true },
  },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  bookedRoomId: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalBookingPrice: { type: Number, required: true },
  bookingStatus: {
    type: String,
    enum: ["PendingPayment", "ConfirmedBooking", "CancelledBooking", "CompletedStay"],
    default: "PendingPayment",
  },
  paymentMethod: {
    type: String,
    required: false, 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);