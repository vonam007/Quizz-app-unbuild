import { Routes, Route } from 'react-router-dom';
import App from './App';

import Admin from './Components/Admin/Admin';
import DashBoard from './Components/Admin/Content/DashBoard';
import ManageUsers from './Components/Admin/Content/ManageUsers';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import User from './Components/User/User';
import Home from './Components/Home/Home';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {


    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='users' element={<User />} />
                </Route>
                <Route path="admins" element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manageUsers' element={<ManageUsers />} />
                </Route>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
            />
        </>
    )

}

export default Layout;