import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/color.constants';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: COLORS.PRIMARY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  navLinks: {
    flexDirection: 'row',
  },
  navLink: {
    marginLeft: 24,
  },
  navLinkText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});