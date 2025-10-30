import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/color.constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: '600',
  },
  activeButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  activeButtonText: {
    color: COLORS.WHITE,
  },
  disabledButton: {
    backgroundColor: COLORS.LIGHT_GRAY,
    opacity: 0.7,
  },
});