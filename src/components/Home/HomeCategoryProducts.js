import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import HomeComponentStyles from './HomeComponentStyles';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../Loader';
import ProductCard from '../Products/ProductCard';
import {clearErrors, getProducts} from '../../actions/ProductActions';
import {useNavigation} from '@react-navigation/native';

export default function HomeCategoryProducts({label, categoryId, categoryName}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, error, products} = useSelector(state => state.products);

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    dispatch(getProducts('', categoryName));
  }, [categoryId, error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={HomeComponentStyles.homeProductsContainer}>
          <View style={HomeComponentStyles.homeProductsHeadingContainer}>
            <Text style={HomeComponentStyles.homeProductCategory}>{label}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.replace('tabnav', {
                  screen: 'categorytab',
                  params: {
                    screen: 'categoryproducts',
                    params: {categoryId},
                  },
                })
              }>
              <Text style={HomeComponentStyles.homeProductSeeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicatol={false}
            data={products?.slice(0, 10)}
            renderItem={({item}) => <ProductCard product={item} />}
          />
        </View>
      )}
    </>
  );
}
