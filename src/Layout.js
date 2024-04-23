import { Routes, Route, Link } from 'react-router-dom';
import App from './App';

import Admin from './Components/Admin/Admin';
import DashBoard from './Components/Admin/Content/ManageDashboard/DashBoard';
import ManageUsers from './Components/Admin/Content/ManageUsers/ManageUsers';
import ManageQuizzes from './Components/Admin/Content/ManageQuizzes/ManageQuizzes';
import ManageQuestions from './Components/Admin/Content/ManageQuestions/ManageQuestions';
import ListQuiz from './Components/User/ListQuiz';
import DetailQuiz from './Components/User/DetailQuiz';

import PrivateRoutes from './routes/PrivateRoutes';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import Home from './Components/Home/Home';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';



const NotFound = () => {
    return (
        <div className="NotFoundpage-container">
            <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
            </div>

            <div className="contant_box_404">
                <h3 className="h2">
                    Look like you're lost
                </h3>
                <p>The page you are looking for not available!</p>

                <Link to={'/'} className="link_404">Go to Home</Link>
            </div>
        </div>

    )
}

const Layout = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='users' element={<ListQuiz />} />
                </Route>
                <Route path='quiz/:id' element={
                    <PrivateRoutes>
                        <DetailQuiz />
                    </PrivateRoutes>} />
                <Route path="admins" element={
                    <PrivateRoutes>
                        <Admin />
                    </PrivateRoutes>
                }>
                    <Route index element={<DashBoard />} />
                    <Route path='manageUsers' element={<ManageUsers />} />
                    <Route path='manageQuizzes' element={<ManageQuizzes />} />
                    <Route path='manageQuestions' element={<ManageQuestions />} />
                </Route>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
        </>
    )

}

export default Layout;