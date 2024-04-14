import Sidebars from "./Sidebar/Sidebar";
import './Admin.scss';
import { Outlet } from 'react-router-dom';



const Admin = (props) => {

    return (
        <div className='Admin-container'>
            <div className='Admin-sidebar'>
                <Sidebars />
            </div>
            <div className='Admin-Content'>
                <div className="Admin-header">
                    <h1>Admin Header</h1>
                </div>
                <div className="Admin-main">
                    <Outlet />
                </div>
            </div>

        </div>
    );
}
export default Admin;