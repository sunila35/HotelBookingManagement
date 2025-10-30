import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/BookingDetailsCard.styles';
import { API } from '../../../common/constants/api.constants';
import { LABELS } from '../../../common/constants/label.constants';
import { COLORS } from '../../../common/constants/color.constants';

const InfoCard = ({ title, icon, children }) => (
  <View style={styles.infoCard}>
    <View style={styles.infoCardHeader}>
      <Ionicons name={icon} size={22} color={COLORS.PRIMARY} />
      <Text style={styles.infoCardTitle}>{title}</Text>
    </View>
    <View style={styles.infoCardContent}>
      {children}
    </View>
  </View>
);

const DetailRow = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <Ionicons name={icon} size={16} color={COLORS.TEXT_SECONDARY} style={styles.detailIcon} />
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const BookingDetailsCard = ({ booking }) => {
  if (!booking) return null;

  const { hotel, room } = booking;
  console.log(booking)

  if (!room) {
    console.error("Booking Details Card Error: Room details are missing for this booking.");
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>{LABELS.BOOKING_DETAILS_ERROR}</Text>
      </View>
    );
  }

  const hotelImageUrl = hotel?.hotelImageLink || API.PLACEHOLDER_IMAGE_URL;
  const roomImageUrl = room?.roomImages?.[0] ? `${API.BASE_URL.replace('/api', '')}${room.roomImages[0]}` : API.PLACEHOLDER_IMAGE_URL;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{LABELS.BOOKING_DETAILS}</Text>
      </View>

      <InfoCard title={LABELS.RESERVATION_DETAILS} icon="business-outline">
        <View style={styles.hotelContainer}>
          <Image source={{ uri: hotelImageUrl }} style={styles.hotelImage} />
          <View style={styles.hotelOverlay}>
            <Text style={styles.hotelName}>{hotel.hotelName}</Text>
            <Text style={styles.hotelLocation}>{hotel.hotelLocation}</Text>
          </View>
        </View>
        <View style={styles.roomContainer}>
          <Image source={{ uri: roomImageUrl }} style={styles.roomImage} />
          <View style={styles.roomContent}>
            <Text style={styles.roomType}>{room.roomType}</Text>
            <Text style={styles.roomInfo}>Room {room.roomNumber}</Text>
          </View>
        </View>
      </InfoCard>

      <InfoCard title={LABELS.STAY_INFO} icon="calendar-outline">
        <DetailRow icon="log-in-outline" label={LABELS.CHECK_IN} value={new Date(booking.checkInDate).toLocaleDateString()} />
        <DetailRow icon="log-out-outline" label={LABELS.CHECK_OUT} value={new Date(booking.checkOutDate).toLocaleDateString()} />
        <DetailRow icon="people-outline" label={LABELS.GUESTS} value={booking.numberOfGuests} />
      </InfoCard>

      <InfoCard title={LABELS.GUEST_INFO} icon="person-circle-outline">
        <DetailRow icon="person-outline" label={LABELS.FULL_NAME} value={booking.guestDetails.guestFullName} />
        <DetailRow icon="mail-outline" label={LABELS.EMAIL} value={booking.guestDetails.guestEmail} />
        <DetailRow icon="call-outline" label={LABELS.PHONE} value={booking.guestDetails.guestPhoneNumber} />
      </InfoCard>
    </View>
  );
};

export default BookingDetailsCard;