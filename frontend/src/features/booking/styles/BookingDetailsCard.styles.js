import { StyleSheet } from 'react-native';
import { COLORS } from '../../../common/constants/color.constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
  hotelContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  hotelImage: {
    width: '100%',
    height: 150,
  },
  hotelOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  hotelLocation: {
    fontSize: 14,
    color: COLORS.WHITE,
  },
  roomContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  roomImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  roomContent: {
    flex: 1,
  },
  roomType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomInfo: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
  infoCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.MEDIUM_GRAY,
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BACKGROUND,
    paddingBottom: 12,
    marginBottom: 12,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.DARK_GRAY,
    marginLeft: 10,
  },
  infoCardContent: {},
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  detailIcon: {
    width: 20,
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '500',
    width: 190,
  },
  detailValue: {
    fontSize: 15,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
    flexShrink: 1,
    paddingLeft: 10,
  },
  errorText: {
    textAlign: 'center',
    color: COLORS.ERROR,
    fontSize: 16,
    padding: 20,
  },
});