const hotelService = require('../services/hotel.service');

const getAllHotels = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const hotels = await hotelService.getAllHotels(page, limit);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getHotelById = async (req, res) => {
  try {
    const hotel = await hotelService.getHotelById(req.params.hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getHotelRooms = async (req, res) => {
  try {
    const rooms = await hotelService.getHotelRooms(req.params.hotelId);
    if (rooms === null) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await hotelService.getRoomById(req.params.hotelId, req.params.roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllHotels,
  getHotelById,
  getHotelRooms,
  getRoomById,
};