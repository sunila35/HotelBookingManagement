import { StyleSheet } from 'react-native';
import { COLORS } from '../../../common/constants/color.constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 4, 
  },
  filterGroup: {
    marginBottom: 4, 
  },
  filterGridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterGridItem: {
    width: '48%',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    borderWidth: 1,
    borderColor: COLORS.MEDIUM_GRAY,
    borderRadius: 20,
    paddingVertical: 4, 
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  optionText: {
    color: COLORS.TEXT_PRIMARY,
  },
  selectedOptionText: {
    color: COLORS.WHITE,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16, 
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxInner: {
    color: COLORS.WHITE, 
  },
  checkboxChecked: {
    backgroundColor: COLORS.PRIMARY,
  },
  checkboxLabel: {
    fontSize: 14,
    flexShrink: 1,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: -8,
  },
  priceValue: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: COLORS.PRIMARY,
  },
});