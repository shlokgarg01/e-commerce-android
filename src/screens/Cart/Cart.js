import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CartCard from '../../components/Cart/CartCard';
import {deviceHeight, deviceWidth} from '../../helpers/Dimensions';
import Colors from '../../utils/Colors';
import Btn from '../../components/Btn';
import AccountStyles from '../Account/AccountStyles';
import {useState} from 'react';
import HorizontalLine from '../../components/HorizontalLine';
import {useEffect} from 'react';
import ComponentStyles from '../../components/ComponentStyles';
import Loader from '../../components/Loader';
import {showToast} from '../../helpers/ShowToast';
import {clearErrors, validateCoupon} from '../../actions/CouponActions';
import {useNavigation} from '@react-navigation/native';

export default function Cart() {
  const navigation = useNavigation();
  const {loading, error, coupon, discount, finalPrice, isValidated} =
    useSelector(state => state.coupon);

  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cart);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [discountApplied, setDiscount] = useState(discount || 0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponApplied, setCoupon] = useState(coupon?.code);

  const updatePrice = () => {
    const price = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    const taxApplied = parseInt((price * 18) / 100)
    const shipping = 50
    const discountAvailed = discount || discountApplied
    
    setShippingPrice(shipping);
    setItemsPrice(price);
    setTax(taxApplied);
    setTotalPrice(price + shipping + taxApplied - discountAvailed);
  };

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
      setCoupon('');
      setDiscount(0)
    }

    if (isValidated === true) {
      setDiscount(discount);
      updatePrice();
      showToast('success', 'Coupon Added!');
    }

    updatePrice();
  }, [cartItems, coupon, error, dispatch, discount, finalPrice, isValidated]);

  const couponHandler = () => {
    dispatch(validateCoupon({code: couponApplied, cartValue: itemsPrice}));
  };

  const checkout = () => {
    const orderPrices = {
      shippingPrice,
      itemsPrice,
      taxPrice: tax,
      couponDiscount: discountApplied,
      coupon: couponApplied,
      totalPrice,
    }
    navigation.navigate('tabnav', {
      screen: 'carttab',
      params: {
        screen: 'checkout',
        params: {
          orderPrices,
          orderItems: cartItems
        },
      },
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : cartItems.length === 0 ? (
        <Text style={AccountStyles.noSavedInfo}>Your cart is empty</Text>
      ) : (
        <View>
          <ScrollView
            style={{
              height: deviceHeight * 0.47,
              backgroundColor: Colors.WHITE,
              marginVertical: 10,
              elevation: 4,
            }}
            showsVerticalScrollIndicator={false}>
            {cartItems.map(item => (
              <CartCard product={item} key={item.product} />
            ))}
          </ScrollView>

          {/* Coupon */}
          <View
            style={{
              height: deviceHeight * 0.07,
              marginBottom: 10,
              backgroundColor: Colors.WHITE,
              elevation: 4,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <TextInput
              style={[ComponentStyles.inputField, {width: deviceWidth * 0.7}]}
              placeholder="Apply Coupon Code"
              value={couponApplied}
              onChangeText={val => setCoupon(val)}
            />
            <TouchableOpacity
              onPress={couponHandler}
              style={[
                ComponentStyles.btnContainer,
                {marginTop: 0, width: deviceWidth * 0.2},
              ]}>
              <Text style={ComponentStyles.btnLabel}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Price Section */}
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
              <Text style={{fontSize: 16}}>₹ {itemsPrice}</Text>
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
              <Text style={{fontSize: 16}}>₹ {shippingPrice}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: Colors.GRAY, fontSize: 16}}>GST (18%):</Text>
              <Text style={{fontSize: 16}}>₹ {tax}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: Colors.GRAY, fontSize: 16}}>Discount:</Text>
              <Text style={{fontSize: 16}}>₹ {discountApplied}</Text>
            </View>
            <HorizontalLine />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{color: Colors.BLACK, fontSize: 16, fontWeight: 'bold'}}>
                Total:
              </Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                ₹ {totalPrice}
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginTop: -5}}>
            <Btn label="CHECKOUT" onClick={checkout} />
          </View>
        </View>
      )}
    </>
  );
}
