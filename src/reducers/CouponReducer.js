import {
  CLEAR_ERRORS,
  RESET_COUPON,
  VALIDATE_COUPON_FAIL,
  VALIDATE_COUPON_REQUEST,
  VALIDATE_COUPON_SUCCESS,
} from '../constants/couponConstants';

export const validateCouponReducer = (state = {appliedCoupon: {}}, action) => {
  switch (action.type) {
    case VALIDATE_COUPON_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case VALIDATE_COUPON_SUCCESS:
      return {
        loading: false,
        isValidated: true,
        coupon: action.payload.coupon,
        discount: action.payload.discount,
        finalPrice: action.payload.finalPrice,
      };
    case VALIDATE_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        isValidated: false,
        error: action.payload,
        coupon: undefined,
        discount: 0,
        finalPrice: undefined,
      };
    case RESET_COUPON:
      return {appliedCoupon: {}};
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
