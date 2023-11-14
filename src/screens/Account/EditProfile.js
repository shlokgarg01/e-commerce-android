import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import InputGroup from '../../components/InputGroup';
import {
  clearErrors,
  loadUser,
  updateUserDetails,
} from '../../actions/userActions';
import {showToast} from '../../helpers/ShowToast';
import AccountStyles from './AccountStyles';
import Btn from '../../components/Btn';
import Loader from '../../components/Loader';
import {UPDATE_USER_RESET} from '../../constants/UserConstants';

export default function EditProfile({navigation}) {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {loading: updateLoading, isUpdated, error} = useSelector(
    state => state.profile,
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setContactNumber(user.contactNumber);
    } else {
      dispatch(loadUser());
    }

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      showToast('success', 'Details Updated');
      navigation.push('tabnav', {screen: 'accounttab'})
      dispatch({type: UPDATE_USER_RESET});
    }
  }, [dispatch, error, user, isUpdated]);

  const updateUserDetailshandler = () => {
    dispatch(updateUserDetails({name, email, contactNumber}));
  };

  return (
    <>
      {updateLoading ? (
        <Loader />
      ) : (
        <View style={AccountStyles.profileContainer}>
          <InputGroup
            label="Name"
            placeholder="Your Name"
            value={name}
            onChange={val => setName(val)}
          />
          <InputGroup
            label="Email"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={val => setEmail(val)}
            type="email-address"
          />
          <InputGroup
            label="Contact Number"
            placeholder="9999999999"
            value={contactNumber}
            editable={false}
          />
          <Btn label="Update" onClick={updateUserDetailshandler} />
        </View>
      )}
    </>
  );
}
