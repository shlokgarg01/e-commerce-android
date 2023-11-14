import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import AccountTabs from '../../components/Account/AccountTabs';
import Colors from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {myAddresses, clearErrors} from '../../actions/AddressActions';
import Loader from '../../components/Loader';
import AccountStyles from '../Account/AccountStyles';
import {Capitalize} from '../../helpers/StringMethods';
import {showToast} from '../../helpers/ShowToast';
import AccountComponentStyles from '../../components/Account/AccountComponentStyles';
import {useState} from 'react';
import Btn from '../../components/Btn';

export default function Checkout(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {orderPrices, orderItems} = props.route.params;
  const {addresses, error, loading} = useSelector(state => state.myAddresses);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    dispatch(myAddresses());
  }, [error, dispatch]);

  const proceedForConfirmation = () => {
    navigation.navigate('tabnav', {
      screen: 'carttab',
      params: {
        screen: 'confirmorder',
        params: {
          orderPrices,
          orderItems,
          shippingAddress: selectedAddress,
          address: addresses.find(address => address._id === selectedAddress)
        },
      },
    });
  };

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
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={addresses}
            // keyExtractor={(item) => item}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => setSelectedAddress(item._id)}
                style={[
                  AccountComponentStyles.container,
                  {alignItems: 'flex-start', justifyContent: 'flex-start'},
                ]}>
                {/* Radio Button */}
                <View
                  style={{
                    borderWidth: item._id === selectedAddress ? 2 : 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: Colors.PRIMARY,
                    padding: 2,
                    marginTop: 5,
                    marginRight: 10,
                    borderRadius: 100,
                    height: 16,
                    width: 16,
                    backgroundColor: Colors.WHITE,
                  }}>
                  <View
                    style={{
                      backgroundColor:
                        item._id === selectedAddress
                          ? Colors.PRIMARY
                          : Colors.WHITE,
                      borderRadius: 100,
                      height: 10,
                      width: 10,
                    }}
                  />
                </View>
                <View style={{width: 190}}>
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    {/* {Capitalize(item.label)} */}
                    {item.label}
                  </Text>
                  <Text numberOfLines={2} ellipsizeMode="tail">
                    {`${item.address} ${item.city} ${item.pincode}`}
                  </Text>
                  <Text
                    style={{
                      color: Colors.GRAY,
                    }}>{`${item.state}, ${item.country}`}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <View style={{marginHorizontal: 20}}>
            <Btn
              label="Proceed to Payment"
              onClick={proceedForConfirmation}
              disabled={selectedAddress === null}
            />
          </View>
        </>
      )}
    </View>
  );
}
