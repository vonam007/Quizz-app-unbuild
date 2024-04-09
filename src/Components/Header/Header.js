import './Header.scss'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='Nav'>
            <div className='leftNav'>
                <p>NamVo</p>
                <Link to='/'>Home</Link>
                <Link to='/users'>Users</Link>
                <Link to='/admins'>Admin</Link>
            </div>
            <div className='rightNav'>
                <div className='dropdown'>
                    <span>Settings</span>
                    <div className='dropdown-content'>
                        <div>
                            <Link to='/'>Profile</Link>
                        </div>
                        <div>
                            <Link to='/'>Login</Link>
                        </div>
                        <div>
                            <Link to='/'>Logout</Link>
                        </div>
                        <div>
                            <Link to='/'>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Header;