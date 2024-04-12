import { useEffect, useState } from 'react';

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";

import { putEditUser } from '../../../services/apiService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUpdateUser = (props) => {

    const [announce, setAnnounce] = useState(false);
    const { setShowModal, fetchListUsers, UserEdit } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(UserEdit)) {
            setEmail(UserEdit.email);
            setUsername(UserEdit.username);
            setRole(UserEdit.role);
            if (UserEdit.image) {
                setPreviewImage(`data:image/png;base64,${UserEdit.image}`);
            }
        }

    }, [UserEdit]);

    const backdropClick = () => {
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

    const handleUpload = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }

    }


    const handleSaveEditUser = async () => {

        const data = await putEditUser(UserEdit.id, username, role, image);

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
            <div className="modal modal-update">
                <div className="modal-header">
                    <h2>Update User</h2>
                    <AiOutlineClose
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <div className="modal-content">
                    <form>
                        <div className="form-group">
                            <div className='group'>

                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='group'>

                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    disabled
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="form-group">
                            <div className='group'>

                                <label>Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className='group'>
                                <label>Role</label>
                                <br />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}>
                                    <option value={"USER"} >USER</option>
                                    <option value={"ADMIN"}>ADMIN</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className='img-upload-label' htmlFor='inputImg'>
                                <AiFillPlusCircle className="plus-sign" />
                                Upload File Image
                            </label>
                            <input
                                type="file"
                                hidden
                                id='inputImg'
                                onChange={(e) => handleUpload(e)}
                            />
                        </div>
                        <div className='img-preview'>
                            {
                                previewImage
                                    ? <img src={previewImage} alt='previewImage'></img>
                                    : <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => setShowModal(false)}>Close</button>
                    <button className="btn-save" onClick={() => handleSaveEditUser()}>Save</button>
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
export default ModalUpdateUser;