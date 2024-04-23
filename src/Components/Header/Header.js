import './Header.scss'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import SettingDropDown from './SettingDropDown';
import ChooseLanguage from './ChooseLanguage';

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
                    <SettingDropDown />

                }
                <ChooseLanguage />


            </div>
        </div >
    );
}
export default Header;