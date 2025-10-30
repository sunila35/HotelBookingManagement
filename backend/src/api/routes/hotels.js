const express = require('express');
const router = express.Router();
const hotelsController = require('../controllers/hotels.controller');

router.get('/', hotelsController.getAllHotels);

router.get('/:hotelId', hotelsController.getHotelById);

router.get('/:hotelId/rooms', hotelsController.getHotelRooms);

router.get('/:hotelId/rooms/:roomId', hotelsController.getRoomById);

module.exports = router;