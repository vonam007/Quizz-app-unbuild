import './Modal.scss';
import { useEffect, useState } from 'react';

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ModalViewUser = (props) => {

    const { user, setShowModal } = props;

    const [announce, setAnnounce] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        setEmail(user.email);
        setUsername(user.username);
        setRole(user.role);
        if (user.image) {
            setPreviewImage(`data:image/png;base64,${user.image}`);
        }

    }, [user]);

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

    return (
        <>
            <div className='overlay' onClick={() => backdropClick()}> </div>
            <div className="modal modal-view">
                <div className="modal-header">
                    <div className='title'><span>Information</span></div>
                    <AiOutlineClose
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <div className="modal-content">
                    <div className='row'>
                        <label>Username:</label>
                        <span>{username}</span>
                    </div>
                    <div className='row'>
                        <label>Email:</label>
                        <span>{email}</span>
                    </div>
                    <div className='row'>
                        <label>Role:</label>
                        <span>{role}</span>
                    </div>
                    <div className='row'>
                        <label>Image</label>
                        <div className='img-preview'>
                            {
                                previewImage
                                    ? <img src={previewImage} alt='previewImage'></img>
                                    : <span>No Image</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => props.setShowModal(false)}>Close</button>
                </div>
                <div className='announce'>
                    <div className='info' id='infoA'>
                        <AiOutlineCloseCircle style={{ color: "red", fontSize: "1.5rem" }} />&#160;<span>Click X or Close/Save to close!</span>
                    </div>
                </div>
            </div>

        </>
    );
}
export default ModalViewUser;