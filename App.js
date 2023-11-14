import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './src/Routes';
import Toast, {SuccessToast, ErrorToast} from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import Loader from './src/components/Loader';
import {persistor} from './store';

const toastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 14,
      }}
      text1NumberOfLines={4}
      text2NumberOfLines={4}
    />
  ),
  error: props => (
    <ErrorToast {...props} text1NumberOfLines={4} text2NumberOfLines={4} />
  ),
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Routes />
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}
