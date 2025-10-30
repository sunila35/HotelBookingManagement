const crypto = require('crypto');
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const Payment = require('../models/Payment');
const { redisClient } = require('../../config/redis');
const { clearSearchCache } = require('../utils/cache');

const DEFAULT_EXPIRATION = 3600;

const createBooking = async (bookingData) => {
  const { hotelId, bookedRoomId, checkInDate, checkOutDate, numberOfGuests } = bookingData;

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) throw new Error('Hotel not found');

  const room = hotel.rooms.id(bookedRoomId);
  if (!room) throw new Error('Room not found');

  if (numberOfGuests > room.maxOccupancy) {
    throw new Error('Number of guests exceeds room maximum occupancy');
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  if (checkOut <= checkIn) {
    throw new Error('Check-out date must be after check-in date');
  }

  const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
  const totalBookingPrice = nights * room.pricePerNight;

  const bookingId = `BKNG-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;

  const newBooking = new Booking({
    ...bookingData,
    bookingId,
    totalBookingPrice,
    bookingStatus: 'PendingPayment',
  });

  const savedBooking = await newBooking.save();

  await clearSearchCache();

  return savedBooking;
};

const getBookingById = async (bookingId) => {
    const booking = await Booking.findOne({ bookingId: bookingId });
    return booking;
};

const getBookingsByGuestEmail = async (guestEmail) => {
  return await Booking.find({ 'guestDetails.guestEmail': guestEmail });
};

const cancelBooking = async (bookingId) => {
    const booking = await Booking.findOne({ bookingId: bookingId });
    if (!booking) {
        throw new Error('Booking not found');
    }

    if (booking.bookingStatus === 'ConfirmedBooking' || booking.bookingStatus === 'PendingPayment') {
        booking.bookingStatus = 'CancelledBooking';
        const updatedBooking = await booking.save();

        await clearSearchCache();
        await redisClient.del(`booking:${bookingId}`);

        return updatedBooking;
    } else {
        throw new Error(`Booking cannot be cancelled with status: ${booking.bookingStatus}`);
    }
};

const getBookingByIdAndContact = async (bookingId, contactInfo) => {
  let query = { bookingId: bookingId };

  if (contactInfo && contactInfo.trim()) {
    const trimmedContactInfo = contactInfo.trim();
    const contactRegex = new RegExp(`^${trimmedContactInfo}$`, 'i');
    query.$or = [
      { 'guestDetails.guestEmail': contactRegex },
      { 'guestDetails.guestPhoneNumber': contactRegex },
    ];
  }

  const booking = await Booking.findOne(query).populate('hotelId');
  
  if (!booking) {
    return null;
  }
  
  const room = booking.hotelId.rooms.find(
    (r) => r._id.toString() === booking.bookedRoomId.toString()
  );

  if (!room) {
    throw new Error(
      'Could not load complete booking details. The room associated with this booking may no longer be available.'
    );
  }

  const bookingObject = booking.toObject();

  const leanHotel = {
    _id: booking.hotelId._id,
    hotelName: booking.hotelId.hotelName,
    hotelLocation: booking.hotelId.hotelLocation,
    hotelImageLink: booking.hotelId.hotelImageLink,
  };

  const bookingDetails = {
    ...bookingObject,
    hotel: leanHotel,
    room: room.toObject(),
  };

  delete bookingDetails.hotelId;

  return bookingDetails;
};

const updateBookingGuestDetails = async (bookingId, guestDetails) => {
  const booking = await Booking.findOne({ bookingId: bookingId });
  if (!booking) throw new Error('Booking not found');
  booking.guestDetails = { ...booking.guestDetails, ...guestDetails };
  await booking.save();
  return booking;
};

const confirmBookingPayment = async (bookingId, paymentMethod) => {
  const booking = await Booking.findOne({ bookingId: bookingId });
  if (!booking) throw new Error('Booking not found');

  booking.bookingStatus = 'ConfirmedBooking';
  booking.paymentMethod = paymentMethod;
  await booking.save();

  const payment = new Payment({
    booking: booking._id,
    bookingId: booking.bookingId,
    paymentAmount: booking.totalBookingPrice,
    paymentStatus: 'PaymentSuccess',
    paymentDate: new Date(),
    paymentMethod: paymentMethod, 
    paymentTransactionId: `txn-${crypto.randomBytes(8).toString('hex')}`,
  });
  await payment.save();

  return booking;
};

const failBookingPayment = async (bookingId) => {
  const booking = await Booking.findOne({ bookingId: bookingId });
  if (!booking) throw new Error('Booking not found');
  booking.bookingStatus = 'Failed';
  await booking.save();

  const payment = new Payment({
    bookingId: booking._id,
    paymentAmount: booking.totalBookingPrice,
    paymentStatus: 'Failed',
    paymentDate: new Date(),
  });
  await payment.save();

  return booking;
};

module.exports = {
  createBooking,
  getBookingById,
  getBookingsByGuestEmail,
  cancelBooking,
  getBookingByIdAndContact,
  updateBookingGuestDetails,
  confirmBookingPayment,
  failBookingPayment,
};