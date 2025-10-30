import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/Pagination.styles';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text style={[styles.buttonText, currentPage === 1 && styles.disabledButtonText]}>Previous</Text>
      </TouchableOpacity>
      {pageNumbers.map((number) => (
        <TouchableOpacity
          key={number}
          style={[
            styles.button,
            currentPage === number && styles.activeButton,
          ]}
          onPress={() => onPageChange(number)}
        >
          <Text style={[styles.buttonText, currentPage === number && styles.activeButtonText]}>{number}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.button, currentPage === totalPages && styles.disabledButton]}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text style={[styles.buttonText, currentPage === totalPages && styles.disabledButtonText]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;