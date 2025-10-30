import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectHotels,
  selectIsLoading,
  selectTotalPages,
  selectCurrentPage,
  selectTotalHotels,
} from '../redux/selectors/hotelSearchSelectors';
import { searchHotelsRequest } from '../redux/actions/hotelSearchActions';
import HotelCard from '../components/HotelCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../../../common/ui/components/Pagination';
import { COLORS } from '../../../common/constants/color.constants';
import { styles } from '../styles/SearchResultsScreen.styles';

const SearchResultsScreen = () => {
  const dispatch = useDispatch();
  const hotels = useSelector(selectHotels);
  const loading = useSelector(selectIsLoading);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const totalHotels = useSelector(selectTotalHotels);

  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [filters, setFilters] = useState({
    sortBy: null,
    amenities: [],
    price: { max: 15000 },
  });

  const searchCriteria = useSelector((state) => state.hotelSearch.searchCriteria);

  useEffect(() => {
    let processedHotels = [...hotels];

    if (filters.amenities.length > 0) {
      processedHotels = processedHotels.filter((hotel) =>
        filters.amenities.every((amenity) =>
          hotel.hotelAmenities.includes(amenity)
        )
      );
    }

    const maxPrice = parseFloat(filters.price.max);
    if (!isNaN(maxPrice)) {
      processedHotels = processedHotels.filter(
        (hotel) => hotel.minPrice <= maxPrice
      );
    }

    if (filters.sortBy === 'rating_desc') {
      processedHotels.sort((a, b) => b.hotelRating - a.hotelRating);
    } else if (filters.sortBy === 'price_asc') {
      processedHotels.sort((a, b) => a.minPrice - b.minPrice);
    } else if (filters.sortBy === 'price_desc') {
      processedHotels.sort((a, b) => b.minPrice - a.minPrice);
    }

    setFilteredHotels(processedHotels);
  }, [hotels, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    dispatch(searchHotelsRequest({ ...searchCriteria, page }));
  };

  if (loading && currentPage === 1) {
    return <ActivityIndicator size="large" color={COLORS.PRIMARY} style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>{totalHotels} Hotels Found</Text>
      </View>
      <FilterPanel
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />
      {loading && <ActivityIndicator size="small" color={COLORS.PRIMARY} />}
      {filteredHotels.length === 0 && !loading ? (
        <Text style={styles.noResultsText}>No hotels match your criteria.</Text>
      ) : (
        <FlatList
          data={filteredHotels}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <HotelCard hotel={item} />}
          contentContainerStyle={styles.list}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </View>
  );
};

export default SearchResultsScreen;