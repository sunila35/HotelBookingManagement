const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');

router.post('/', bookingsController.createBooking);

router.get('/guest', bookingsController.getBookingsByGuest);

router.get('/retrieve', bookingsController.retrieveBooking);

router.get('/:bookingId', bookingsController.getBookingById);

router.put('/:bookingId/cancel', bookingsController.cancelBooking);

router.put('/:bookingId', bookingsController.updateBookingDetails);

router.put('/:bookingId/confirm-payment', bookingsController.confirmPayment);

router.put('/:bookingId/fail-payment', bookingsController.failPayment);

module.exports = router;