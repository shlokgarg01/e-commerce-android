import {Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ProductStyles from '../Products/ProductStyles';

export default function CategoryCard({category}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.replace('tabnav', {
          screen: 'categorytab',
          params: {
            screen: 'categoryproducts',
            params: {categoryId: category._id},
          },
        })
      }
      style={ProductStyles.productCardContainer}>
      <Image
        source={{uri: category.image.url}}
        style={ProductStyles.productCardImage}
      />
      <Text
        style={[
          ProductStyles.productCardName,
          {textAlign: 'center', paddingTop: 5},
        ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
