import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthStyles from './AuthStyles';
import AuthHeader from '../../components/Authentication/AuthHeader';
import InputGroup from '../../components/InputGroup';
import Btn from '../../components/Btn';
import ButtonSubText from '../../components/Authentication/ButtonSubText';
import {showToast} from '../../helpers/ShowToast';
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, loginViaOTP, sendOPTPLogin} from '../../actions/userActions';

export default function Login({navigation, route}) {
  const [otp, setOtp] = useState();
  const contactNumber = route.params.contactNumber;
  const dispatch = useDispatch();
  const {error, isAuthenticated, otpSent} = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      showToast('success', 'Login Successful');
      navigation.reset({index: 1, routes: [{name: 'tabnav'}]})
    }

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    if (otpSent) {
      showToast('success', 'OTP Sent');
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, otpSent]);

  const loginHandler = () => {
    dispatch(loginViaOTP(contactNumber, otp));
  };

  const resendOTP =() => {
    dispatch(sendOPTPLogin(contactNumber))
  }

  return (
    <View>
      <AuthHeader />
      <View style={AuthStyles.formContainer}>
        <Text style={AuthStyles.heading}>ENTER OTP</Text>
        <InputGroup
          label="Enter OTP"
          placeholder="xxxxxx"
          value={otp}
          onChange={otpEntered => setOtp(otpEntered)}
          type="number-pad"
        />
        <Btn onClick={loginHandler} label="LOGIN" />
        <ButtonSubText subTitle="Resend OTP" subTitleOnClick={resendOTP} />
      </View>
    </View>
  );
}
