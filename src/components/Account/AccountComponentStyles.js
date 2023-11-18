import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {deviceWidth} from '../../helpers/Dimensions';

const AccountComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginVertical: 5,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountTabsSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountTabsIcon: {
    color: Colors.GRAY,
    marginRight: 10,
  },
  accountTabsArrow: {
    color: Colors.GRAY,
  },
  myOrdersSubContainer: {
    height: 64,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  mutedTextContainer: {
    marginTop: 20,
  },
  mutedText: {
    color: Colors.GRAY,
    width: deviceWidth * 0.5,
  },
  myOrdersItems: {
    width: deviceWidth * 0.6,
  },
  myOrdersStatus: {
    padding: 4,
    borderRadius: 5,
    fontSize: 11,
  },
  orderDetailsId: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  orderDetailsItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderDetailsProductImage: {
    height: 57,
    width: 57,
    borderRadius: 100,
    marginRight: 10
  },
  orderDetailsProductName: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 130,
  },
  orderDetailsProductPrice: {
    fontSize: 17,
    width: 140,
    textAlign: 'right'
  },
  orderDetailsTotalPrice: {
    alignSelf: 'flex-end',
    fontSize: 19,
    fontWeight: '600',
    marginRight: -10,
    marginTop: 10
  },
  orderDetailsPrice: {
    alignSelf: 'flex-end',
    fontSize: 17,
    marginRight: -10,
  },
  orderDetailsTxtMuted: {
    alignSelf: 'flex-end',
    fontSize: 13,
    marginRight: -10,
    color: Colors.GRAY,
  },
  orderDetailsOrderStatus: {
    fontSize: 22,
    paddingHorizontal: 13,
    paddingVertical: 1,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 20,
    alignSelf: 'center',
    width: deviceWidth * 0.8,
  },
});

export default AccountComponentStyles;
