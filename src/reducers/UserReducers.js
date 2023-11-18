import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_VIA_OTP_FAIL,
  LOGIN_VIA_OTP_REQUEST,
  LOGIN_VIA_OTP_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  SEND_LOGIN_OTP_FAIL,
  SEND_LOGIN_OTP_REQUEST,
  SEND_LOGIN_OTP_SUCCESS,
  SEND_SIGNUP_OTP_FAIL,
  SEND_SIGNUP_OTP_REQUEST,
  SEND_SIGNUP_OTP_SUCCESS,
  SIGNUP_VIA_OTP_FAIL,
  SIGNUP_VIA_OTP_REQUEST,
  SIGNUP_VIA_OTP_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  VERIFY_SIGNUP_VIA_OTP_FAIL,
  VERIFY_SIGNUP_VIA_OTP_REQUEST,
  VERIFY_SIGNUP_VIA_OTP_SUCCESS,
} from '../constants/UserConstants';

// Authentication - Login & Signup
export const userReducer = (state = {user: {}}, action) => {
  switch (action.type) {
    case LOGIN_VIA_OTP_REQUEST:
    case SEND_LOGIN_OTP_REQUEST:
    case SEND_SIGNUP_OTP_REQUEST:
    case SIGNUP_VIA_OTP_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case VERIFY_SIGNUP_VIA_OTP_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        isVerified: false,
      };

    case LOGIN_VIA_OTP_SUCCESS:
    case SIGNUP_VIA_OTP_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case VERIFY_SIGNUP_VIA_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isVerified: true,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case SEND_LOGIN_OTP_SUCCESS:
    case SEND_SIGNUP_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        otpSent: true,
      };

    case VERIFY_SIGNUP_VIA_OTP_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isVerified: false,
        error: action.payload,
      };
    case LOGIN_VIA_OTP_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case SIGNUP_VIA_OTP_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case SEND_LOGIN_OTP_FAIL:
    case SEND_SIGNUP_OTP_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        otpSent: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
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

// Update User Details
export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
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
