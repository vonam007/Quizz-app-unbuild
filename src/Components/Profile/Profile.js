import './Profile.scss'
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    // show infor, change password, history quiz...


    return (
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='profile-avatar'>
                    <img src="https://i.imgur.com/8Km9tLL.png" alt="avatar" />
                </div>
                <div className='profile-info'>
                    <span className='profile-name'>Nam Vo</span>
                    <span className='profile-email'>
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className='profile-role'>
                        <i className="fas fa-user"></i>
                        Admin
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Profile;