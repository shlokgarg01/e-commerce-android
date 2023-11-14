import {FlatList, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, myOrders} from '../../actions/OrderActions';
import Loader from '../../components/Loader';
import MyOrdersTab from '../../components/Account/MyOrdersTab';
import AccountStyles from './AccountStyles';
import {showToast} from '../../helpers/ShowToast'

export default function MyOrders({navigation}) {
  const dispatch = useDispatch();
  const {orders, error, loading} = useSelector(state => state.myOrders);

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : orders?.length === 0 ? (
        <Text style={AccountStyles.noSavedInfo}>No Orders Yet</Text>
      ) : (
        <FlatList
          data={orders}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <MyOrdersTab
              id={item._id}
              createdAt={item.createdAt}
              items={item.orderItems}
              status={item.orderStatus}
              amount={item.totalPrice}
              onClick={() => navigation.navigate('orderdetails', {order: item})}
            />
          )}
        />
      )}
    </>
  );
}
