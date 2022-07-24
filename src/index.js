import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import App from './App';
import {UserProvider} from './components/contexts/user-context';
import {CategoriesProvider} from './components/contexts/categories-context';
import {CartProvider} from './components/contexts/cart-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store/store';
import {Elements} from '@stripe/react-stripe-js'
import { stripePromise } from './utils/stripe/stripe-utils';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    {/* <UserProvider> */}
      {/* <CategoriesProvider> */}
        {/* <CartProvider> */}
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
        {/* </CartProvider> */}
      {/* </CategoriesProvider> */}
    {/* </UserProvider> */}
  </BrowserRouter>
  </PersistGate>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

