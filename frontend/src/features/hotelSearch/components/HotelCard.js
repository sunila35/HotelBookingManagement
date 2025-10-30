import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../common/constants/color.constants';
import { styles } from '../styles/HotelCard.styles';

const HotelCard = ({ hotel }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: 'hotel-details',
      params: { hotelId: hotel._id },
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color={COLORS.STAR}
        />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {hotel.hotelImageLink && (
        <Image source={{ uri: hotel.hotelImageLink }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.name}>{hotel.hotelName}</Text>
        <View style={styles.ratingContainer}>{renderStars(hotel.hotelRating)}</View>
        <Text style={styles.location}>{hotel.hotelLocation}</Text>
        {hotel.minPrice && (
          <Text style={styles.price}>Starts from ₹{hotel.minPrice}</Text>
        )}
        <Text style={styles.description} numberOfLines={2}>
          {hotel.hotelDescription}
        </Text>
        <View style={styles.amenitiesContainer}>
          {hotel.hotelAmenities.slice(0, 10).map((amenity, index) => (
            <View key={index} style={styles.amenity}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;