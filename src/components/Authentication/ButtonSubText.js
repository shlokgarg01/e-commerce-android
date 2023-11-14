import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AuthComponentStyles from './AuthComponentStyles';

export default function ButtonSubText({title, subTitle, subTitleOnClick}) {
  return (
    <View style={AuthComponentStyles.btnSubTextContainer}>
      <Text style={AuthComponentStyles.btnSubTextTitle}>{title}</Text>
      <TouchableOpacity onPress={subTitleOnClick}>
        <Text style={AuthComponentStyles.btnSubTextSubTitle}> {subTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}
