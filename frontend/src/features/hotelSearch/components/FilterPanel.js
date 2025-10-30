import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/FilterPanel.styles';
import { COLORS } from '../../../common/constants/color.constants';
import { AMENITIES } from '../../../common/constants/amenities.constants';
import { ICONS, MATERIAL_ICONS } from '../../../common/constants/icon.constants';

const SORT_OPTIONS = [
  { key: null, label: 'Default' },
  { key: 'rating_desc', label: 'Rating' },
  { key: 'price_asc', label: 'Price: Low to High' },
  { key: 'price_desc', label: 'Price: High to Low' },
];

const Checkbox = ({ isChecked, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
    {isChecked && <Ionicons name={ICONS.CHECKMARK} size={16} style={styles.checkboxInner} />}
  </TouchableOpacity>
);

const FilterPanel = ({ onFilterChange, initialFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy);
  const [selectedAmenities, setSelectedAmenities] = useState(initialFilters.amenities);
  const [price, setPrice] = useState(initialFilters.price.max || 15000);

  const applyFilters = (newFilters) => {
    onFilterChange({ ...initialFilters, ...newFilters });
  };
  
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    applyFilters({ sortBy: newSortBy, amenities: selectedAmenities, price: { max: price } });
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(newAmenities);
    applyFilters({ sortBy, amenities: newAmenities, price: { max: price } });
  };
  
  const handlePriceChange = (newPrice) => {
    setPrice(newPrice);
  };
  
  const handlePriceChangeComplete = (newPrice) => {
    applyFilters({ sortBy, amenities: selectedAmenities, price: { max: newPrice } });
  };

  const handleReset = () => {
    setSortBy(null);
    setSelectedAmenities([]);
    setPrice(15000);
    applyFilters({ sortBy: null, amenities: [], price: { max: 15000 } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.resultsText}>Sort & Filter</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.iconButton} onPress={handleReset}>
            <MaterialIcons name={MATERIAL_ICONS.REPLAY} size={22} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setIsOpen(!isOpen)}>
            <Ionicons name={isOpen ? ICONS.CHEVRON_UP : ICONS.CHEVRON_DOWN} size={24} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>

      {isOpen && (
        <View style={styles.content}>
          <View style={styles.filterGridContainer}>
            {/* Sort By */}
            <View style={[styles.filterGroup, styles.filterGridItem]}>
              <Text style={styles.filterTitle}>Sort By</Text>
              <View style={styles.optionsContainer}>
                {SORT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[styles.option, sortBy === option.key && styles.selectedOption]}
                    onPress={() => handleSortChange(option.key)}
                  >
                    <Text style={[styles.optionText, sortBy === option.key && styles.selectedOptionText]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Price Range */}
            <View style={[styles.filterGroup, styles.filterGridItem]}>
              <Text style={styles.filterTitle}>Max Price: ₹{price}</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  style={{ width: '80%', height: 40 }}
                  minimumValue={500}
                  maximumValue={15000}
                  step={100}
                  value={price}
                  onValueChange={handlePriceChange}
                  onSlidingComplete={handlePriceChangeComplete}
                  minimumTrackTintColor={COLORS.PRIMARY}
                  maximumTrackTintColor={COLORS.LIGHT_GRAY}
                  thumbTintColor={COLORS.PRIMARY}
                />
                <View style={[styles.priceLabels, {width: '80%'}]}>
                  <Text>₹500</Text>
                  <Text>₹15000</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Amenities */}
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {AMENITIES.map((amenity) => (
                <View key={amenity} style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={selectedAmenities.includes(amenity)}
                    onToggle={() => handleAmenityToggle(amenity)}
                  />
                  <Text style={styles.checkboxLabel}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default FilterPanel;