import React, { useEffect } from 'react';
import { View, Text, ScrollView, useWindowDimensions, ActivityIndicator, FlatList, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getHotelDetailsRequest } from '../redux/actions/hotelSearchActions';
import {
  selectSelectedHotel,
  selectSelectedHotelIsLoading,
  selectSelectedHotelError,
} from '../redux/selectors/hotelSearchSelectors';
import RoomCard from '../components/RoomCard';
import { COLORS } from '../../../common/constants/color.constants';
import { styles } from '../styles/HotelDetailsScreen.styles';

const HotelDetailsScreen = () => {
  const { hotelId } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const hotel = useSelector(selectSelectedHotel);
  const loading = useSelector(selectSelectedHotelIsLoading);
  const error = useSelector(selectSelectedHotelError);

  useEffect(() => {
    if (hotelId) {
      dispatch(getHotelDetailsRequest(hotelId));
    }
  }, [dispatch, hotelId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={24}
          color={COLORS.STAR}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.PRIMARY} style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!hotel) {
    return (
      <View style={styles.centered}>
        <Text>Hotel not found.</Text>
      </View>
    );
  }

  const availableRooms = hotel.rooms.filter(room => room.isRoomOperational);

  const cardWidth = width > 768 ? '80%' : '100%';

  return (
    <ScrollView style={styles.outerContainer}>
      {hotel.hotelImageLink && (
        <ImageBackground source={{ uri: hotel.hotelImageLink }} style={styles.bannerImage}>
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            <Text style={styles.name}>{hotel.hotelName}</Text>
            <View style={styles.ratingContainer}>{renderStars(hotel.hotelRating)}</View>
          </LinearGradient>
        </ImageBackground>
      )}
      <View style={styles.detailsContainer}>
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.location}>{hotel.hotelLocation}</Text>
          <Text style={styles.description}>{hotel.hotelDescription}</Text>
          
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {hotel.hotelAmenities.map((amenity, index) => (
              <View key={index} style={styles.amenity}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.PRIMARY} />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Available Rooms</Text>
          <FlatList
            data={availableRooms}
            renderItem={({ item }) => <RoomCard room={item} hotel={hotel} />}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={<Text>No available rooms found.</Text>}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HotelDetailsScreen;