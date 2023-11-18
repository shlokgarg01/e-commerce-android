import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthStyles from './AuthStyles';
import AuthHeader from '../../components/Authentication/AuthHeader';
import InputGroup from '../../components/InputGroup';
import Btn from '../../components/Btn';
import ButtonSubText from '../../components/Authentication/ButtonSubText';
import {showToast} from '../../helpers/ShowToast';
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, sendOPTPLogin} from '../../actions/userActions';
import Loader from '../../components/Loader';

export default function LoginOTP({navigation}) {
  const [contactNumber, setContactNumber] = useState();
  const dispatch = useDispatch();
  const {error, isAuthenticated, loading, otpSent} = useSelector(
    state => state.user,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('tabnav');
    }

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    if (otpSent) {
      showToast('success', 'OTP Sent');
      navigation.navigate('login', {contactNumber});
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, otpSent, contactNumber]);

  const formSubmitHandler = () => {
    dispatch(sendOPTPLogin(contactNumber));
  };

  return (
    <>
      <View>
        <AuthHeader />
        <View style={AuthStyles.formContainer}>
          <Text style={AuthStyles.heading}>LOGIN</Text>
          <InputGroup
            label="Contact Number"
            placeholder="9999999999"
            value={contactNumber}
            onChange={number => setContactNumber(number)}
            type="number-pad"
          />
          <Btn onClick={formSubmitHandler} label="Send OTP" />
          <ButtonSubText
            title="Don't have an account?"
            subTitle="Signup"
            subTitleOnClick={() => navigation.replace('signupotp')}
          />
        </View>
      </View>
    </>
  );
}
