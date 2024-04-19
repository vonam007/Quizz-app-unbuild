import Select from 'react-select';
import { useEffect, useState } from 'react';
import './ManageQuestions.scss';

import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";

const ManageQuestions = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];



    const [selectedQuiz, setSelectedQuiz] = useState({});


    return (
        <div className="question-container">
            <div className="title">Manage Questions</div>
            <div className='add-new-questions'>
                <div className='select-quiz-option'>
                    <label>Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}

                        className='select-quiz'
                    />
                </div>
                <label className='title'>Add Questions:</label>
                <div className='add-ques-group'>
                    <div className='question-content'>
                        <div className='group desc-group'>
                            <label>Description:</label>
                            <input type='text' />
                        </div>
                        <div className='group img-group'>
                            <label htmlFor='imageUpload'>Upload Image</label>
                            <input type='file' hidden id='imageUpload' />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='group btn-group'>
                            <AiFillPlusSquare
                                className='add-btn btn'
                                onClick={() => alert("+")} />
                            <AiFillMinusSquare
                                className='remove-btn btn'
                                onClick={() => alert("-")} />
                        </div>
                    </div>
                    <div className='answers-content'></div>
                </div>
            </div>
        </div>
    );
}
export default ManageQuestions;