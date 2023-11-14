import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import HomeProducts from '../../components/Home/HomeProducts';
import {useNavigation} from '@react-navigation/native';
import HomeCategories from '../../components/Home/HomeCategories';
import Carousel from 'react-native-snap-carousel';
import Image1 from '../../images/banner_image1.jpg';
import Image2 from '../../images/banner_image2.jpg';
import Image3 from '../../images/banner_image3.jpg';
import Image4 from '../../images/banner_image4.jpeg';
import Image5 from '../../images/banner_image5.jpg';
import Image6 from '../../images/banner_image6.jpg';
import Image7 from '../../images/banner_image7.jpg';
import Image8 from '../../images/banner_image8.jpeg';
import Image9 from '../../images/banner_image9.jpg';
import {deviceWidth} from '../../helpers/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {showToast} from '../../helpers/ShowToast';
import {clearErrors, getAllCategories} from '../../actions/CategoryAction';
import HomeCategoryProducts from '../../components/Home/HomeCategoryProducts';

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const {error, categories} = useSelector(state => state.categories);

  useEffect(() => {
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    dispatch(getAllCategories());
  }, [error, dispatch]);

  const items = {
    activeIndex: activeIndex,
    carouselItems: [
      {
        url: Image1,
        category: 'dairy',
      },
      {
        url: Image2,
        category: 'grocery',
      },
      {
        url: Image3,
        category: 'grocery',
      },
      {
        url: Image4,
        category: 'fruits',
      },
      {
        url: Image5,
        category: 'winter',
      },
    ],
  };

  const items2 = {
    activeIndex: activeIndex,
    carouselItems: [
      {
        url: Image6,
        category: 'fruits',
      },
      {
        url: Image7,
        category: 'chocolates',
      },
      {
        url: Image8,
        category: 'household',
      },
      {
        url: Image9,
        category: 'healthy',
      },
    ],
  };

  const renderItems = ({item, index}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('tabnav', {
          screen: 'categorytab',
          params: {
            screen: 'categoryproducts',
            params: {category: item.category},
          },
        })
      }
      style={{
        borderRadius: 5,
        marginTop: 10,
      }}>
      <Image
        source={item.url}
        style={{height: 150, width: 301, borderRadius: 5}}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 10}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Carousel
            layout={'default'}
            data={items.carouselItems}
            sliderWidth={400}
            itemWidth={deviceWidth * 0.82}
            renderItem={renderItems}
            loop
            autoplay
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View>
        <HomeProducts
          label="Trending Products"
          category="isTrending"
          onClick={() => navigation.navigate('trendingproducts')}
        />
        <HomeCategories />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 16,
          }}>
          <Carousel
            layout={'default'}
            data={items2.carouselItems}
            sliderWidth={400}
            itemWidth={deviceWidth * 0.82}
            renderItem={renderItems}
            loop
            autoplay
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View>
        <HomeProducts
          label="Favourite Products"
          category="isFavourite"
          onClick={() => navigation.navigate('favouriteproducts')}
        />
        <HomeProducts
          label="Most Ordered Products"
          category="mostOrdered"
          onClick={() => navigation.navigate('mostorderedproducts')}
        />
        {categories &&
          categories
            .slice(0, 1)
            .map((category, index) => (
              <HomeCategoryProducts
                categoryId={category._id}
                categoryName={category.name}
                label={category.name}
                index={index}
              />
            ))}
        <HomeProducts
          hideSeeAll={true}
          label="Must Try this week"
          category="suggested"
        />
      </ScrollView>
    </View>
  );
}
