import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  FAVOURITE_PRODUCTS_FAIL,
  FAVOURITE_PRODUCTS_REQUEST,
  FAVOURITE_PRODUCTS_SUCCESS,
  MOST_ORDERED_PRODUCTS_FAIL,
  MOST_ORDERED_PRODUCTS_REQUEST,
  MOST_ORDERED_PRODUCTS_SUCCESS,
  PRODUCT_BY_CATEGORY_FAIL,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_BY_CATEGORY_SUCCESS,
  SUGGESTED_PRODUCTS_FAIL,
  SUGGESTED_PRODUCTS_REQUEST,
  SUGGESTED_PRODUCTS_SUCCESS,
  TRENDNIG_PRODUCTS_FAIL,
  TRENDNIG_PRODUCTS_REQUEST,
  TRENDNIG_PRODUCTS_SUCCESS,
} from '../constants/ProductConstants';

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultsPerPage: action.payload.resultsPerPage,
      };
    case ALL_PRODUCT_FAIL:
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

export const productsByCategoryReducer = (state = { productsByCategory: [] }, action) => {
  switch (action.type) {
    case PRODUCT_BY_CATEGORY_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_BY_CATEGORY_SUCCESS:
      return {
        loading: false,
        products: action.payload.products
      };
    case PRODUCT_BY_CATEGORY_FAIL:
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

export const trendingProductsReducer = (state = {trendingProducts: []}, action) => {
  switch (action.type) {
    case TRENDNIG_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case TRENDNIG_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case TRENDNIG_PRODUCTS_FAIL:
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
    default:
      return state;
  }
};

export const favouriteProductsReducer = (state = {favouriteProducts: []}, action) => {
  switch (action.type) {
    case FAVOURITE_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case FAVOURITE_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case FAVOURITE_PRODUCTS_FAIL:
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
    default:
      return state;
  }
};

export const mostOrderedProductsReducer = (state = {mostOrderedProducts: []}, action) => {
  switch (action.type) {
    case MOST_ORDERED_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case MOST_ORDERED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case MOST_ORDERED_PRODUCTS_FAIL:
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
    default:
      return state;
  }
};

export const suggestedProductsReducer = (state = {suggestedProducts: []}, action) => {
  switch (action.type) {
    case SUGGESTED_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case SUGGESTED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case SUGGESTED_PRODUCTS_FAIL:
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
    default:
      return state;
  }
};