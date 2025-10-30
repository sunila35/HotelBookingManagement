import { createSelector } from 'reselect';

const selectBooking = (state) => state.booking;

export const selectBookingDetails = createSelector(
  [selectBooking],
  (booking) => ({
    searchDetails: booking.searchDetails,
    hotel: booking.selectedHotelInfo,
    room: booking.selectedRoomDetails,
  })
);

export const selectFullBookingDetails = createSelector(
  [selectBooking],
  (booking) => booking.bookingDetails
);

export const selectMyBookingDetails = (state) => state.booking.bookingDetails;
export const selectIsLoading = (state) => state.booking.isLoading;
export const selectError = (state) => state.booking.error;