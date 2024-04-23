import './Header.scss'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';

import { postLogout } from '../../services/apiService';

import NProgress from 'nprogress';
import { toast } from 'react-toastify';

const Header = () => {


    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleSignUp = () => {
        navigate('/register');
    }
    const handleLogout = async () => {
        // NProgress.start();
        // let res = await postLogout(account.email, account.refresh_token);
        // if (res && res.EC === 0) {
        //     setTimeout(() => {
        //         dispatch(doLogout());
        //         navigate('/login');
        //     }, 1000);
        //     toast.success(res.EM);
        // }
        // else {
        //     toast.error(res.EM);
        // }
        // NProgress.done();
        setTimeout(() => {
            dispatch(doLogout());
            navigate('/login');
        }, 1000);

    }

    return (
        <div className='Nav'>
            <div className='leftNav'>
                <NavLink to='/' className="logo" >NamVo</NavLink>
                <NavLink to='/'>Home</NavLink>
                {
                    account.role === 'ADMIN'
                        ? <NavLink to='/admins'>Admin Dashboard</NavLink>
                        : <NavLink to='/users'>Do Quiz</NavLink>
                }
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
                                <Link onClick={() => handleLogout()}>Logout</Link>
                            </div>
                        </div>
                    </div>

                }


            </div>
        </div >
    );
}
export default Header;