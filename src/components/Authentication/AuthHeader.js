import {View, Text, Image} from 'react-native';
import React from 'react';
import AuthComponentStyles from './AuthComponentStyles';
import Logo from '../../images/logo.jpeg';

export default function AuthHeader() {
  return (
    <View style={AuthComponentStyles.bgContainer}>
      <Image source={Logo} style={AuthComponentStyles.logo} />
      <Text style={AuthComponentStyles.companyName}>PARCHUN KING</Text>
    </View>
  );
}
