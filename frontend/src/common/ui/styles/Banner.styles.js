import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/color.constants';

export const bannerStyles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    width: '90%',
    maxWidth: 400,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  error: {
    backgroundColor: COLORS.ERROR,
  },
icon: {
    marginRight: 10,
  },
  messageContainer: {
    flex: 1,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  warning: {
    backgroundColor: COLORS.SECONDARY,
  },
  message: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
  closeButton: {
    color: COLORS.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});