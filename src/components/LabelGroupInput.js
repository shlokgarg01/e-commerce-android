import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ComponentStyles from './ComponentStyles';
import Colors from '../utils/Colors';

export default function LabelGroupInput({label, setLabel, selected}) {
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() =>{
    setIsSelected(selected)
  }, [])

  return (
    <View style={ComponentStyles.inputGroupContainer}>
      <Text style={ComponentStyles.inputLabel}>{label}</Text>
      <View style={ComponentStyles.inputLabelGroupContainer}>
        <TouchableOpacity
          onPress={() => {
            setLabel('Home');
            setIsSelected('Home');
          }}>
          <Text
            style={[
              ComponentStyles.inputLabelGroupLabel,
              {
                color: isSelected === "Home" ? Colors.WHITE : Colors.PRIMARY,
                backgroundColor:
                  isSelected === "Home" ? Colors.PRIMARY : Colors.WHITE,
              },
            ]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLabel('Work');
            setIsSelected('Work');
          }}>
          <Text
            style={[
              ComponentStyles.inputLabelGroupLabel,
              {
                color: isSelected === "Work" ? Colors.WHITE : Colors.PRIMARY,
                backgroundColor:
                  isSelected === "Work" ? Colors.PRIMARY : Colors.WHITE,
              },
            ]}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLabel('Other');
            setIsSelected('Other');
          }}>
          <Text
            style={[
              ComponentStyles.inputLabelGroupLabel,
              {
                color: isSelected === "Other" ? Colors.WHITE : Colors.PRIMARY,
                backgroundColor:
                  isSelected === "Other" ? Colors.PRIMARY : Colors.WHITE,
              },
            ]}>
            Other
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
