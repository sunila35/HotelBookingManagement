import {
  SET_BOOKING_SEARCH_DETAILS,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAILURE,
  CONFIRM_PAYMENT_REQUEST,
  CONFIRM_PAYMENT_SUCCESS,
  CONFIRM_PAYMENT_FAILURE,
  GET_BOOKING_BY_ID,
  GET_BOOKING_BY_ID_SUCCESS,
  GET_BOOKING_BY_ID_FAILURE,
  UPDATE_BOOKING_DETAILS_SUCCESS,
  CLEAR_BOOKING_DETAILS,
} from '../../constants/bookingActions.constants';

const initialState = {
  searchDetails: null,
  selectedHotelInfo: null,
  selectedRoomDetails: null,
  bookingDetails: null,
  isLoading: false,
  error: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKING_SEARCH_DETAILS:
      return {
        ...state,
        searchDetails: action.payload,
      };
    case CREATE_BOOKING_REQUEST:
    case CONFIRM_PAYMENT_REQUEST:
    case GET_BOOKING_BY_ID:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_BOOKING_SUCCESS:
    case CONFIRM_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingDetails: action.payload,
      };
    case CREATE_BOOKING_FAILURE:
    case CONFIRM_PAYMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_BOOKING_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingDetails: action.payload,
      };
    case GET_BOOKING_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_BOOKING_DETAILS_SUCCESS:
        return {
          ...state,
          bookingDetails: action.payload,
          isLoading: false,
        };
    case CLEAR_BOOKING_DETAILS:
      return {
        ...state,
        bookingDetails: null,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default bookingReducer;