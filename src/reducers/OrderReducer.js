import {
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  PLACE_NEW_ORDER_REQUEST,
  PLACE_NEW_ORDER_SUCCESS,
  PLACE_NEW_ORDER_FAIL,
  RESET_NEW_ORDER,
} from '../constants/OrderConstants';

export const myOrdersReducer = (state = {orders: []}, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case RESET_NEW_ORDER:
      return {orders: []};
    default:
      return state;
  }
};

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_NEW_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PLACE_NEW_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case PLACE_NEW_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
