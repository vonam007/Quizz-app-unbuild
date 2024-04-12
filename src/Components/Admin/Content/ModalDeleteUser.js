import { useState } from 'react';
import './Modal.scss';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from 'react-toastify';
import { delDeleteUser } from '../../../services/apiService';

const ModalDeleteUser = (props) => {

    const [announce, setAnnounce] = useState(false);

    const { setShowModal, user, fetchListUsers } = props;
    console.log(user);

    const backdropClick = () => {
        console.log('backdrop clicked');
        if (announce) {
            return;
        }
        else {
            setAnnounce(true);
            let infoA = document.getElementById('infoA');
            infoA.style.display = 'flex'
            setTimeout(() => {
                infoA.style.display = 'none';
                setAnnounce(false);
            }, 3000);
        }
    }


    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [username, setUsername] = useState('');
    // const [role, setRole] = useState('USER');
    // const [image, setImage] = useState('');
    // const [previewImage, setPreviewImage] = useState("");




    const handleDeleteUser = async () => {

        console.log(user.id);
        const data = await delDeleteUser(user.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            setTimeout(() => {
                setShowModal(false);
            }, 1000);
            await fetchListUsers();
        }
        else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }

    return (
        <>
            <div className='overlay' onClick={() => backdropClick()}> </div>
            <div className="modal modal-delete">
                <div className="modal-header">
                    <h2>Confirm?</h2>
                    <AiOutlineClose
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <div className="modal-content">
                    <div>
                        <span>You really want to delete this user?</span> <br />
                        <span className='user-name'>
                            Username: {user && user.username ? user.username : 'No name'} <br />
                            Email: {user && user.email ? user.email : 'No email'}</span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="btn-save" onClick={() => handleDeleteUser()}>Delete</button>
                </div>
                <div className='announce'>
                    <div className='info' id='infoA'>
                        <AiOutlineCloseCircle style={{ color: "red", fontSize: "1.5rem" }} />&#160;<span>Click X or Close/Save to close!</span>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ModalDeleteUser;