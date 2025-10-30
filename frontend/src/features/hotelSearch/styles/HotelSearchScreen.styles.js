import { StyleSheet } from 'react-native';
import { COLORS } from '../../../common/constants/color.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.WHITE,
    padding: 24,
    borderRadius: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: COLORS.PRIMARY,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.MEDIUM_GRAY,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 10,
    display: "flex"
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingLeft:10,
    height: 40
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    zIndex: 10,
  },
  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.MEDIUM_GRAY,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  dateText: {
    color: COLORS.TEXT_PRIMARY,
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 16,
  },
  error: {
    marginTop: 16,
    color: COLORS.ERROR,
    textAlign: 'center',
  },
  resultsContainer: {
    marginTop: 16,
    width: '100%',
    maxWidth: 400,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationContainer: {
    position: 'relative',
    zIndex: 100,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '75%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    maxHeight: 250,
  },
  suggestionsList: {
    width: '100%',
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
});