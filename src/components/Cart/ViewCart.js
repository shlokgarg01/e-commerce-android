import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import {deviceWidth} from '../../helpers/Dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountComponentStyles from '../Account/AccountComponentStyles';

const ViewCart = props => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        width: deviceWidth - 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
      }}
      onPress={() =>
        navigation.navigate('tabnav', {
          screen: 'carttab',
          params: {screen: 'cart'},
        })
      }>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{color: Colors.WHITE, fontSize: 15}}>
          {props.quantity} Items
        </Text>
        <View
          style={{
            borderLeftWidth: 2,
            borderColor: Colors.WHITE,
            borderRadius: 100,
            marginHorizontal: 5,
          }}
        />
        <Text style={{color: Colors.WHITE, fontSize: 15}}>
          ₹ {props.totalPrice}
        </Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Icon
          name="cart-outline"
          size={22}
          style={[
            AccountComponentStyles.accountTabsIcon,
            {color: Colors.WHITE},
          ]}
        />
        <Text style={{color: Colors.WHITE, fontSize: 17, fontWeight: 'bold'}}>
          View Cart
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ViewCart;
