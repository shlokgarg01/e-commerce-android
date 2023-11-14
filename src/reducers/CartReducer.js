import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  RESET_CART,
} from '../constants/CartConstants';

export const cartReducer = (state = {cartItems: []}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemInCart = state.cartItems.find(
        i => i.product === item.product,
      );

      if (isItemInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i.product == isItemInCart.product ? item : i,
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.product !== action.payload),
      };
    case RESET_CART:
      return {cartItems: []};
    default:
      return state;
  }
};
