import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bannerStyles } from '../styles/Banner.styles';
import { LABELS } from '../../../common/constants/label.constants';
import { ICONS } from '../../../common/constants/icon.constants';

const Banner = ({ message, type = 'warning', onDismiss }) => {
  const [slideAnim] = useState(new Animated.Value(-100));

  const dismissBanner = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) {
        onDismiss();
      }
    });
  }, [onDismiss, slideAnim]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      dismissBanner();
    }, 5000);

    return () => clearTimeout(timer);
  }, [dismissBanner, slideAnim]);

  const isError = type === 'error';
  const bannerStyle = [
    bannerStyles.banner,
    isError ? bannerStyles.error : bannerStyles.warning,
    { transform: [{ translateY: slideAnim }] },
  ];

  const iconName = isError ? ICONS.CLOSE_CIRCLE_OUTLINE : ICONS.WARNING_OUTLINE;
  const title = isError ? LABELS.ERROR : LABELS.WARNING;
  const displayMessage = message || (isError ? LABELS.UNEXPECTED_ERROR : LABELS.SOMETHING_WENT_WRONG);

  return (
    <Animated.View style={bannerStyle}>
      <Ionicons name={iconName} size={24} color="white" style={bannerStyles.icon} />
      <View style={bannerStyles.messageContainer}>
        <Text style={bannerStyles.title}>{title}</Text>
        <Text style={bannerStyles.message}>{displayMessage}</Text>
      </View>
      <TouchableOpacity onPress={dismissBanner}>
        <Text style={bannerStyles.closeButton}>{LABELS.CLOSE}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Banner;