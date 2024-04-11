import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';

import Admin from './Components/Admin/Admin';
import DashBoard from './Components/Admin/Content/DashBoard';
import ManageUsers from './Components/Admin/Content/ManageUsers';

import User from './Components/User/User';
import Home from './Components/Home/Home';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path='users' element={<User />} />
        </Route>
        <Route path="admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path='manageUsers' element={<ManageUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
