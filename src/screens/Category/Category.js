import {ScrollView, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {showToast} from '../../helpers/ShowToast';
import {clearErrors, getAllCategories} from '../../actions/CategoryAction';
import Loader from '../../components/Loader';
import CategoryCard from '../../components/Category/CategoryCard';
import Styles from '../Styles';

export default function Category() {
  const dispatch = useDispatch();
  const {loading, error, categories} = useSelector(state => state.categories);

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
        </View>
      )}
    </>
  );
}
