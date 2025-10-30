import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/color.constants';
import { styles } from '../styles/Header.styles';

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.push('/')} style={styles.logoContainer}>
        <Ionicons name="business" size={28} color={COLORS.WHITE} />
        <Text style={styles.logoText}>Hotel Booking</Text>
      </TouchableOpacity>
      <View style={styles.navLinks}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.navLink}>
          <Text style={styles.navLinkText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/my-bookings')} style={styles.navLink}>
          <Text style={styles.navLinkText}>My Bookings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;