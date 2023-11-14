import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import AccountTabs from '../../components/Account/AccountTabs';
import Colors from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import AddressesTab from '../../components/Account/AddressesTab';
import {useDispatch, useSelector} from 'react-redux';
import {myAddresses, clearErrors} from '../../actions/AddressActions';
import Loader from '../../components/Loader';
import AccountStyles from './AccountStyles';
import {Capitalize} from '../../helpers/StringMethods';

export default function SavedAddresses() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {addresses, error, loading} = useSelector(state => state.myAddresses);

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    dispatch(myAddresses());
  }, [error, dispatch]);

  return (
    <View>
      <AccountTabs
        title="Add Address"
        color={Colors.RED}
        showArrow={false}
        icon="plus-circle-outline"
        onClick={() =>
          navigation.replace('tabnav', {
            screen: 'accounttab',
            params: {screen: 'newaddress'},
          })
        }
      />
      <Text
        style={{marginHorizontal: 20, marginVertical: 10, fontWeight: '800'}}>
        SAVED ADDRESSES
      </Text>
      {loading ? (
        <Loader />
      ) : addresses.length === 0 ? (
        <Text style={AccountStyles.noSavedInfo}>No Saved Addresses</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={addresses}
          // keyExtractor={(item) => item}
          renderItem={({item}) => (
            <AddressesTab
              id={item._id}
              addressLabel={Capitalize(item.label)}
              address={`${item.address} ${item.city} ${item.pincode}`}
              address2={`${item.state}, ${item.country}`}
            />
          )}
        />
      )}
    </View>
  );
}
