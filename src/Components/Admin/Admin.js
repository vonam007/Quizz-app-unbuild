import Sidebars from "./Sidebar/Sidebar";
import './Admin.scss';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar'


const Admin = (props) => {
    const location = useLocation();
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(location.pathname.substring(location.pathname.indexOf('admins') + 6));
    }, [location.pathname])


    return (
        <div className='Admin-container'>
            <div className='Admin-sidebar'>
                <Sidebars />
            </div>
            <div className='Admin-Content'>
                <div className="Admin-header">
                    {
                        pathname === '/manageUsers' ? <h1>Manage Users</h1> :
                            pathname === '/manageQuizzes' ? <h1>Manage Quizzes</h1> :
                                pathname === '/manageQuestions' ? <h1>Manage Questions</h1> :
                                    <h1>Dashboard</h1>
                    }
                </div>
                <div className="Admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>

        </div>
    );
}
export default Admin;