import React from 'react';
import {View} from 'react-native';
import Colors from '../utils/Colors';

export default HorizontalLine = ({align, width}) => (
  <View
    style={{
      borderBottomColor: Colors.GRAY,
      borderBottomWidth: 1,
      width: width,
      alignSelf: 'flex-end',
      width: 55,
      marginVertical: 5
    }}
  />
);
