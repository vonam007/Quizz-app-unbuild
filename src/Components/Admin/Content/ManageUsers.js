
import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';

const ManageUsers = (props) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div className="manage-users-container">
            {showModal && <ModalCreateUser setShowModal={setShowModal} />}
            <div className="title">
                <h1>Admin ManageUsers</h1>
            </div>
            <div className="content">
                <button className="add-user-btn" onClick={() => setShowModal(!showModal)}>
                    Add New User
                </button>
                <div>
                    table user
                </div>
            </div>
        </div>
    );
}
export default ManageUsers;