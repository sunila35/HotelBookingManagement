import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../common/constants/color.constants';
import { styles } from '../styles/PersonCounter.styles';
import { LABELS } from '../../../common/constants/label.constants';
import { ICONS } from '../../../common/constants/icon.constants';

const PersonCounter = ({ value, onChange }) => {
  const handleIncrement = () => {
    const newValue = Math.min(10, value + 1);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(1, value - 1);
    onChange(newValue);
  };

  const handleTextChange = (text) => {
    const parsedValue = parseInt(text, 10);
    if (isNaN(parsedValue)) {
      onChange(1);
    } else if (parsedValue > 10) {
      onChange(10);
    } else if (parsedValue < 1) {
      onChange(1);
    } else {
      onChange(parsedValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <View style={styles.wrapper} onKeyDown={handleKeyDown}>
      <TouchableOpacity
        style={[styles.button, value <= 1 && styles.disabledButton]}
        onPress={handleDecrement}
        disabled={value <= 1}
        accessibilityLabel={LABELS.DECREASE_PERSONS}
      >
        <Ionicons name={ICONS.REMOVE} size={20} color={value <= 1 ? COLORS.TEXT_SECONDARY : COLORS.PRIMARY} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={String(value)}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        textAlign="center"
      />

      <TouchableOpacity
        style={[styles.button, value >= 10 && styles.disabledButton]}
        onPress={handleIncrement}
        disabled={value >= 10}
        accessibilityLabel={LABELS.INCREASE_PERSONS}
      >
        <Ionicons name={ICONS.ADD} size={20} color={value >= 10 ? COLORS.TEXT_SECONDARY : COLORS.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
};

export default PersonCounter;