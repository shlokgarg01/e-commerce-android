import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {updateUserReducer, userReducer} from './src/reducers/UserReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import {myOrdersReducer, newOrderReducer} from './src/reducers/OrderReducer';
import {
  addressDetailsReducer,
  addressReducer,
  myAddressesReducer,
  newAddressReducer,
} from './src/reducers/AddressReducer';
import {
  favouriteProductsReducer,
  mostOrderedProductsReducer,
  productsByCategoryReducer,
  productsReducer,
  suggestedProductsReducer,
  trendingProductsReducer,
} from './src/reducers/ProductReducer';
import {cartReducer} from './src/reducers/CartReducer';
import {allCategoriesReducer} from './src/reducers/CategoryReducer';
import { validateCouponReducer } from './src/reducers/CouponReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const reducer = combineReducers({
  user: userReducer,
  profile: updateUserReducer,

  myOrders: myOrdersReducer,
  newOrder: newOrderReducer,

  myAddresses: myAddressesReducer,
  addressDetails: addressDetailsReducer,
  address: addressReducer,
  newAddress: newAddressReducer,

  products: productsReducer,
  productsByCategory: productsByCategoryReducer,
  trendingProducts: trendingProductsReducer,
  favouriteProducts: favouriteProductsReducer,
  mostOrderedProducts: mostOrderedProductsReducer,
  suggestedProducts: suggestedProductsReducer,

  cart: cartReducer,

  categories: allCategoriesReducer,

  coupon: validateCouponReducer
});

const persistedReducer = persistReducer(persistConfig, reducer)

const initialState = {
  cart: {
    cartItems: [],
  },
};

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware),
);

export const persistor = persistStore(store)
export default store;
