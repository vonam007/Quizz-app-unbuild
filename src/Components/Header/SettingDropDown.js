import { doLogout } from '../../redux/action/userAction';
import { postLogout } from '../../services/apiService'
import { useDispatch, useSelector } from 'react-redux';

import NProgress from 'nprogress';
import { toast } from 'react-toastify';

import { useNavigate, Link } from 'react-router-dom';
import './SettingDropDown.scss';
const SettingDropDown = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector(state => state.user.account);

    const handleLogout = async () => {
        NProgress.start();
        let res = await postLogout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            setTimeout(() => {
                dispatch(doLogout());
                navigate('/login');
            }, 1000);
            toast.success(res.EM);
        }
        else {
            toast.error(res.EM);
        }
        NProgress.done();
    }

    return (
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
    );
}
export default SettingDropDown;