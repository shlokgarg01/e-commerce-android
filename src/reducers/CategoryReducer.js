import { ALL_CATEGORIES_FAIL, ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, CLEAR_ERRORS } from "../constants/CategoryConstants";

export const allCategoriesReducer = (state = {categories: []}, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return {
        loading: true,
      };
    case ALL_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case ALL_CATEGORIES_FAIL:
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