import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Colors from '../utils/Colors';
import ComponentStyles from './ComponentStyles';

const Loader = () => {
  return (
    <View style={ComponentStyles.loaderContainer}>
      <View style={ComponentStyles.loaderSubContainer}>
        <ActivityIndicator size={46} color={Colors.PRIMARY} />
      </View>
    </View>
  );
};

export default Loader;
