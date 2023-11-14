import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AccountComponentStyles from './AccountComponentStyles';
import {getDate, getTime} from '../../utils/DateTime';
import Colors from '../../utils/Colors';
import {Capitalize} from '../../helpers/StringMethods';
import Enums from '../../utils/Enums';

export default function MyOrdersTab({id, createdAt, amount, items, status, onClick}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={AccountComponentStyles.container}>
      <View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={AccountComponentStyles.myOrdersItems}>
          {items.map(obj => obj.name).join(', ')}
        </Text>
        <View style={AccountComponentStyles.mutedTextContainer}>
          <Text
            style={AccountComponentStyles.mutedText}
            ellipsizeMode="tail"
            numberOfLines={1}>
            order #{id}
          </Text>
          <Text style={AccountComponentStyles.mutedText}>
            {getDate(createdAt)} at {getTime(createdAt)}
          </Text>
        </View>
      </View>
      <View style={AccountComponentStyles.myOrdersSubContainer}>
        <Text>₹ {amount}</Text>
        <Text
          style={[
            AccountComponentStyles.myOrdersStatus,
            {
              color:
                status === Enums.ORDER_STATUS.DELIVERED
                  ? Colors.BLACK
                  : Colors.WHITE,
              backgroundColor:
                status === Enums.ORDER_STATUS.DELIVERED
                  ? Colors.GREEN
                  : Colors.PRIMARY,
            },
          ]}>
          {Capitalize(status)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
