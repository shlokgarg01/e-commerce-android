import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import HomeStyles from './HomeStyles';
import {Rating} from 'react-native-ratings';
import Colors from '../../utils/Colors';
import ComponentStyles from '../../components/ComponentStyles';
import {useDispatch, useSelector} from 'react-redux';
import {addItemsToCart} from '../../actions/CartAction';
import {showToast} from '../../helpers/ShowToast';
import {useEffect} from 'react';
import HomeComponentStyles from '../../components/Home/HomeComponentStyles';
import ProductCard from '../../components/Products/ProductCard';
import {getsuggestedProducts} from '../../actions/ProductActions';
import Loader from '../../components/Loader';

export default function ProductDetails(props) {
  const dispatch = useDispatch();
  const product = props.route.params.product;
  const [quantity, setQuantity] = useState(0);
  const {products, loading, error} = useSelector(
    state => state.suggestedProducts,
  );

  useEffect(() => {
    setQuantity(0);
    if (error) {
      showToast('error', error);
    }

    dispatch(getsuggestedProducts());
  }, [product, dispatch, error]);

  const increaseQuanity = () => {
    if (product.stock <= quantity) {
      showToast(
        'info',
        `We only have ${product.stock} units left for ${product.name}`,
      );
      return;
    }

    setQuantity(quantity + 1);
    dispatch(addItemsToCart(product._id, quantity + 1));
    showToast('success', 'Item Added');
  };

  const decreaseQuanity = () => {
    setQuantity(quantity - 1);
    dispatch(addItemsToCart(product._id, quantity - 1));
    showToast('success', 'Cart Updated');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={HomeStyles.productDetailsContainer}>
      <Image
        source={{uri: product.images[0].url}}
        style={HomeStyles.productDetailsImage}
      />
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <Text style={HomeStyles.productDetailsHeading}>{product.name}</Text>
        {/* <View style={HomeStyles.productDetailsSubContainer}>
          <Text style={HomeStyles.productDetailsmutedText}>Rating</Text>
          <Rating
            ratingCount={5}
            jumpValue={0.5}
            fractions={1}
            startingValue={product.ratings}
            readonly
            imageSize={16}
            ratingBackgroundColor="green"
            tintColor="#f2f0f0"
            ratingColor="black"
          />
        </View> */}
        <Text
          style={{
            color: product.stock === 0 ? Colors.RED : Colors.DARK_GREEN,
            fontSize: 17,
            fontWeight: '700',
            marginBottom: 5,
          }}>
          {product.stock === 0 ? 'Out Of Stock' : 'In Stock'}
        </Text>
        <Text style={HomeStyles.productDetailsSubHeading}>Produt Details</Text>
        <Text style={HomeStyles.productDetailsDescription}>
          {product.description}
        </Text>

        {/* Add To Cart */}
        {quantity === 0 ? (
          <TouchableOpacity
            onPress={increaseQuanity}
            style={ComponentStyles.btnContainer}>
            <Text style={ComponentStyles.btnLabel}>Add To Cart</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginTop: 20,
              width: '100%',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={decreaseQuanity}
              style={{
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                borderColor: Colors.PRIMARY,
                borderWidth: 1,
                backgroundColor: Colors.PRIMARY,
              }}>
              <Text
                style={{
                  color: Colors.WHITE,
                  paddingHorizontal: 25,
                  fontSize: 16,
                  paddingVertical: 4,
                }}>
                -
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.PRIMARY,
                textAlign: 'center',
                width: '64%',
                fontSize: 16,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: Colors.PRIMARY,
                paddingVertical: 4,
              }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={increaseQuanity}
              style={{
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                borderColor: Colors.PRIMARY,
                borderWidth: 1,
                backgroundColor: Colors.PRIMARY,
              }}>
              <Text
                style={{
                  color: Colors.WHITE,
                  paddingHorizontal: 25,
                  fontSize: 16,
                  paddingVertical: 4,
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Suggested Products */}
      <View style={{marginVertical: 10}}>
        {loading ? (
          <Loader />
        ) : (
          <View style={HomeComponentStyles.homeProductsContainer}>
            <View style={HomeComponentStyles.homeProductsHeadingContainer}>
              <Text style={HomeComponentStyles.homeProductCategory}>
                Products you may like
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicatol={false}
              data={products}
              renderItem={({item}) => <ProductCard product={item} />}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
