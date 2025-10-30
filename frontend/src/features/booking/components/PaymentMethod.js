import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/PaymentMethod.styles';
import { LABELS } from '../../../common/constants/label.constants';
import { COLORS } from '../../../common/constants/color.constants';
import { ICONS } from '../../../common/constants/icon.constants';

const paymentOptions = [
  { id: 'credit-card', name: LABELS.CREDIT_CARD, icon: ICONS.CARD },
  { id: 'paypal', name: LABELS.PAYPAL, icon: ICONS.LOGO_PAYPAL },
  { id: 'google-pay', name: LABELS.GOOGLE_PAY, icon: ICONS.LOGO_GOOGLE },
];

const PaymentMethod = ({ selectedMethod, onSelectMethod }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{LABELS.PAYMENT_METHOD}</Text>
    <View style={styles.optionsContainer}>
      {paymentOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.option, selectedMethod === option.id && styles.selectedOption]}
          onPress={() => onSelectMethod(option.id)}
        >
          <Ionicons name={option.icon} size={24} color={selectedMethod === option.id ? COLORS.WHITE : COLORS.PRIMARY} />
          <Text style={[styles.optionText, selectedMethod === option.id && styles.selectedOptionText]}>
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default PaymentMethod;