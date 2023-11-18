import axiosInstance, { BASE_URL } from '../utils/Axios';
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
  UPDATE_USER_SUCCESS,
  VERIFY_SIGNUP_VIA_OTP_FAIL,
  VERIFY_SIGNUP_VIA_OTP_REQUEST,
  VERIFY_SIGNUP_VIA_OTP_SUCCESS,
} from '../constants/UserConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// send OTP FOR LOGIN
export const sendOPTPLogin = contactNumber => async dispatch => {
  try {
    dispatch({type: SEND_LOGIN_OTP_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/login/otp/send`,
      {contactNumber},
      config,
    );

    dispatch({type: SEND_LOGIN_OTP_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: SEND_LOGIN_OTP_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Verify OTP & Login
export const loginViaOTP = (contactNumber, otp) => async dispatch => {
  try {
    dispatch({type: LOGIN_VIA_OTP_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/login/otp/verify`,
      {contactNumber, otp},
      config,
    );
    await AsyncStorage.setItem('token', JSON.stringify(data.token));

    dispatch({type: LOGIN_VIA_OTP_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: LOGIN_VIA_OTP_FAIL,
      payload: error.response.data.message,
    });
  }
};

// send OTP FOR Registration
export const sendOPTPRegistration = contactNumber => async dispatch => {
  try {
    dispatch({type: SEND_SIGNUP_OTP_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/register/otp/send`,
      {contactNumber},
      config,
    );

    dispatch({type: SEND_SIGNUP_OTP_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: SEND_SIGNUP_OTP_FAIL,
      payload: error.response.data.message,
    });
  }
};

// verify OTP FOR Registration
export const verifyOPTPRegistration =
  (contactNumber, otp) => async dispatch => {
    try {
      dispatch({type: VERIFY_SIGNUP_VIA_OTP_REQUEST});

      const config = {headers: {'Content-Type': 'application/json'}};
      const {data} = await axiosInstance.post(
        `${BASE_URL}/api/v1/register/otp/verify`,
        {contactNumber, otp},
        config,
      );

      dispatch({type: VERIFY_SIGNUP_VIA_OTP_SUCCESS, payload: data.user});
    } catch (error) {
      dispatch({
        type: VERIFY_SIGNUP_VIA_OTP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Enter details for registration via OTP
export const EnterDetailsOPTPRegistration =
  registrationData => async dispatch => {
    try {
      dispatch({type: SIGNUP_VIA_OTP_REQUEST});

      const config = {headers: {'Content-Type': 'application/json'}};
      const {data} = await axiosInstance.post(
        `${BASE_URL}/api/v1/register/otp`,
        registrationData,
        config,
      );
      await AsyncStorage.setItem('token', JSON.stringify(data.token));

      dispatch({type: SIGNUP_VIA_OTP_SUCCESS, payload: data.user});
    } catch (error) {
      dispatch({
        type: SIGNUP_VIA_OTP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// logout user
export const logout = () => async dispatch => {
  try {
    await axiosInstance.get(`${BASE_URL}/api/v1/logout`);
    await AsyncStorage.clear()
    dispatch({type: LOGOUT_SUCCESS});
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// load existing user
export const loadUser = () => async dispatch => {
  try {
    dispatch({type: LOAD_USER_REQUEST});
    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/me`, {});

    dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update User Details
export const updateUserDetails = userData => async dispatch => {
  try {
    dispatch({type: UPDATE_USER_REQUEST});

    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.put(
      `${BASE_URL}/api/v1/me/update`,
      userData,
      config,
    );

    dispatch({type: UPDATE_USER_SUCCESS, payload: data.success});
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
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
