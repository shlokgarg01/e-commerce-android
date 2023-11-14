import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountComponentStyles from './AccountComponentStyles';
import Colors from '../../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, deleteAddress} from '../../actions/AddressActions';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../helpers/ShowToast';
import {DELETE_ADDRESS_RESET} from '../../constants/AddressConstants';

export default function AddressesTab({
  id,
  addressLabel,
  address,
  address2,
  showEditOptions,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {error, isDeleted} = useSelector(state => state.address);

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      showToast('success', 'Address Deletd Succesfully');
      navigation.replace('tabnav', {screen: 'accounttab'});
      dispatch({type: DELETE_ADDRESS_RESET});
    }
  }, [error, isDeleted]);

  const deleteAddressHandler = () => {
    dispatch(deleteAddress(id));
  };
  return (
    <View
      style={[AccountComponentStyles.container, {alignItems: 'flex-start'}]}>
      <Icon
        name="map-marker-outline"
        size={34}
        style={{color: Colors.PRIMARY}}
      />
      <View style={{width: 190}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{addressLabel}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail">
          {address}
        </Text>
        <Text style={{color: Colors.GRAY}}>{address2}</Text>
      </View>
      {showEditOptions === false ? null : (
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('tabnav', {
                screen: 'accounttab',
                params: {screen: 'updateaddress', params: {id}},
              })
            }>
            <Icon name="pencil-outline" size={25} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAddressHandler}>
            <Icon name="delete-outline" size={25} color={Colors.RED} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
