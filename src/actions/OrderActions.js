import {
  CLEAR_ERRORS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  PLACE_NEW_ORDER_FAIL,
  PLACE_NEW_ORDER_REQUEST,
  PLACE_NEW_ORDER_SUCCESS,
} from '../constants/OrderConstants';
import axiosInstance, { BASE_URL } from '../utils/Axios';

// get my orders
export const myOrders = () => async dispatch => {
  try {
    dispatch({type: MY_ORDERS_REQUEST});
    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/orders/me`);

    dispatch({type: MY_ORDERS_SUCCESS, payload: data.orders});
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Order
export const createOrder = order => async dispatch => {
  try {
    dispatch({type: PLACE_NEW_ORDER_REQUEST});

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axiosInstance.post(`${BASE_URL}/api/v1/order/new`, order, config);

    dispatch({type: PLACE_NEW_ORDER_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: PLACE_NEW_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Used to clear all the errors
export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
