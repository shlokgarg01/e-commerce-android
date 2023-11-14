import { ADDRESS_DETAILS_FAIL, ADDRESS_DETAILS_REQUEST, ADDRESS_DETAILS_SUCCESS, CLEAR_ERRORS, DELETE_ADDRESS_FAIL, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_RESET, DELETE_ADDRESS_SUCCESS, MY_ADDRESSES_FAIL, MY_ADDRESSES_REQUEST, MY_ADDRESSES_SUCCESS, NEW_ADDRESS_FAIL, NEW_ADDRESS_REQUEST, NEW_ADDRESS_RESET, NEW_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAIL, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_RESET, UPDATE_ADDRESS_SUCCESS } from "../constants/AddressConstants";

export const myAddressesReducer = (state = {addresses: []}, action) => {
  switch (action.type) {
    case MY_ADDRESSES_REQUEST:
      return {
        loading: true,
      };
    case MY_ADDRESSES_SUCCESS:
      return {
        loading: false,
        addresses: action.payload,
      };
    case MY_ADDRESSES_FAIL:
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

export const addressDetailsReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case ADDRESS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ADDRESS_DETAILS_SUCCESS:
      return {
        loading: false,
        address: action.payload,
      };
    case ADDRESS_DETAILS_FAIL:
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

export const addressReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case DELETE_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ADDRESS_FAIL:
    case UPDATE_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ADDRESS_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_ADDRESS_RESET:
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

export const newAddressReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case NEW_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ADDRESS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        address: action.payload.address,
      };
    case NEW_ADDRESS_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };
    case NEW_ADDRESS_RESET:
      return {
        ...state,
        success: false,
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