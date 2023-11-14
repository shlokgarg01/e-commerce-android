import React, {useEffect} from 'react';
import store from '../../store';
import {loadUser} from '../actions/userActions';
import {useSelector} from 'react-redux';
import {Image, View} from 'react-native';
import {deviceHeight, deviceWidth} from '../helpers/Dimensions';

const Splash = ({navigation}) => {
  const {isAutheticated, loading} = useSelector(state => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
    let routeName = '';

    if (isAutheticated) {
      routeName = 'tabnav';
    } else {
      routeName = 'loginotp';
    }

    setTimeout(() => {
      console.log("-------------------------------------", isAutheticated, loading)
      navigation.replace(routeName);
    }, 2000);
  }, [isAutheticated]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../images/splash_screen_final.gif')}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  );
};

export default Splash;
