import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import PaymentMethod from '../src/features/booking/components/PaymentMethod';
import { confirmPayment } from '../src/features/booking/redux/actions/bookingActions';
import { selectBookingDetails } from '../src/features/booking/redux/selectors/bookingSelectors';
import { styles } from '../src/features/booking/styles/PaymentScreen.styles';
import { COLORS } from '../src/common/constants/color.constants';
import { LABELS } from '../src/common/constants/label.constants';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const { bookingId, totalBookingPrice } = useLocalSearchParams();
  const { loading, error } = useSelector(selectBookingDetails);

  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      Alert.alert('Payment Method', 'Please select a payment method.');
      return;
    }
    dispatch(confirmPayment({ bookingId, paymentMethod }));
  };
  
  if (error) {
    Alert.alert(LABELS.PAYMENT_FAILED, error);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <Text style={styles.title}>Complete Your Payment</Text>
          
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>You are paying:</Text>
          <Text style={styles.totalPrice}>Rs. {totalBookingPrice}</Text>
        </View>

        <PaymentMethod selectedMethod={paymentMethod} onSelectMethod={setPaymentMethod} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.paymentButton} onPress={handleConfirmPayment} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={COLORS.WHITE} />
            ) : (
              <Text style={styles.paymentButtonText}>Confirm and Pay</Text>
            )}
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;