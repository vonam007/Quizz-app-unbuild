import './Header.scss'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, Link } from 'react-router-dom';

const Header = () => {


    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleSignUp = () => {
        navigate('/register');
    }

    return (
        <div className='Nav'>
            <div className='leftNav'>
                <NavLink to='/' className="logo" >NamVo</NavLink>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/users'>Users</NavLink>
                <NavLink to='/admins'>Admin</NavLink>
            </div>
            <div className='rightNav'>

                {isAuthenticated === false
                    ?
                    <>
                        <button className='loginBtn Btn' onClick={() => handleLogin()}>Log in</button>
                        <button className='signupBtn Btn' onClick={() => handleSignUp()}>Sign up</button>
                    </>
                    :
                    <div className='dropdown'>
                        <span>Settings</span>
                        <div className='dropdown-content'>
                            <div>
                                <Link to='/'>Profile</Link>
                            </div>
                            <div>
                                <Link to='/'>Logout</Link>
                            </div>
                        </div>
                    </div>

                }


            </div>
        </div >
    );
}
export default Header;