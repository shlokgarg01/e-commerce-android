import {
  CLEAR_ERRORS,
  VALIDATE_COUPON_FAIL,
  VALIDATE_COUPON_REQUEST,
  VALIDATE_COUPON_SUCCESS,
} from '../constants/couponConstants';
import axiosInstance, { BASE_URL } from '../utils/Axios';

// validate coupon
export const validateCoupon = couponData => async dispatch => {
  try {
    dispatch({type: VALIDATE_COUPON_REQUEST});

    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/coupon/validate`,
      couponData,
      config,
    );

    dispatch({type: VALIDATE_COUPON_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: VALIDATE_COUPON_FAIL,
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
