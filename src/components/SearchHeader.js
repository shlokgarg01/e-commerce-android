import {View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import ComponentStyles from './ComponentStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/Colors';
import {deviceWidth} from '../helpers/Dimensions';
import {useNavigation} from '@react-navigation/native';
import Voice from '@react-native-voice/voice';

export default function SearchHeader() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const speechStartHandler = e => {};

  const speechEndHandler = e => {};

  const speechResultsHandler = e => {
    const text = e.value[0];
    setSearchTerm(text);
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: deviceWidth,
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 10,
      }}>
      <TextInput
        style={[
          ComponentStyles.inputField,
          {backgroundColor: Colors.WHITE, width: deviceWidth - 100},
        ]}
        placeholder="Search Products"
        value={searchTerm}
        onChangeText={val => setSearchTerm(val)}
      />
      <TouchableOpacity
        style={{
          borderRadius: 100,
          padding: 5,
          backgroundColor: 'rgba(52, 52, 52, 0.34)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={startRecording}>
        <Icon name="microphone-outline" size={22} color={Colors.WHITE} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 100,
          padding: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() =>
          navigation.replace('tabnav', {
            screen: 'categorytab',
            params: {
              screen: 'categoryproducts',
              params: {searchTerm},
            },
          })
        }>
        <Icon name="magnify" size={22} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
}
