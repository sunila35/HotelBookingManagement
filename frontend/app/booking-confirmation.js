import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectFullBookingDetails, selectIsLoading, selectError } from '../src/features/booking/redux/selectors/bookingSelectors';
import BookingConfirmationCard from '../src/features/booking/components/BookingConfirmationCard';
import { COLORS } from '../src/common/constants/color.constants';
import { styles } from '../src/features/booking/styles/BookingConfirmationScreen.styles';

const BookingConfirmationScreen = () => {
  const bookingDetails = useSelector(selectFullBookingDetails);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.PRIMARY} style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!bookingDetails) {
    return null;
  }

  const isSuccess = bookingDetails.bookingStatus === 'ConfirmedBooking';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {isSuccess ? (
        <BookingConfirmationCard bookingDetails={bookingDetails} />
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Booking Failed</Text>
          <Text style={styles.subtitle}>Unfortunately, your booking could not be completed.</Text>
        </View>
      )}

      <View style={styles.homeButtonContainer}>
        <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
          <Text style={styles.homeButtonText}>Go to Homepage</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookingConfirmationScreen;