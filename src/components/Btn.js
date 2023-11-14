import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ComponentStyles from './ComponentStyles';

export default function Btn({label, onClick, disabled}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={ComponentStyles.btnContainer}>
      <Text style={ComponentStyles.btnLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
