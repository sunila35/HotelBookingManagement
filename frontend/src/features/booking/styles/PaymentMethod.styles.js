import { StyleSheet } from 'react-native';
import { COLORS } from '../../../common/constants/color.constants';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: '100%'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.DARK_GRAY,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.MEDIUM_GRAY,
    paddingBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'center',
    gap: 10, 
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  selectedOption: {
    backgroundColor: COLORS.PRIMARY,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  selectedOptionText: {
    color: COLORS.WHITE,
  },
});