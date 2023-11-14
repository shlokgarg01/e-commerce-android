import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import HomeComponentStyles from './HomeComponentStyles';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, getAllCategories} from '../../actions/CategoryAction';
import Loader from '../Loader';
import CategoryCard from '../../components/Category/CategoryCard';
import {useNavigation} from '@react-navigation/native';

export default function HomeCategories() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {error, categories, loading} = useSelector(state => state.categories);

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
        <View style={HomeComponentStyles.homeProductsContainer}>
          <View style={HomeComponentStyles.homeProductsHeadingContainer}>
            <Text style={HomeComponentStyles.homeProductCategory}>
              Explore By Categories
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.replace('tabnav', {
                  screen: 'categorytab',
                  params: {screen: 'category'},
                })
              }>
              <Text style={HomeComponentStyles.homeProductSeeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View
              style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {categories.slice(0, 8).map(category => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
