import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthStyles from './AuthStyles';
import AuthHeader from '../../components/Authentication/AuthHeader';
import InputGroup from '../../components/InputGroup';
import Btn from '../../components/Btn';
import {showToast} from '../../helpers/ShowToast';
import {useSelector, useDispatch} from 'react-redux';
import {
  EnterDetailsOPTPRegistration,
  clearErrors,
} from '../../actions/userActions';

export default function Signup({navigation, route}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const contactNumber = route.params.contactNumber;
  const otp = route.params.otp;

  const dispatch = useDispatch();
  const {error, isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      showToast('success', 'User Registration Successful');
      navigation.reset({index: 1, routes: [{name: 'tabnav'}]});
    }

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated]);

  const signupHandler = () => {
    dispatch(EnterDetailsOPTPRegistration({name, email, contactNumber, otp}));
  };

  return (
    <View>
      <AuthHeader />
      <View style={AuthStyles.formContainer}>
        <Text style={AuthStyles.heading}>ENTER DETAILS</Text>
        <InputGroup
          label="Enter Name"
          placeholder="Your Name"
          value={name}
          onChange={val => setName(val)}
        />
        <InputGroup
          label="Enter Your Email"
          placeholder="yourmail@gmail.com"
          value={email}
          onChange={val => setEmail(val)}
          type="email-address"
        />
        <InputGroup
          label="Contact Number"
          value={contactNumber}
          editable={false}
        />
        <Btn onClick={signupHandler} label="SIGNUP" />
      </View>
    </View>
  );
}
