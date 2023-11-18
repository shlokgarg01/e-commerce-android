import React, {useEffect} from 'react';
import store from '../../store';
import {loadUser} from '../actions/userActions';
import {useSelector} from 'react-redux';
import {Image, View} from 'react-native';

const Splash = ({navigation}) => {
  const {isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
    let routeName = '';

    if (isAuthenticated) {
      routeName = 'tabnav';
    } else {
      routeName = 'loginotp';
    }

    setTimeout(() => {
      navigation.replace(routeName);
    }, 2000);
  }, []);

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
