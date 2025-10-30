const Hotel = require('../models/Hotel');
const { redisClient } = require('../../config/redis');

const DEFAULT_EXPIRATION = 3600;

const getAllHotels = async (page = 1, limit = 5) => {
  const cacheKey = `hotels:all:${page}:${limit}`;
  const cachedHotels = await redisClient.get(cacheKey);

  if (cachedHotels) {
    return JSON.parse(cachedHotels);
  }

  const totalHotels = await Hotel.countDocuments();
  const totalPages = Math.ceil(totalHotels / limit);
  const hotels = await Hotel.find({}, { rooms: 0 })
    .skip((page - 1) * limit)
    .limit(limit);

  const result = {
    hotels,
    currentPage: page,
    totalPages,
    totalHotels,
  };

  redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(result));
  return result;
};

const getHotelById = async (hotelId) => {
  const cacheKey = `hotel:${hotelId}`;
  const cachedHotel = await redisClient.get(cacheKey);
  if (cachedHotel) {
    return JSON.parse(cachedHotel);
  }

  const hotel = await Hotel.findById(hotelId).lean();
  if (hotel) {
    redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(hotel));
  }
  return hotel;
};

const getHotelRooms = async (hotelId) => {
  const cacheKey = `hotel:${hotelId}:rooms`;
  const cachedRooms = await redisClient.get(cacheKey);
  if (cachedRooms) {
    return JSON.parse(cachedRooms);
  }

  const hotel = await Hotel.findById(hotelId, { rooms: 1 });
  const rooms = hotel ? hotel.rooms : null;
  if (rooms) {
    redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(rooms));
  }
  return rooms;
};

const getRoomById = async (hotelId, roomId) => {
  const hotel = await Hotel.findById(hotelId, {
    rooms: { $elemMatch: { _id: roomId } },
  });
  return hotel && hotel.rooms.length > 0 ? hotel.rooms[0] : null;
};

module.exports = {
  getAllHotels,
  getHotelById,
  getHotelRooms,
  getRoomById,
};