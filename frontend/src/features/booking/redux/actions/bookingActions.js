import {
  SET_BOOKING_SEARCH_DETAILS,
  CREATE_BOOKING_REQUEST,
  CONFIRM_PAYMENT_REQUEST,
  GET_BOOKING_BY_ID,
  UPDATE_BOOKING_DETAILS,
  CLEAR_BOOKING_DETAILS,
} from '../../constants/bookingActions.constants';

export const setBookingSearchDetails = (details) => ({
  type: SET_BOOKING_SEARCH_DETAILS,
  payload: details,
});

export const createBooking = (bookingData) => ({
  type: CREATE_BOOKING_REQUEST,
  payload: bookingData,
});

export const confirmPayment = (paymentData) => ({
  type: CONFIRM_PAYMENT_REQUEST,
  payload: paymentData,
});

export const clearBookingDetails = () => ({
  type: CLEAR_BOOKING_DETAILS,
});

export const getBookingById = (data) => ({
  type: GET_BOOKING_BY_ID,
  payload: data,
});

export const updateBookingDetails = (data) => ({
  type: UPDATE_BOOKING_DETAILS,
  payload: data,
});