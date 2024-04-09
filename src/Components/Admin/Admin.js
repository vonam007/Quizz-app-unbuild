import Sidebars from "../Sidebar/Sidebar";
import './Admin.scss';

const Admin = (props) => {

    return (
        <div className='Admin-container'>
            <div className='Admin-sidebar'>
                <Sidebars />
            </div>
            <div className='Admin-Content'>
                <h2>Admin Content</h2>
            </div>
        </div>
    );
}
export default Admin;