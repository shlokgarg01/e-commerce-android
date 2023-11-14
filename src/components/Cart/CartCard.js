import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {addItemsToCart, removeItemsFromCart} from '../../actions/CartAction';
import {useState} from 'react';
import Colors from '../../utils/Colors';
import { showToast } from '../../helpers/ShowToast';

export default function CartCard(props) {
  const {product, showEditOptions} = props
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const deleteItemHandler = () => {
    dispatch(removeItemsFromCart(product.product));
  };

  const increaseQuanity = () => {
    if (product.stock <= quantity) {
      showToast(
        'info',
        `We only have ${product.stock} units left for ${product.name}`,
      );
      return;
    }

    setQuantity(quantity + 1);
    dispatch(addItemsToCart(product.product, quantity + 1));
  };

  const decreaseQuanity = () => {
    setQuantity(quantity - 1);
    dispatch(addItemsToCart(product.product, quantity - 1));
  };

  return (
    <View
      style={{
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 7,
      }}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={{uri: product.image}}
          style={{height: 55, width: 55, borderRadius: 100, marginRight: 16}}
        />
        <View>
          <Text style={{fontSize: 19, fontWeight: '600'}}>{product.name}</Text>

          {/* Add To Cart Button */}
          {
            showEditOptions === false ? null : <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 7,
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
              <Text style={{color: Colors.WHITE, paddingHorizontal: 4, fontSize: 17}}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.PRIMARY,
                textAlign: 'center',
                width: 25,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: Colors.PRIMARY,
                fontSize: 17
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
              <Text style={{color: Colors.WHITE, paddingHorizontal: 4, fontSize: 17}}>+</Text>
            </TouchableOpacity>
          </View>
          }
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingVertical: 4,
        }}>
        <Text style={{fontSize: 17}}>₹ {product.price * product.quantity}</Text>
        {
          showEditOptions === false ? null : <TouchableOpacity onPress={deleteItemHandler}>
          <Icon name="delete-outline" size={19} color="red" />
        </TouchableOpacity>
        }
      </View>
    </View>
  );
}
