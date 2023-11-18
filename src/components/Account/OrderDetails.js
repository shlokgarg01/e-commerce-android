import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import AccountComponentStyles from './AccountComponentStyles';
import Colors from '../../utils/Colors';
import {Capitalize} from '../../helpers/StringMethods';
import Enums from '../../utils/Enums';
import {deviceWidth} from '../../helpers/Dimensions';

export default function OrderDetails(props) {
  const order = props.route.params.order;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onPress={() => navigation.navigate('orderdetails')}
      contentContainerStyle={[
        AccountComponentStyles.container,
        {paddingBottom: 20, justifyContent: 'center'},
      ]}>
      <View
        style={{
          width: deviceWidth * 0.8,
          alignItems: 'center',
        }}>
        <Text
          style={AccountComponentStyles.orderDetailsId}
          ellipsizeMode="tail"
          numberOfLines={1}>
          Order #{order._id}
        </Text>
        {order.orderItems.map(item => (
          <View
            key={item.product}
            style={AccountComponentStyles.orderDetailsItemContainer}>
            <Image
              source={{uri: item.image}}
              style={AccountComponentStyles.orderDetailsProductImage}
            />
            <Text
              style={AccountComponentStyles.orderDetailsProductName}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {item.name}
            </Text>
            <Text
              style={AccountComponentStyles.orderDetailsProductPrice}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {item.quantity} X ₹ {item.price} = ₹ {item.quantity * item.price}
            </Text>
          </View>
        ))}
        <Text style={AccountComponentStyles.orderDetailsPrice}>
          Items Price = ₹{' '}
          {order.orderItems.reduce((sum, item) => {
            return sum + item.price * item.quantity;
          }, 0)}
        </Text>
        {/* <Text style={AccountComponentStyles.orderDetailsPrice}>
          Tax = ₹ {order.taxPrice}
        </Text> */}
        <Text style={AccountComponentStyles.orderDetailsPrice}>
          Shipping Charge = ₹ {order.shippingPrice}
        </Text>
        <Text style={AccountComponentStyles.orderDetailsTotalPrice}>
          Total = ₹ {order.totalPrice}
        </Text>
        <Text style={AccountComponentStyles.orderDetailsTxtMuted}>
          (Inclcluding Taxes)
        </Text>
        <Text
          style={[
            AccountComponentStyles.orderDetailsOrderStatus,
            {
              color:
                order.orderStatus === Enums.ORDER_STATUS.DELIVERED
                  ? Colors.BLACK
                  : Colors.WHITE,
              backgroundColor:
                order.orderStatus === Enums.ORDER_STATUS.DELIVERED
                  ? Colors.GREEN
                  : Colors.PRIMARY,
            },
          ]}>
          {Capitalize(order.orderStatus)}
        </Text>
      </View>
    </ScrollView>
  );
}
