import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import HomeComponentStyles from './HomeComponentStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearErrors,
  getFavouriteProducts,
  getMostOrderedProducts,
  getTrendingProducts,
  getsuggestedProducts,
} from '../../actions/ProductActions';
import Loader from '../Loader';
import ProductCard from '../Products/ProductCard';

export default function HomeProducts({label, category, onClick, hideSeeAll}) {
  const dispatch = useDispatch();
  const {
    error: trendingError,
    loading: trendingLoading,
    products: trendingProducts,
  } = useSelector(state => state.trendingProducts);
  const {
    error: favourtieError,
    loading: favouriteLoading,
    products: favouriteProducts,
  } = useSelector(state => state.favouriteProducts);
  const {
    error: mostOrderedError,
    loading: mostOrderedLoading,
    products: mostOrderedProducts,
  } = useSelector(state => state.mostOrderedProducts);
  const {
    error: suggestedError,
    loading: suggestedLoading,
    products: suggestedProducts,
  } = useSelector(state => state.suggestedProducts);

  useEffect(() => {
    if (trendingError) {
      showToast('error', trendingError);
      dispatch(clearErrors());
    }

    if (mostOrderedError) {
      showToast('error', mostOrderedError);
      dispatch(clearErrors());
    }

    if (favourtieError) {
      showToast('error', favourtieError);
      dispatch(clearErrors());
    }

    if (suggestedError) {
      showToast('error', suggestedError);
      dispatch(clearErrors());
    }

    if (category === 'isTrending') {
      dispatch(getTrendingProducts());
    } else if (category === 'isFavourite') {
      dispatch(getFavouriteProducts());
    } else if (category === 'mostOrdered') {
      dispatch(getMostOrderedProducts());
    } else if (category === 'suggested') {
      dispatch(getsuggestedProducts());
    }
  }, [
    trendingError,
    favourtieError,
    mostOrderedError,
    suggestedError,
    dispatch,
  ]);

  return (
    <>
      {trendingLoading || mostOrderedLoading || favouriteLoading ? (
        <Loader />
      ) : (
        <View style={HomeComponentStyles.homeProductsContainer}>
          <View style={HomeComponentStyles.homeProductsHeadingContainer}>
            <Text style={HomeComponentStyles.homeProductCategory}>{label}</Text>
            {hideSeeAll === true ? null : (
              <TouchableOpacity onPress={onClick}>
                <Text style={HomeComponentStyles.homeProductSeeAll}>
                  See All
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicatol={false}
            data={
              category === 'isTrending'
                ? trendingProducts?.slice(0, 7)
                : category === 'isFavourite'
                ? favouriteProducts?.slice(0, 7)
                : category === 'mostOrdered'
                ? mostOrderedProducts?.slice(0, 7)
                : category === 'suggested'
                ? suggestedProducts
                : []
            }
            renderItem={({item}) => <ProductCard product={item} />}
          />
        </View>
      )}
    </>
  );
}
