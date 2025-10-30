import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { styles } from '../styles/GuestInfoForm.styles';
import { LABELS } from '../../../common/constants/label.constants';

const GuestInfoForm = ({ control, errors }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{LABELS.GUEST_INFO}</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{LABELS.FULL_NAME} <Text style={styles.asterisk}>*</Text></Text>
        <Controller
          control={control}
          name="fullName"
          rules={{ required: LABELS.FULL_NAME_REQUIRED }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={LABELS.ENTER_FULL_NAME}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{LABELS.EMAIL} <Text style={styles.asterisk}>*</Text></Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: LABELS.EMAIL_REQUIRED,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: LABELS.VALID_EMAIL,
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={LABELS.ENTER_EMAIL}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{LABELS.PHONE} <Text style={styles.asterisk}>*</Text></Text>
        <Controller
          control={control}
          name="phone"
          rules={{
            required: LABELS.PHONE_REQUIRED,
            pattern: {
              value: /^[0-9]{10}$/,
              message: LABELS.PHONE_10_DIGITS,
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={LABELS.ENTER_PHONE}
              onBlur={onBlur}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9]/g, '');
                onChange(cleanedText.substring(0, 10));
              }}
              value={value}
              keyboardType="phone-pad"
            />
          )}
        />
      </View>
    </View>
  );
};

export default GuestInfoForm;