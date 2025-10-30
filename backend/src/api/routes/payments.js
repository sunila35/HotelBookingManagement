const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');

router.post('/', paymentsController.createPayment);

router.get('/:paymentId', paymentsController.getPaymentById);

router.get('/booking/:bookingId', paymentsController.getPaymentForBooking);

router.put('/simulate', paymentsController.simulatePayment);

module.exports = router;