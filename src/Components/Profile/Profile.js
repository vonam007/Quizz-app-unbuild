import './Profile.scss'
import { useSelector, useDispatch } from 'react-redux';
import ShowProfile from './ShowProfile';
import EditProfile from './EditProfile';
import HistoryView from './HistoryView';
import { useState } from 'react';

const Profile = () => {

    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    // show infor, change password, history quiz...

    const [isEdit, setIsEdit] = useState(false);
    const [isViewHistory, setIsViewHistory] = useState(false);


    return (
        <div className='profile-container'>
            {!isEdit && !isViewHistory &&
                <ShowProfile
                    account={account}
                    setIsEdit={setIsEdit}
                    setIsViewHistory={setIsViewHistory}
                />
            }

            {isEdit && !isViewHistory &&
                <EditProfile
                    account={account}
                    setIsEdit={setIsEdit}
                />}

            {
                isViewHistory &&
                <HistoryView
                    account={account}
                    setIsViewHistory={setIsViewHistory}
                />
            }

        </div>
    )
}
export default Profile;