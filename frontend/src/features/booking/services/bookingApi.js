import axios from 'axios';
import { API } from '../../../common/constants/api.constants';

const apiClient = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createBooking = (bookingData) => {
  return apiClient.post('/bookings', bookingData);
};

export const processPayment = (paymentData) => {
  return apiClient.post('/payments', paymentData);
};

export const retrieveBookingApi = (data) => {
  return apiClient.get('/bookings/retrieve', { params: data });
};

export const updateBookingDetailsApi = (data) => {
  return apiClient.put(`/bookings/${data.bookingId}`, { guestDetails: data.guestDetails });
};

export const getBookingByIdApi = (bookingId) => {
  return apiClient.get(`/bookings/${bookingId}`);
};

export const confirmPaymentApi = (bookingId, paymentMethod) => {
  return apiClient.put(`/bookings/${bookingId}/confirm-payment`, { paymentMethod });
};

export const failPaymentApi = (bookingId) => {
  return apiClient.put(`/bookings/${bookingId}/fail-payment`);
};