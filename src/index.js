import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';
import './index.scss';
import 'nprogress/nprogress.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Layout from './Layout';
import './utils/i18n';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback="...is loading">
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PersistGate>
      {/* </React.StrictMode> */}
    </Provider>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
