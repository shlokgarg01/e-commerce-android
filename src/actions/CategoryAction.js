import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/CategoryConstants';
import axiosInstance, { BASE_URL } from '../utils/Axios';

export const getAllCategories = () => async dispatch => {
  try {
    dispatch({type: ALL_CATEGORIES_REQUEST});
    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/categories`);

    dispatch({type: ALL_CATEGORIES_SUCCESS, payload: data.categories});
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
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
