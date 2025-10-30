import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/BookingConfirmationCard.styles';
import { API } from '../../../common/constants/api.constants';
import { COLORS } from '../../../common/constants/color.constants';
import { ICONS } from '../../../common/constants/icon.constants';

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const BookingConfirmationCard = ({ bookingDetails }) => {
  const [copied, setCopied] = useState(false);

  if (!bookingDetails) {
    return null;
  }

  const {
    bookingId,
    guestDetails,
    hotel,
    room,
    checkInDate,
    checkOutDate,
    totalBookingPrice,
  } = bookingDetails;
  
  const hotelImageUrl = hotel?.hotelImageLink || API.PLACEHOLDER_IMAGE_URL;

  const handleCopy = () => {
    Clipboard.setString(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: hotelImageUrl }} style={styles.imageHeader} resizeMode="cover">
        <View style={styles.overlay} />
      </ImageBackground>
      
      <View style={styles.successIcon}>
        <Ionicons name={ICONS.CHECKMARK_SHARP} size={48} color={COLORS.WHITE} />
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your booking is complete. Thank you for choosing us.</Text>

        <View style={styles.bookingIdContainer}>
          <Text style={styles.bookingIdLabel}>Booking ID:</Text>
          <Text style={styles.bookingId}>{bookingId}</Text>
          <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
            <Ionicons name={copied ? ICONS.CHECKMARK_OUTLINE : ICONS.COPY_OUTLINE} size={20} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name={ICONS.PERSON_OUTLINE} size={20} color={styles.sectionTitle.color} />
            <Text style={styles.sectionTitle}>Guest Details</Text>
          </View>
          <DetailRow label="Full Name" value={guestDetails.guestFullName} />
          <DetailRow label="Email" value={guestDetails.guestEmail} />
          <DetailRow label="Phone Number" value={guestDetails.guestPhoneNumber} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name={ICONS.BUSINESS_OUTLINE} size={20} color={styles.sectionTitle.color} />
            <Text style={styles.sectionTitle}>Booking Details</Text>
          </View>
          <DetailRow label="Hotel" value={hotel.hotelName} />
          <DetailRow label="Room" value={room.roomType} />
          <DetailRow label="Check-in" value={new Date(checkInDate).toLocaleDateString()} />
          <DetailRow label="Check-out" value={new Date(checkOutDate).toLocaleDateString()} />
        </View>
        
        <View style={[styles.detailRow, styles.totalPriceRow]}>
          <Text style={styles.totalPriceLabel}>Total Paid</Text>
          <Text style={styles.totalPriceValue}>Rs. {totalBookingPrice}</Text>
        </View>
      </View>
    </View>
  );
};

export default BookingConfirmationCard;