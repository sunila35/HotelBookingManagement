const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const { redisClient } = require('../../config/redis');

const SEARCH_EXPIRATION = 1800;

const searchAvailableRooms = async (searchCriteria) => {
  const { location, checkInDate, checkOutDate, numberOfGuests, page = 1, limit = 5 } = searchCriteria;

  const cacheKey = `search:${location}:${checkInDate || "any"}:${
    checkOutDate || "any"
  }:${numberOfGuests}:${page}:${limit}`;
  const cachedResult = await redisClient.get(cacheKey);
  if (cachedResult) {
    return JSON.parse(cachedResult);
  }

  const query = {
    hotelLocation: new RegExp(location, "i"),
  };

  const totalHotels = await Hotel.countDocuments(query);
  const totalPages = Math.ceil(totalHotels / limit);

  const hotels = await Hotel.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  let conflictingBookings = [];
  if (checkInDate && checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    conflictingBookings = await Booking.find({
      bookingStatus: { $in: ["PendingPayment", "ConfirmedBooking"] },
      $and: [
        { checkInDate: { $lt: checkOut } },
        { checkOutDate: { $gt: checkIn } },
      ],
    }).select("bookedRoomId");
  }

  const bookedRoomIds = conflictingBookings.map((b) =>
    b.bookedRoomId.toString()
  );

  const availableHotels = hotels
    .map((hotel) => {
      const availableRooms = hotel.rooms.filter((room) => {
        const isAvailable =
          room.isRoomOperational === true &&
          (!numberOfGuests || parseInt(numberOfGuests, 10) <= room.maxOccupancy) &&
          !bookedRoomIds.includes(room._id.toString());
        return isAvailable;
      });

      if (availableRooms.length > 0) {
        const minPrice = availableRooms.reduce((min, room) => {
          return room.pricePerNight < min ? room.pricePerNight : min;
        }, availableRooms[0].pricePerNight);

        return {
          ...hotel.toObject(),
          rooms: availableRooms,
          minPrice,
        };
      }
      return null;
    })
    .filter((hotel) => hotel !== null);

  const result = {
    hotels: availableHotels,
    currentPage: page,
    totalPages,
    totalHotels,
  };

  redisClient.setEx(cacheKey, SEARCH_EXPIRATION, JSON.stringify(result));

  return result;
};

const getUniqueCities = async () => {
  const cacheKey = "cities:all";
  const cachedCities = await redisClient.get(cacheKey);
  if (cachedCities) {
    return JSON.parse(cachedCities);
  }

  const cities = await Hotel.distinct("hotelLocation");
  redisClient.setEx(cacheKey, 86400, JSON.stringify(cities));
  return cities;
};

module.exports = {
  searchAvailableRooms,
  getUniqueCities,
};