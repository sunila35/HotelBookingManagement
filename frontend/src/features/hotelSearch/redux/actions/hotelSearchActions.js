import {
  SEARCH_HOTELS_REQUEST,
  SEARCH_HOTELS_SUCCESS,
  SEARCH_HOTELS_FAILURE,
  GET_HOTEL_DETAILS_REQUEST,
  GET_HOTEL_DETAILS_SUCCESS,
  GET_HOTEL_DETAILS_FAILURE,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  CLEAR_SEARCH_CACHE,
  SET_CURRENT_PAGE,
} from '../../constants/hotelSearchActions.constants';

export const clearSearchCache = () => ({
  type: CLEAR_SEARCH_CACHE,
});

export const setCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  payload,
});

export const searchHotelsRequest = (payload) => ({
  type: SEARCH_HOTELS_REQUEST,
  payload,
});

export const searchHotelsSuccess = (payload) => ({
  type: SEARCH_HOTELS_SUCCESS,
  payload,
});

export const searchHotelsFailure = (payload) => ({
  type: SEARCH_HOTELS_FAILURE,
  payload,
});

export const getHotelDetailsRequest = (payload) => ({
  type: GET_HOTEL_DETAILS_REQUEST,
  payload,
});

export const getHotelDetailsSuccess = (payload) => ({
  type: GET_HOTEL_DETAILS_SUCCESS,
  payload,
});

export const getHotelDetailsFailure = (payload) => ({
  type: GET_HOTEL_DETAILS_FAILURE,
  payload,
});

export const getCitiesRequest = () => ({
  type: GET_CITIES_REQUEST,
});

export const getCitiesSuccess = (payload) => ({
  type: GET_CITIES_SUCCESS,
  payload,
});

export const getCitiesFailure = (payload) => ({
  type: GET_CITIES_FAILURE,
  payload,
});