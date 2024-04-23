import { useEffect, useState } from 'react';

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ModalImagePreview = (props) => {

    const { imagePreview, setShowModal } = props;
    const [announce, setAnnounce] = useState(false);

    const backdropClick = () => {
        console.log(imagePreview);
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
            <div className="modal modal-image-view">
                <div className="modal-header">
                    <div className='title'><span>Image Preview</span></div>
                    <AiOutlineClose
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <div className="modal-content">
                    <div className="modal-image">
                        <img
                            src={URL.createObjectURL(imagePreview)}
                            alt="preview"
                        />
                    </div>
                    <div className='modal-image-info'>
                        <span> Name: {imagePreview?.name ? imagePreview.name : 'No Name'}</span>
                        {
                            (!imagePreview.size || imagePreview.size === undefined)
                                ? <span> Size: Unknown</span>
                                : <span> Size: ~{Math.floor(+imagePreview?.size / 1024)} KB</span>
                        }

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
export default ModalImagePreview;