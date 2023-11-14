import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../helpers/ShowToast';
import {
  clearErrors,
  getCategoryProducts,
  getProducts,
} from '../../actions/ProductActions';
import Loader from '../../components/Loader';
import Styles from '../Styles';
import ProductCard from '../../components/Products/ProductCard';
import AccountStyles from '../Account/AccountStyles';
import HomeComponentStyles from '../../components/Home/HomeComponentStyles';
import {deviceWidth} from '../../helpers/Dimensions';

export default function CategoryProducts(props) {
  const category = props.route.params.category || undefined;
  const categoryId = props.route.params.categoryId || null;
  const searchTerm = props.route.params.searchTerm || '';

  const dispatch = useDispatch();
  let result;

  if (searchTerm.length > 0 || category) {
    result = useSelector(state => state.products);
  } else {
    result = useSelector(state => state.productsByCategory);
  }
  let loading = result.loading,
    error = result.error,
    products = result.products;

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    category?.length > 0
      ? dispatch(getProducts(searchTerm, category))
      : dispatch(getCategoryProducts(categoryId));
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
          {products === undefined ||
          products === null ||
          products?.length === 0 ? (
            <Text style={AccountStyles.noSavedInfo}>No Products found.</Text>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={Styles.container}>
                {searchTerm.length > 0 || category?.length > 0 ? (
                  products.map(product => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))
                ) : (
                  products.map(productCategory => (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 16,
                        width: deviceWidth - 20,
                      }}>
                      {
                        <>
                          <View
                            style={
                              HomeComponentStyles.homeProductsHeadingContainer
                            }>
                            <Text
                              style={HomeComponentStyles.homeProductCategory}>
                              {productCategory.subCategory}
                            </Text>
                            {/* <TouchableOpacity
                            onPress={() =>
                              navigation.replace('tabnav', {
                                screen: 'categorytab',
                                params: {screen: 'category'},
                              })
                            }>
                            <Text style={HomeComponentStyles.homeProductSeeAll}>
                              See All
                            </Text>
                          </TouchableOpacity> */}
                          </View>
                          <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            {productCategory.products.map(product => (
                              <ProductCard
                                key={product._id}
                                product={product}
                              />
                            ))}
                          </ScrollView>
                        </>
                      }
                    </View>
                  ))
                )}
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
}
