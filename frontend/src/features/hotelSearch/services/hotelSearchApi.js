import axios from 'axios';
import { API } from '../../../common/constants/api.constants';

const apiClient = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchHotels = (params) => {
  return apiClient.get('/search', { params });
};

export const getHotelDetails = (hotelId) => {
  return apiClient.get(`/hotels/${hotelId}`);
};

export const getCities = () => {
  return apiClient.get('/search/cities');
};