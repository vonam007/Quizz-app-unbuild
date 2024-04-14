import { useState } from 'react';
import './Modal.scss';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';

const ModalCreateUser = (props) => {

    const [announce, setAnnounce] = useState(false);

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


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState("");

    const handleUpload = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }

    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleSaveCreateUser = async () => {
        //check data
        //email not valid

        if (!validateEmail(email)) {
            toast.error('Email is not valid');
        }

        //password < 8
        if (password.length < 6) {
            toast.warn('Password must be at least 8 characters');
        }

        if (!validateEmail(email) || password.length < 6) {
            return;
        }

        const data = await postCreateNewUser(email, password, username, role, image);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            setTimeout(() => {
                props.setShowModal(false);
            }, 2000);
            //await props.fetchListUsers();
            props.setCurrentPage(1); //reset page to 1, then the table auto fetch data
        }
        else if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }

    return (
        <>
            <div className='overlay' onClick={() => backdropClick()}> </div>
            <div className="modal modal-create">
                <div className="modal-header">
                    <h2>Add New User</h2>
                    <AiOutlineClose
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => props.setShowModal(false)}
                    />
                </div>
                <div className="modal-content">
                    {/* form: email, password, username, role (ADMIN/USER), image */}
                    <form>
                        <div className="form-group">
                            <div className='group'>

                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='group'>

                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
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
                            <label className='img-upload-label' htmlFor='inputImg-create'>
                                <AiFillPlusCircle className="plus-sign" />
                                Upload File Image
                            </label>
                            <input
                                type="file"
                                hidden
                                id='inputImg-create'
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
                    <button className="btn-cancel" onClick={() => props.setShowModal(false)}>Close</button>
                    <button className="btn-save" onClick={() => handleSaveCreateUser()}>Save</button>
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
export default ModalCreateUser;