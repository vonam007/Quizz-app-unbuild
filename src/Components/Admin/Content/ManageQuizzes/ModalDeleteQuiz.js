import { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from 'react-toastify';
import { delDeleteQuiz } from '../../../../services/apiService';

const ModalDeleteQuiz = (props) => {

    const [announce, setAnnounce] = useState(false);

    const { setShowModal, quiz } = props;

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

    const handleDeleteQuiz = async () => {

        const data = await delDeleteQuiz(quiz.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            setTimeout(() => {
                props.setShowModal(false);
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
                        <span>You really want to delete this Quiz?</span> <br />
                        <span className='user-name'>
                            ID: {quiz && quiz.id ? quiz.id : 'No ID'} <br />
                            Title: {quiz && quiz.name ? quiz.name : 'No title'}<br />
                            Description: {quiz && quiz.description ? quiz.description : 'No description'}</span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="btn-save" onClick={() => handleDeleteQuiz()}>Delete</button>
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
export default ModalDeleteQuiz;