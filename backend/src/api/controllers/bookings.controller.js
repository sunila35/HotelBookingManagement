const bookingService = require('../services/booking.service');

const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getBookingsByGuest = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Guest email is required' });
    }
    const bookings = await bookingService.getBookingsByGuestEmail(email);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.bookingId);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const retrieveBooking = async (req, res) => {
  try {
    const { bookingId, contactInfo } = req.query;
    if (!bookingId) {
      return res.status(400).json({ message: 'Booking ID is required.' });
    }
    const booking = await bookingService.getBookingByIdAndContact(bookingId, contactInfo);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or contact information mismatch.' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { guestDetails } = req.body;
    const updatedBooking = await bookingService.updateBookingGuestDetails(bookingId, guestDetails);
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const booking = await bookingService.confirmBookingPayment(req.params.bookingId, paymentMethod);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const failPayment = async (req, res) => {
  try {
    const booking = await bookingService.failBookingPayment(req.params.bookingId);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getBookingsByGuest,
  cancelBooking,
  retrieveBooking,
  updateBookingDetails,
  confirmPayment,
  failPayment,
};