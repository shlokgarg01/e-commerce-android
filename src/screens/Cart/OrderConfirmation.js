import {View, ScrollView, Text} from 'react-native';
import React from 'react';
import {deviceHeight} from '../../helpers/Dimensions';
import Colors from '../../utils/Colors';
import CartCard from '../../components/Cart/CartCard';
import HorizontalLine from '../../components/HorizontalLine';
import AccountComponentStyles from '../../components/Account/AccountComponentStyles';
import {Capitalize} from '../../helpers/StringMethods';
import Btn from '../../components/Btn';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {showToast} from '../../helpers/ShowToast';
import {clearErrors, createOrder} from '../../actions/OrderActions';
import {RESET_NEW_ORDER} from '../../constants/OrderConstants';
import { RESET_CART } from '../../constants/CartConstants';
import { RESET_COUPON } from '../../constants/couponConstants';

export default function OrderConfirmation(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {error} = useSelector(state => state.newOrder);
  const {orderPrices, orderItems, shippingAddress, address} =
    props.route.params;

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const placeOrder = () => {
    const order = {orderItems, shippingAddress, ...orderPrices};
    // TODO - make call to payment gateway here & get the payment id & status from it & pass it here.
    order.paymentInfo = {
      id: shippingAddress,
      status: 'succeeded',
    };

    dispatch(createOrder(order));
    dispatch({type: RESET_NEW_ORDER});
    dispatch({type: RESET_CART})
    dispatch({type: RESET_COUPON})
    navigation.reset({index: 1, routes: [{name: 'tabnav'}]});
  };

  return (
    <View>
      <ScrollView
        style={{
          height: deviceHeight * 0.40,
          backgroundColor: Colors.WHITE,
          marginVertical: 10,
          elevation: 4,
        }}
        showsVerticalScrollIndicator={false}>
        {orderItems.map(item => (
          <CartCard showEditOptions={false} product={item} key={item.product} />
        ))}
      </ScrollView>
      <View
        style={{
          height: deviceHeight * 0.19,
          backgroundColor: Colors.WHITE,
          elevation: 4,
          paddingVertical: 7,
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.GRAY, fontSize: 16}}>Sub Total:</Text>
          <Text style={{fontSize: 16}}>₹ {orderPrices.itemsPrice}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.GRAY, fontSize: 16}}>
            Shipping Price:
          </Text>
          <Text style={{fontSize: 16}}>₹ {orderPrices.shippingPrice}</Text>
        </View>
        {/* <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.GRAY, fontSize: 16}}>GST (18%):</Text>
          <Text style={{fontSize: 16}}>₹ {orderPrices.taxPrice}</Text>
        </View> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.GRAY, fontSize: 16}}>Discount:</Text>
          <Text style={{fontSize: 16}}>₹ {orderPrices.couponDiscount}</Text>
        </View>
        <HorizontalLine />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.BLACK, fontSize: 16, fontWeight: 'bold'}}>
            Total:
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            ₹ {orderPrices.totalPrice}
          </Text>
        </View>
      </View>

      {/* Address Info */}
      <View
        style={[
          AccountComponentStyles.container,
          {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginVertical: 10,
          },
        ]}>
        <View style={{width: 190}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            {Capitalize(address.label)}
          </Text>
          <Text numberOfLines={2} ellipsizeMode="tail">
            {`${address.address} ${address.city} ${address.pincode}`}
          </Text>
          <Text
            style={{
              color: Colors.GRAY,
            }}>{`${address.state}, ${address.country}`}</Text>
        </View>
      </View>

      <View style={{marginHorizontal: 20, marginTop: -20}}>
        <Btn label="Place Order" onClick={placeOrder} />
      </View>
    </View>
  );
}
