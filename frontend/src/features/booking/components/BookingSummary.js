import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/BookingSummary.styles';
import { ICONS } from '../../../common/constants/icon.constants';

const BookingSummary = ({ searchDetails, hotel, room, numberOfNights, totalPrice }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Booking Summary</Text>
    <View style={styles.summaryItem}>
      <Ionicons name={ICONS.BUSINESS} size={18} color="#4a90e2" style={styles.summaryIcon} />
      <Text style={styles.summaryLabel}>Hotel</Text>
      <Text style={styles.summaryValue}>{hotel.hotelName}</Text>
    </View>
    <View style={styles.summaryItem}>
      <Ionicons name={ICONS.LOCATION} size={18} color="#f5a623" style={styles.summaryIcon} />
      <Text style={styles.summaryLabel}>Location</Text>
      <Text style={styles.summaryValue}>{searchDetails.location}</Text>
    </View>
    <View style={styles.summaryItem}>
      <Ionicons name={ICONS.CALENDAR} size={18} color="#7ed321" style={styles.summaryIcon} />
      <Text style={styles.summaryLabel}>Check-in</Text>
      <Text style={styles.summaryValue}>{searchDetails.checkInDate}</Text>
    </View>
    <View style={styles.summaryItem}>
      <Ionicons name={ICONS.CALENDAR} size={18} color="#d0021b" style={styles.summaryIcon} />
      <Text style={styles.summaryLabel}>Check-out</Text>
      <Text style={styles.summaryValue}>{searchDetails.checkOutDate}</Text>
    </View>
    <View style={styles.summaryItem}>
      <Ionicons name={ICONS.PEOPLE} size={18} color="#c19700ff" style={styles.summaryIcon} />
      <Text style={styles.summaryLabel}>Guests</Text>
      <Text style={styles.summaryValue}>{searchDetails.numberOfGuests}</Text>
    </View>
    <View style={styles.summaryItem}>
      <Ionicons name={ICONS.BED} size={18} color="#50e3c2" style={styles.summaryIcon} />
      <Text style={styles.summaryLabel}>Room</Text>
      <Text style={styles.summaryValue}>{room.roomType}</Text>
    </View>
    <View style={[styles.summaryItem, styles.total]}>
      <Ionicons name={ICONS.CASH} size={18} color="#bd10e0" style={styles.summaryIcon} />
      <Text style={styles.totalLabel}>Total Price</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.totalValue}>Rs. {totalPrice}</Text>
        <Text style={styles.perNightText}>
          {' '}
          for {numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}
        </Text>
      </View>
    </View>
  </View>
);

export default BookingSummary;