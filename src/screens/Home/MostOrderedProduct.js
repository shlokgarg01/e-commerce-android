import {View, ScrollView} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {showToast} from '../../helpers/ShowToast';
import {clearErrors, getTrendingProducts} from '../../actions/ProductActions';
import Loader from '../../components/Loader';
import ProductCard from '../../components/Products/ProductCard';
import Styles from '../Styles';

export default function MostOrderedProducts() {
  const dispatch = useDispatch();
  const {error, loading, products} = useSelector(
    state => state.mostOrderedProducts,
  );

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    dispatch(getTrendingProducts());
  }, [dispatch, error]);

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
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
          </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
