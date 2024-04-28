import { postChangePassword, postLogout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
const ShowProfile = (props) => {

    const { account, setIsEdit, setIsViewHistory } = props
    const [isChangingPW, setIsChangingPW] = useState(false);

    const [currentPW, setCurrentPW] = useState('');
    const [newPW, setNewPW] = useState('');
    const [confirmPW, setConfirmPW] = useState('');
    const dispatch = useDispatch();

    const handleHistory = () => {
        setIsViewHistory(true);
    }
    const handleChangePW = async () => {

        if (newPW !== confirmPW) {
            toast.error('Password does not match');
            return;
        }
        const res = await postChangePassword(currentPW, newPW);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setIsChangingPW(false);
            toast.warning('Logout...');
            setTimeout(async () => {
                await postLogout(account.email, account.refresh_token);
                dispatch(doLogout());
            }, 2000);
        }
        else {
            toast.error(res.EM);
        }

    }
    return (
        <div className='profile-content'>
            <div className='avatar'>
                <img src={`data:image/jpeg;base64,${account.image}`} alt='avatar' />
            </div>
            <div className='info'>
                <div className='username'>
                    Username: <span>{account.username}</span>
                </div>
                <div className='email'>
                    Email: <span>{account.email}</span>
                </div>
            </div>
            <div className='change-pw' onClick={handleHistory}>Quizzes Attended History</div>
            <div className='change-pw' onClick={() => setIsChangingPW(true)}>Change Password</div>

            {
                isChangingPW && <div className='change-pw-input'>
                    <div>Change Password</div>
                    <input type='password' placeholder='Current Password'
                        value={currentPW}
                        onChange={(e) => setCurrentPW(e.target.value)}
                    />
                    <input type='password' placeholder='New Password'
                        value={newPW}
                        onChange={(e) => setNewPW(e.target.value)}
                    />
                    <input type='password' placeholder='Confirm New Password'
                        value={confirmPW}
                        onChange={(e) => setConfirmPW(e.target.value)}
                    />
                    <div className='btn-group'>
                        <button onClick={() => setIsChangingPW(false)}>Cancel</button>
                        <button onClick={handleChangePW}>Change</button>
                    </div>
                </div>
            }

            <button onClick={() => setIsEdit(true)}>Edit your profile</button>
        </div>
    );
}
export default ShowProfile;
