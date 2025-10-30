import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { router } from 'expo-router';
import * as actions from '../actions/hotelSearchActions';
import { searchHotels, getHotelDetails, getCities } from '../../services/hotelSearchApi';
import {
  SEARCH_HOTELS_REQUEST,
  GET_HOTEL_DETAILS_REQUEST,
  GET_CITIES_REQUEST
} from '../../constants/hotelSearchActions.constants';

function* handleSearchHotelsRequest(action) {
  try {
    const { page = 1 } = action.payload;
    const hotelsByPage = yield select((state) => state.hotelSearch.hotelsByPage);

    if (hotelsByPage[page]) {
      yield put(actions.setCurrentPage(page));
      return;
    }

    const response = yield call(searchHotels, action.payload);
    yield put(actions.searchHotelsSuccess(response.data));
    if (!action.payload.page || action.payload.page === 1) {
      router.push('/search-results');
    }
  } catch (error) {
    yield put(actions.searchHotelsFailure(error.message));
  }
}

function* handleGetHotelDetailsRequest(action) {
  try {
    const hotel = yield call(getHotelDetails, action.payload);
    yield put(actions.getHotelDetailsSuccess(hotel.data));
  } catch (error) {
    yield put(actions.getHotelDetailsFailure(error.message));
  }
}

function* handleGetCitiesRequest() {
  try {
    const cities = yield call(getCities);
    yield put(actions.getCitiesSuccess(cities.data));
  } catch (error) {
    yield put(actions.getCitiesFailure(error.message));
  }
}

export default function* hotelSearchSaga() {
  yield all([
    takeLatest(SEARCH_HOTELS_REQUEST, handleSearchHotelsRequest),
    takeLatest(GET_HOTEL_DETAILS_REQUEST, handleGetHotelDetailsRequest),
    takeLatest(GET_CITIES_REQUEST, handleGetCitiesRequest),
  ]);
}