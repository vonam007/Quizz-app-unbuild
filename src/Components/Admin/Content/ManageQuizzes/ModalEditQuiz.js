import { useEffect, useState } from 'react';

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";

import { putEditQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUpdateUser = (props) => {

    const [announce, setAnnounce] = useState(false);
    const { setShowModal, quiz } = props;

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setQuizImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(quiz)) {
            setId(quiz.id);
            setName(quiz.name);
            setDescription(quiz.description);
            setDifficulty(quiz.difficulty);
            setQuizImage(quiz.image);
            if (quiz.image) {
                setPreviewImage(`data:image/png;base64,${quiz.image}`);
            }
        }
    }, [quiz]);

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
            setQuizImage(e.target.files[0]);
        }

    }


    const handleSaveEditQuiz = async () => {

        const data = await putEditQuiz(id, name, description, difficulty, image);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            setTimeout(() => {
                setShowModal(false);
            }, 2000);
            await props.fetchAllQuizzes();
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
                    <h2>Update Quiz - ID {quiz.id}</h2>
                    <AiOutlineClose
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <div className="modal-content">
                    <form>
                        <div className="form-group">
                            <div className='group'>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='group'>
                                <label>Difficulty</label>
                                <br />
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}>
                                    <option value={"EASY"} >EASY</option>
                                    <option value={"MEDIUM"}>MEDIUM</option>
                                    <option value={"HARD"}>HARD</option>
                                </select>
                            </div>


                        </div>
                        <div className="form-group">
                            <div className='group' style={{ width: "100%" }}>
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
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
                    <button className="btn-save" onClick={() => handleSaveEditQuiz()}>Save</button>
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