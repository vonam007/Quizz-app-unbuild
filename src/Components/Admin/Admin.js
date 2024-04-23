import Sidebars from "./Sidebar/Sidebar";
import './Admin.scss';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar'
import ChooseLanguage from '../Header/ChooseLanguage';
import SettingDropDown from '../Header/SettingDropDown';



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
                    <div className="r-nav">
                        <SettingDropDown />
                        <ChooseLanguage />
                    </div>
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