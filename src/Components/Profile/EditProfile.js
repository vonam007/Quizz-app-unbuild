import React, { useState } from 'react';
import { LuImagePlus } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { postEditProfile } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doEditProfile } from '../../redux/action/userAction';

const EditProfile = (props) => {

    const { account, setIsEdit } = props
    const [imageFile, setImageFile] = useState(account.image)
    const [username, setUsername] = useState(account.username)

    const dispatch = useDispatch();
    const handleSaveIMG = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageFile(reader.result.split(',')[1]);
        }
    }

    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    const handleSaveBtn = async () => {
        let userImage = await urltoFile(`data:image/jpeg;base64,${imageFile}`, 'avatar.jpg', 'image/jpeg');
        const res = await postEditProfile(username, userImage);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(doEditProfile({ username, image: imageFile }));
            setTimeout(() => {
                setIsEdit(false);
            }, 2000);
        }
        else {
            toast.error(res.EM);
        }



    }
    return (
        <div className='profile-content editProfile'>
            <div className='avatar'>
                {
                    imageFile === ""
                        ? <RxAvatar className='imgFileEmpty' />
                        : <img src={`data:image/jpeg;base64,${imageFile}`} alt='avatar' />
                }
                <label htmlFor='avt'><LuImagePlus /></label>
                <input
                    id='avt'
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleSaveIMG(e)}
                    hidden
                />
            </div>
            <div className='info'>
                <div className='username'>
                    <span>Username:</span>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='email'>
                    <span> Email:</span>
                    <input
                        disabled
                        value={account.email}
                    />
                </div>
            </div>
            <div className="btn">
                <button onClick={() => setIsEdit(false)}> Cancel</button>
                <button onClick={handleSaveBtn}>Save</button>
            </div>
        </div>
    );
}
export default EditProfile;
