import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AccountStyles from './AccountStyles';
import AccountTabs from '../../components/Account/AccountTabs';
import Colors from '../../utils/Colors';
import {logout} from '../../actions/userActions';
import {showToast} from '../../helpers/ShowToast';
import { RESET_CART } from '../../constants/CartConstants';
import { RESET_COUPON } from '../../constants/couponConstants';
import { RESET_NEW_ORDER } from '../../constants/OrderConstants';

export default function MyAccount({navigation}) {
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector(state => state.user);
  const {isUpdated} = useSelector(
    state => state.profile,
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.reset({index: 1, routes: [{name: 'loginotp'}]});
    }

    // if(isUpdated) {
    //   dispatch({type:UPDATE_USER_RESET})
    // }
  }, [isAuthenticated, isUpdated]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch({type: RESET_CART})
    dispatch({type: RESET_COUPON})
    dispatch({type: RESET_NEW_ORDER})
    showToast('success', 'Logout successful');
  };

  return (
    <View>
      <Text style={AccountStyles.userName}>{isAuthenticated && user.name}</Text>
      <AccountTabs
        title="Edit Profile"
        icon="pencil-box-multiple-outline"
        onClick={() => navigation.navigate('editprofile')}
      />
      <AccountTabs
        title="My Orders"
        icon="cart-outline"
        onClick={() => navigation.navigate('myorders')}
      />
      <AccountTabs
        title="Saved Addresses"
        icon="map-marker-outline"
        onClick={() => navigation.navigate('savedaddresses')}
      />
      <AccountTabs
        title="Help Center"
        icon="headset"
        onClick={() => navigation.navigate('helpcenter')}
      />
      <AccountTabs
        title="Logout"
        color={Colors.RED}
        showArrow={false}
        icon="power-standby"
        onClick={logoutHandler}
      />
    </View>
  );
}
