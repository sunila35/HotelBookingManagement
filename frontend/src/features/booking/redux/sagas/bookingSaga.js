import { call, put, takeLatest, all } from 'redux-saga/effects';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { createBooking, retrieveBookingApi, updateBookingDetailsApi, confirmPaymentApi } from '../../services/bookingApi';
import { LABELS } from '../../../../common/constants/label.constants';
import {
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAILURE,
  CONFIRM_PAYMENT_REQUEST,
  CONFIRM_PAYMENT_SUCCESS,
  CONFIRM_PAYMENT_FAILURE,
  GET_BOOKING_BY_ID,
  GET_BOOKING_BY_ID_SUCCESS,
  GET_BOOKING_BY_ID_FAILURE,
  UPDATE_BOOKING_DETAILS,
  UPDATE_BOOKING_DETAILS_SUCCESS,
  UPDATE_BOOKING_DETAILS_FAILURE,
} from '../../constants/bookingActions.constants';

function* handleCreateBooking(action) {
  try {
    const bookingResponse = yield call(createBooking, action.payload);
    const newBooking = bookingResponse.data;
    yield put({ type: CREATE_BOOKING_SUCCESS, payload: newBooking });
    router.push({
      pathname: '/payment',
      params: { bookingId: newBooking.bookingId, totalBookingPrice: newBooking.totalBookingPrice },
    });
  } catch (error) {
    yield put({ type: CREATE_BOOKING_FAILURE, payload: error.message });
    Alert.alert(LABELS.BOOKING_FAILED, error.response?.data?.message || LABELS.UNEXPECTED_ERROR);
  }
}

function* handleConfirmPayment(action) {
  try {
    const { bookingId, paymentMethod } = action.payload;
    yield call(confirmPaymentApi, bookingId, paymentMethod);
    const booking = yield call(retrieveBookingApi, { bookingId });
    yield put({ type: CONFIRM_PAYMENT_SUCCESS, payload: booking.data });
    router.push('/booking-confirmation');
  } catch (error) {
    yield put({ type: CONFIRM_PAYMENT_FAILURE, payload: error.message });
    Alert.alert(LABELS.PAYMENT_FAILED, error.response?.data?.message || LABELS.UNEXPECTED_ERROR);
  }
}

function* handleRetrieveBookingById(action) {
  try {
    const booking = yield call(retrieveBookingApi, action.payload);
    yield put({ type: GET_BOOKING_BY_ID_SUCCESS, payload: booking.data });
    router.push('/booking-result');
  } catch (error) {
    yield put({ type: GET_BOOKING_BY_ID_FAILURE, payload: error.response?.data?.message || 'Failed to retrieve booking.' });
  }
}

function* handleUpdateBookingDetails(action) {
  try {
    const updatedBooking = yield call(updateBookingDetailsApi, action.payload);
    yield put({ type: UPDATE_BOOKING_DETAILS_SUCCESS, payload: updatedBooking.data });
    Alert.alert(LABELS.BOOKING_UPDATE_SUCCESS, LABELS.BOOKING_UPDATE_SUCCESS_MESSAGE);
  } catch (error) {
    yield put({ type: UPDATE_BOOKING_DETAILS_FAILURE, payload: error.message });
  }
}

export default function* bookingSaga() {
  yield all([
    takeLatest(CREATE_BOOKING_REQUEST, handleCreateBooking),
    takeLatest(CONFIRM_PAYMENT_REQUEST, handleConfirmPayment),
    takeLatest(GET_BOOKING_BY_ID, handleRetrieveBookingById),
    takeLatest(UPDATE_BOOKING_DETAILS, handleUpdateBookingDetails),
  ]);
}