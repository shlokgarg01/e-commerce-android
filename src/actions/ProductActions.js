import axiosInstance from '../utils/Axios';
import {
  TRENDNIG_PRODUCTS_REQUEST,
  TRENDNIG_PRODUCTS_FAIL,
  TRENDNIG_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  FAVOURITE_PRODUCTS_REQUEST,
  FAVOURITE_PRODUCTS_SUCCESS,
  FAVOURITE_PRODUCTS_FAIL,
  MOST_ORDERED_PRODUCTS_REQUEST,
  MOST_ORDERED_PRODUCTS_SUCCESS,
  MOST_ORDERED_PRODUCTS_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  SUGGESTED_PRODUCTS_REQUEST,
  SUGGESTED_PRODUCTS_SUCCESS,
  SUGGESTED_PRODUCTS_FAIL,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_BY_CATEGORY_SUCCESS,
  PRODUCT_BY_CATEGORY_FAIL,
} from '../constants/ProductConstants';

export const getProducts =
  (keyword = '', category) =>
  // (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async dispatch => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      let link = `/api/v1/products?keyword=${keyword}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&category=${category}`;
      }

      const {data} = await axiosInstance(link);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response,
      });
    }
  };

export const getCategoryProducts = categoryId => async dispatch => {
  try {
    dispatch({
      type: PRODUCT_BY_CATEGORY_REQUEST,
    });

    const {data} = await axiosInstance(
      `/api/v1/product/category/${categoryId}`,
    );
    dispatch({
      type: PRODUCT_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_BY_CATEGORY_FAIL,
      payload: error.response,
    });
  }
};

//  get trending products
export const getTrendingProducts = () => async dispatch => {
  try {
    dispatch({type: TRENDNIG_PRODUCTS_REQUEST});
    const {data} = await axiosInstance.get(`/api/v1/products/trending`);

    dispatch({type: TRENDNIG_PRODUCTS_SUCCESS, payload: data.products});
  } catch (error) {
    dispatch({
      type: TRENDNIG_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//  get favourite products
export const getFavouriteProducts = () => async dispatch => {
  try {
    dispatch({type: FAVOURITE_PRODUCTS_REQUEST});
    const {data} = await axiosInstance.get(`/api/v1/products/favourite`);

    dispatch({type: FAVOURITE_PRODUCTS_SUCCESS, payload: data.products});
  } catch (error) {
    dispatch({
      type: FAVOURITE_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//  get most ordered products
export const getMostOrderedProducts = () => async dispatch => {
  try {
    dispatch({type: MOST_ORDERED_PRODUCTS_REQUEST});
    const {data} = await axiosInstance.get(`/api/v1/products/mostOrdered`);

    dispatch({type: MOST_ORDERED_PRODUCTS_SUCCESS, payload: data.products});
  } catch (error) {
    dispatch({
      type: MOST_ORDERED_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//  get suggested products
export const getsuggestedProducts = () => async dispatch => {
  try {
    dispatch({type: SUGGESTED_PRODUCTS_REQUEST});
    const {data} = await axiosInstance.get(`/api/v1/products/suggested`);

    dispatch({type: SUGGESTED_PRODUCTS_SUCCESS, payload: data.products});
  } catch (error) {
    dispatch({
      type: SUGGESTED_PRODUCTS_FAIL,
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
