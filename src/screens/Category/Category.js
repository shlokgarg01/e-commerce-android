import {ScrollView, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {showToast} from '../../helpers/ShowToast';
import {clearErrors, getAllCategories} from '../../actions/CategoryAction';
import Loader from '../../components/Loader';
import CategoryCard from '../../components/Category/CategoryCard';
import Styles from '../Styles';
import ViewCart from '../../components/Cart/ViewCart';

export default function Category() {
  const dispatch = useDispatch();
  const {loading, error, categories} = useSelector(state => state.categories);
  const {cartItems} = useSelector(state => state.cart);

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    dispatch(getAllCategories());
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
              {categories.map(category => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </View>
          </ScrollView>
          {cartItems.length > 0 ? (
            <ViewCart
              quantity={cartItems.length}
              totalPrice={cartItems.reduce((sum, item) => {
                return sum + item.price * item.quantity;
              }, 0)}
            />
          ) : null}
        </View>
      )}
    </>
  );
}
