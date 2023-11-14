import {ADD_TO_CART, REMOVE_CART_ITEM} from '../constants/CartConstants';
import {setValue} from '../helpers/LocalStorage';
import axiosInstance from '../utils/Axios';

// add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const {data} = await axiosInstance.get(`/api/v1/product/${id}`);

  if (quantity === 0) {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  } else {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.finalPrice,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      },
    });
  }

  await setValue('cartItems', getState().cart.cartItems);
};

// remove from cart
export const removeItemsFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  await setValue('cartItems', getState().cart.cartItems);
};
