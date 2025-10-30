import { all } from 'redux-saga/effects';

import hotelSearchSaga from '../features/hotelSearch/redux/sagas/hotelSearchSaga';
import bookingSaga from '../features/booking/redux/sagas/bookingSaga';

export default function* rootSaga() {
  yield all([
    hotelSearchSaga(),
    bookingSaga(),
  ]);
}