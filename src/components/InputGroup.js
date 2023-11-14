import React from 'react';
import {View, Text, TextInput} from 'react-native';
import ComponentStyles from './ComponentStyles';

const InputGroup = ({type, placeholder, value, onChange, label, ...rest}) => {
  return (
    <View style={ComponentStyles.inputGroupContainer}>
      <Text style={ComponentStyles.inputLabel}>{label}</Text>
      <TextInput
        keyboardType={type}
        style={ComponentStyles.inputField}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        {...rest}
      />
    </View>
  );
};

export default InputGroup;
