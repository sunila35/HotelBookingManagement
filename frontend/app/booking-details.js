import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createBooking } from '../src/features/booking/redux/actions/bookingActions';
import GuestInfoForm from '../src/features/booking/components/GuestInfoForm';
import BookingSummary from '../src/features/booking/components/BookingSummary';
import Banner from '../src/common/ui/components/Banner';
import { selectBookingDetails } from '../src/features/booking/redux/selectors/bookingSelectors';
import { COLORS } from '../src/common/constants/color.constants';
import { styles } from '../src/features/booking/styles/BookingDetailsScreen.styles';
import { LABELS } from '../src/common/constants/label.constants';

const BookingDetailsScreen = () => {
  const dispatch = useDispatch();
  const { hotel, room } = useLocalSearchParams();
  const [bannerMessage, setBannerMessage] = useState('');
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  
  const selectedHotel = JSON.parse(hotel);
  const selectedRoom = JSON.parse(room);

  const { searchDetails, loading } = useSelector(selectBookingDetails);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
    },
  });

  const handleProceedToPayment = (data) => {
    const bookingData = {
      hotelId: selectedHotel._id,
      bookedRoomId: selectedRoom._id,
      checkInDate: searchDetails.checkInDate,
      checkOutDate: searchDetails.checkOutDate,
      numberOfGuests: searchDetails.numberOfGuests,
      guestDetails: {
        guestFullName: data.fullName,
        guestEmail: data.email,
        guestPhoneNumber: data.phone,
      },
      totalBookingPrice: totalPrice,
    };

    dispatch(createBooking(bookingData));
  };

  const nights = Math.ceil((new Date(searchDetails.checkOutDate) - new Date(searchDetails.checkInDate)) / (1000 * 60 * 60 * 24));
  const totalPrice = nights * selectedRoom.pricePerNight;

  const onFormError = (errors) => {
    const errorMessages = Object.values(errors).map(error => error.message);
    setBannerMessage(errorMessages.join('\n'));
    setIsBannerVisible(true);
  };

  if (!searchDetails) {
    return (
      <View style={styles.container}>
        <Text>{LABELS.SEARCH_DETAILS_NOT_FOUND}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {isBannerVisible && (
        <Banner
          message={bannerMessage}
          type="warning"
          onDismiss={() => setIsBannerVisible(false)}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{LABELS.CONFIRM_YOUR_BOOKING}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.formContainer}>
            <GuestInfoForm
              control={control}
              errors={errors}
            />
          </View>
          <View style={styles.summaryContainer}>
            <BookingSummary hotel={selectedHotel} room={selectedRoom} searchDetails={searchDetails} numberOfNights={nights} totalPrice={totalPrice} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.paymentButton} onPress={handleSubmit(handleProceedToPayment, onFormError)} disabled={loading}>
                {loading ? (
                <ActivityIndicator color={COLORS.WHITE} />
                ) : (
                <Text style={styles.paymentButtonText}>{LABELS.PROCEED_TO_PAYMENT}</Text>
                )}
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookingDetailsScreen;