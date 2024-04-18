// import './Modal.scss;'
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ModalResult = (props) => {

    const { isShowModal, setShowModal, dataResult } = props;

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

    return (
        <>
            <div className='overlay' onClick={() => backdropClick()}> </div>
            <div className="modal modal-view">
                <div className="modal-header">
                    <div className='title'><span>Your Result</span></div>
                    <AiOutlineClose
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <div className="modal-content">
                    <div>
                        Total question: <b>{dataResult?.countTotal}</b> <br />
                        Total correct: <b>{dataResult?.countCorrect}</b>
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
export default ModalResult;