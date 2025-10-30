const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  maxOccupancy: { type: Number, required: true },
  isRoomOperational: { type: Boolean, default: true },
  roomImages: { type: [String], default: [] },
});

const HotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  hotelLocation: { type: String, required: true },
  hotelDescription: { type: String, required: true },
  hotelRating: { type: Number, min: 1, max: 5 },
  hotelAmenities: { type: [String], default: [] },
  hotelImageLink: { type: String, required: false },
  rooms: [RoomSchema],
});

module.exports = mongoose.model('Hotel', HotelSchema);