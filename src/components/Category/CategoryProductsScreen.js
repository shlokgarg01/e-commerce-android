import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import ProductCard from '../Products/ProductCard';
import Styles from '../../screens/Styles';
import AccountStyles from '../../screens/Account/AccountStyles';
import {deviceWidth} from '../../helpers/Dimensions';
import Colors from '../../utils/Colors';

const CategoryProductsScreen = ({products}) => {
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [subCategoryWiseProducts, setSubCategoryWiseProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return (array || []).reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item.products,
      };
    }, initialValue);
  };

  useEffect(() => {
    const subCategoryProducts = convertArrayToObject(products, 'subCategory');
    setSubCategoryWiseProducts(subCategoryProducts);
    setSubCategories(Object.keys(subCategoryProducts));
    setProductsToDisplay(Object.values(subCategoryProducts)[0] || []);
  }, []);

  return (
    <View>
      <ScrollView
        style={{backgroundColor: Colors.WHITE}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {subCategories.map((subCategory, index) => (
          <TouchableOpacity
          key={index}
            style={{
              minWidth: 50,
              maxWidth: 80,
              marginHorizontal: 3,
              marginVertical: 5,
              borderRadius: 7,
              backgroundColor: index === activeIndex ? Colors.LIGHT_GRAY : null,
              paddingHorizontal: 5,
              paddingVertical: 7,
            }}
            onPress={() => {
              setProductsToDisplay(subCategoryWiseProducts[subCategory]);
              setActiveIndex(index);
            }}>
            {products.find(x => x.subCategory === subCategory) ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: products.find(x => x.subCategory === subCategory)
                      .subCategoryImage?.url,
                  }}
                  style={{height: 31, width: 31, borderRadius: 100}}
                />
                <Text style={{textAlign: 'center'}}>
                  {subCategory === 'undefined' ? 'All' : subCategory}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../images/logo.jpeg')}
                  style={{height: 31, width: 31, borderRadius: 100}}
                />
                <Text style={{textAlign: 'center'}}>
                  {subCategory === 'undefined' ? 'All' : subCategory}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{paddingBottom: 94, justifyContent: 'center'}]}>
        <View style={Styles.container}>
          {productsToDisplay.length === 0 ? (
            <Text
              style={[
                AccountStyles.noSavedInfo,
                {width: deviceWidth, marginLeft: -10},
              ]}>
              No Products found.
            </Text>
          ) : (
            productsToDisplay.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryProductsScreen;
