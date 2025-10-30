import { StyleSheet } from 'react-native';
import { COLORS } from '../../../common/constants/color.constants';

export const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  bannerImage: {
    width: '100%',
    height: 250,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  detailsContainer: {
    alignItems: 'center',
    marginTop: -30,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    padding: 24,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  location: {
    fontSize: 18,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.PRIMARY,
    borderBottomWidth: 1,
    borderColor: COLORS.MEDIUM_GRAY,
    paddingBottom: 8,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  amenity: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    marginLeft: 10,
  },
});