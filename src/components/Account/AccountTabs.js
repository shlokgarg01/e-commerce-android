import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountComponentStyles from './AccountComponentStyles';

export default function AccountTabs({title, icon, onClick, showArrow, color}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={AccountComponentStyles.container}>
      <View style={AccountComponentStyles.accountTabsSubContainer}>
        <Icon
          name={icon}
          size={22}
          style={[AccountComponentStyles.accountTabsIcon, {color}]}
        />
        <Text style={{color}}>{title}</Text>
      </View>
      <Icon
        name="greater-than"
        size={showArrow === false ? 0 : 19}
        style={AccountComponentStyles.accountTabsArrow}
      />
    </TouchableOpacity>
  );
}
