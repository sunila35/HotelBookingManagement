import { StyleSheet } from 'react-native';
import { COLORS } from '../../../common/constants/color.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.PRIMARY,
  },
  searchContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.MEDIUM_GRAY,
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.ERROR,
    textAlign: 'center',
    marginTop: 10,
  },
});