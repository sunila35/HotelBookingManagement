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
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryIcon: {
    marginRight: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    flex: 1,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'right',
  },
  total: {
    borderTopWidth: 1,
    borderColor: COLORS.MEDIUM_GRAY,
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    flex: 1,
    textAlign: 'right',
  },
  perNightText: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    alignSelf: 'flex-end',
    paddingBottom: 1,
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});