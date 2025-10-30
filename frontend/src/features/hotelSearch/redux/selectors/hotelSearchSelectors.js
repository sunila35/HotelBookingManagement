import { createSelector } from 'reselect';

const selectHotelSearch = (state) => state.hotelSearch;

export const selectHotels = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.hotelsByPage[hotelSearch.currentPage] || []
);

export const selectIsLoading = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.loading
);

export const selectError = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.error
);

export const selectSelectedHotel = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.selectedHotel
);

export const selectSelectedHotelIsLoading = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.selectedHotelLoading
);

export const selectSelectedHotelError = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.selectedHotelError
);

export const selectCities = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.cities
);

export const selectCitiesIsLoading = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.citiesLoading
);

export const selectCitiesError = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.citiesError
);

export const selectTotalPages = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.totalPages
);

export const selectCurrentPage = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.currentPage
);

export const selectTotalHotels = createSelector(
  [selectHotelSearch],
  (hotelSearch) => hotelSearch.totalHotels
);