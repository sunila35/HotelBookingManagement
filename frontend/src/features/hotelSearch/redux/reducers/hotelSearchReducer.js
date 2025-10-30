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

const initialState = {
  loading: false,
  hotelsByPage: {},
  error: null,
  selectedHotel: null,
  selectedHotelLoading: false,
  selectedHotelError: null,
  cities: [],
  citiesLoading: false,
  citiesError: null,
  totalPages: 0,
  currentPage: 1,
  totalHotels: 0,
  searchCriteria: {},
};

const hotelSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SEARCH_CACHE:
      return {
        ...state,
        hotelsByPage: {},
        totalPages: 0,
        currentPage: 1,
        totalHotels: 0,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        loading: false,
      };
    case SEARCH_HOTELS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        searchCriteria: action.payload,
      };
    case SEARCH_HOTELS_SUCCESS:
      return {
        ...state,
        loading: false,
        hotelsByPage: {
          ...state.hotelsByPage,
          [action.payload.currentPage]: action.payload.hotels,
        },
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        totalHotels: action.payload.totalHotels,
      };
    case SEARCH_HOTELS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_HOTEL_DETAILS_REQUEST:
      return {
        ...state,
        selectedHotelLoading: true,
        selectedHotelError: null,
        selectedHotel: null,
      };
    case GET_HOTEL_DETAILS_SUCCESS:
      return {
        ...state,
        selectedHotelLoading: false,
        selectedHotel: action.payload,
      };
    case GET_HOTEL_DETAILS_FAILURE:
      return {
        ...state,
        selectedHotelLoading: false,
        selectedHotelError: action.payload,
      };
    case GET_CITIES_REQUEST:
      return {
        ...state,
        citiesLoading: true,
        citiesError: null,
      };
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        citiesLoading: false,
        cities: action.payload,
      };
    case GET_CITIES_FAILURE:
      return {
        ...state,
        citiesLoading: false,
        citiesError: action.payload,
      };
    default:
      return state;
  }
};

export default hotelSearchReducer;