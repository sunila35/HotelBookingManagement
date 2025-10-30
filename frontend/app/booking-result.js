import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import BookingDetailsCard from '../src/features/booking/components/BookingDetailsCard';
import { selectMyBookingDetails } from '../src/features/booking/redux/selectors/bookingSelectors';
import { styles } from '../src/features/booking/styles/BookingResultScreen.styles';

const BookingResultScreen = () => {
  const bookingDetails = useSelector(selectMyBookingDetails);

  if (!bookingDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No booking details found. Please try your search again.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <BookingDetailsCard booking={bookingDetails} />
      </View>
    </ScrollView>
  );
};

export default BookingResultScreen;