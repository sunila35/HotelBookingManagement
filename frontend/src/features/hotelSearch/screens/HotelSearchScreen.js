import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { default as DatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PersonCounter from '../components/PersonCounter';
import Banner from '../../../common/ui/components/Banner';
import { searchHotelsRequest, getCitiesRequest, clearSearchCache } from '../redux/actions/hotelSearchActions';
import { setBookingSearchDetails } from '../../booking/redux/actions/bookingActions';
import {
  selectIsLoading,
  selectError,
  selectCities,
  selectCitiesIsLoading,
  selectCitiesError,
} from '../redux/selectors/hotelSearchSelectors';
import { LABELS } from '../../../common/constants/label.constants';
import { COLORS } from '../../../common/constants/color.constants';
import { ICONS } from '../../../common/constants/icon.constants';
import { styles } from '../styles/HotelSearchScreen.styles';

const HotelSearchScreen = () => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('');
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const locationContainerRef = useRef(null);

  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const cities = useSelector(selectCities);
  const citiesLoading = useSelector(selectCitiesIsLoading);
  const citiesError = useSelector(selectCitiesError);

  useEffect(() => {
    dispatch(getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationContainerRef.current && !locationContainerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused]);

  const handleSearch = () => {
    if (!location || !checkInDate || !checkOutDate) {
      setBannerMessage(LABELS.FILL_REQUIRED_FIELDS);
      setIsBannerVisible(true);
      return;
    }

    if (checkInDate >= checkOutDate) {
      setBannerMessage(LABELS.CHECKOUT_AFTER_CHECKIN);
      setIsBannerVisible(true);
      return;
    }

    const searchParams = {
      location,
      checkInDate: checkInDate ? checkInDate.toISOString().split('T')[0] : null,
      checkOutDate: checkOutDate
        ? checkOutDate.toISOString().split('T')[0]
        : null,
      numberOfGuests,
    };
    console.log('Dispatching search with params:', searchParams);
    dispatch(clearSearchCache());
    dispatch(setBookingSearchDetails(searchParams));
    dispatch(searchHotelsRequest(searchParams));
  };

  const handleLocationChange = (text) => {
    setLocation(text);
    if (text) {
      const filteredCities = cities.filter((city) =>
        city.toLowerCase().startsWith(text.toLowerCase())
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions(cities);
    }
  };

  const onSuggestionPress = (city) => {
    setLocation(city);
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      {isBannerVisible && (
        <Banner
          message={bannerMessage}
          type="warning"
          onDismiss={() => setIsBannerVisible(false)}
        />
      )}
      <View style={styles.formContainer}>
        <Text style={styles.title}>{LABELS.FIND_YOUR_HOTEL}</Text>

        <View style={styles.locationContainer} ref={locationContainerRef}>
          <View style={styles.inputContainer}>
            <Ionicons name={ICONS.SEARCH} size={20} color={COLORS.PRIMARY} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={LABELS.LOCATION}
              value={location}
              onChangeText={handleLocationChange}
              onFocus={() => {
                setIsFocused(true);
                setSuggestions(cities);
              }}
            />
          </View>
          {isFocused && (
            <View style={styles.suggestionsContainer}>
              {citiesLoading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={suggestions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPressIn={() => onSuggestionPress(item)}>
                      <Text style={styles.suggestionItem}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  style={styles.suggestionsList}
                  keyboardShouldPersistTaps="handled"
                />
              )}
            </View>
          )}
        </View>

        <View style={styles.dateRow}>
          <View style={styles.dateInputContainer}>
            <Ionicons name={ICONS.CALENDAR} size={20} color={COLORS.PRIMARY} style={styles.icon} />
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText={LABELS.CHECK_IN}
              className="date-picker-input"
            />
          </View>
          <View style={styles.dateInputContainer}>
            <Ionicons name={ICONS.CALENDAR} size={20} color={COLORS.PRIMARY} style={styles.icon} />
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText={LABELS.CHECK_OUT}
              className="date-picker-input"
            />
          </View>
        </View>

        <style>
          {`
            .date-picker-input {
              height: 40px;
              border: none;
              width: 100%;
              font-size: 14px;
            }
            .date-picker-input:focus {
              outline: none;
            }
          `}
        </style>

        <View style={styles.inputContainer}>
          <Ionicons name={ICONS.PERSON} size={20} color={COLORS.PRIMARY} style={styles.icon} />
          <Text >{LABELS.NUMBER_OF_GUESTS}</Text>
          <PersonCounter value={numberOfGuests} onChange={setNumberOfGuests} />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
          <Text style={styles.searchButtonText}>{loading ? LABELS.SEARCHING : LABELS.SEARCH}</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color={COLORS.PRIMARY} style={styles.loader} />}
      {error && <Text style={styles.error}>{LABELS.ERROR}: {error}</Text>}
      {citiesError && <Text style={styles.error}>{LABELS.ERROR_FETCHING_CITIES}{citiesError}</Text>}
    </View>
  );
};

export default HotelSearchScreen;