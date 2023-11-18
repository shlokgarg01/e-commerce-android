import {
  ADDRESS_DETAILS_FAIL,
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  MY_ADDRESSES_FAIL,
  MY_ADDRESSES_REQUEST,
  MY_ADDRESSES_SUCCESS,
  NEW_ADDRESS_FAIL,
  NEW_ADDRESS_REQUEST,
  NEW_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
} from '../constants/AddressConstants';
import axiosInstance, { BASE_URL } from '../utils/Axios';

// get my addresses
export const myAddresses = () => async dispatch => {
  try {
    dispatch({type: MY_ADDRESSES_REQUEST});
    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/address/me`);

    dispatch({type: MY_ADDRESSES_SUCCESS, payload: data.addresses});
  } catch (error) {
    dispatch({
      type: MY_ADDRESSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Address Details
export const getAddressDetails = id => async dispatch => {
  try {
    dispatch({
      type: ADDRESS_DETAILS_REQUEST,
    });

    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/address/${id}`);
    dispatch({
      type: ADDRESS_DETAILS_SUCCESS,
      payload: data.address,
    });
  } catch (error) {
    dispatch({
      type: ADDRESS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create new address
export const createAddress = addressData => async dispatch => {
  try {
    dispatch({
      type: NEW_ADDRESS_REQUEST,
    });

    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/address/new`,
      addressData,
      config,
    );
    dispatch({
      type: NEW_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete saved address
export const deleteAddress = id => async dispatch => {
  try {
    dispatch({type: DELETE_ADDRESS_REQUEST});
    const {data} = await axiosInstance.delete(`${BASE_URL}/api/v1/address/${id}`);

    dispatch({type: DELETE_ADDRESS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update saved address
export const updateAddress = (id, addressData) => async dispatch => {
  try {
    dispatch({type: UPDATE_ADDRESS_REQUEST});
    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.put(
      `${BASE_URL}/api/v1/address/${id}`,
      addressData,
      config,
    );

    dispatch({type: UPDATE_ADDRESS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_FAIL,
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
