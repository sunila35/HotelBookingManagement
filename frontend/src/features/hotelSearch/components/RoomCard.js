import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../common/constants/color.constants';
import { API, PLACEHOLDER_IMAGE_URL } from '../../../common/constants/api.constants';
import { ICONS } from '../../../common/constants/icon.constants';
import { styles } from '../styles/RoomCard.styles';

const RoomCard = ({ room, hotel }) => {
  const router = useRouter();

  const imageUrl = room.roomImages && room.roomImages.length > 0
    ? `${API.BASE_URL.replace('/api', '')}${room.roomImages[0]}`
    : PLACEHOLDER_IMAGE_URL;

  const handleBookNow = () => {
    router.push({
      pathname: '/booking-details',
      params: {
        hotel: JSON.stringify(hotel),
        room: JSON.stringify(room)
      },
    });
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.roomType}>{room.roomType}</Text>
        <View style={styles.occupancyContainer}>
          <Ionicons name={ICONS.PERSON_OUTLINE} size={16} color={COLORS.TEXT_SECONDARY} />
          <Text style={styles.details}> Max Occupancy: {room.maxOccupancy}</Text>
        </View>
        <Text style={styles.price}>Rs.{room.pricePerNight} / night</Text>
      </View>
      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoomCard;