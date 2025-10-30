import { combineReducers } from 'redux';

import hotelSearchReducer from '../features/hotelSearch/redux/reducers/hotelSearchReducer';
import bookingReducer from '../features/booking/redux/reducers/bookingReducer';

const rootReducer = combineReducers({
  hotelSearch: hotelSearchReducer,
  booking: bookingReducer,
});

export default rootReducer;