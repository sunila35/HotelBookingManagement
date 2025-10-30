import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getBookingById, clearBookingDetails } from '../src/features/booking/redux/actions/bookingActions';
import { selectMyBookingDetails, selectIsLoading, selectError } from '../src/features/booking/redux/selectors/bookingSelectors';
import { COLORS } from '../src/common/constants/color.constants';
import { styles } from '../src/features/booking/styles/MyBookingsScreen.styles';

const MyBookingsScreen = () => {
  const dispatch = useDispatch();
  const [bookingId, setBookingId] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  useSelector(selectMyBookingDetails);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useFocusEffect(
    useCallback(() => {
      dispatch(clearBookingDetails());
    }, [dispatch])
  );

  const handleSearch = () => {
    if (!bookingId || !contactInfo) {
      Alert.alert('Validation Error', 'Please fill in both fields.');
      return;
    }
    dispatch(getBookingById({ bookingId, contactInfo }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Booking</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Booking ID (e.g., BKNG-XXXX)"
          value={bookingId}
          onChangeText={setBookingId}
          autoCapitalize="characters"
        />
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          value={contactInfo}
          onChangeText={setContactInfo}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.WHITE} />
          ) : (
            <Text style={styles.buttonText}>Search Booking</Text>
          )}
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

export default MyBookingsScreen;