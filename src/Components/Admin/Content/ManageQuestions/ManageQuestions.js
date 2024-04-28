import Select from 'react-select';
import { useEffect, useState } from 'react';
import './ManageQuestions.scss';
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash';
import { useImmer } from "use-immer"

import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import ModalImagePreview from './ModalImagePreview';
import { toast } from 'react-toastify'
import { getAllQuizzesByAdmin, postCreateNewAnswer, postCreateNewQuestion } from '../../../../services/apiService'

const ManageQuestions = () => {

    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null)


    const INIT_QUESTION =
        [{
            id: uuidv4(),
            description: '',
            image: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    isCorrect: false,
                    description: ''
                }
            ]
        }]
    const [questions, setQuestions] = useImmer(INIT_QUESTION);

    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchAllQuizzes()
    }, [])
    const fetchAllQuizzes = async () => {
        let res = await getAllQuizzesByAdmin()
        if (res && res.EC === 0) {

            let newQuiz = res.DT.map(quiz => {
                return {
                    value: quiz.id,
                    label: `${quiz.id} - ${quiz.description}`
                }
            })
            setListQuiz(newQuiz)
        }
        else {
            toast.error(res.EM)
        }
    }


    const [selectedQuiz, setSelectedQuiz] = useState({});


    const HandleAddRemoveQuestion = (method, questionId = "") => {

        if (method === 'ADD') {
            setQuestions(draft => {
                draft.push(INIT_QUESTION[0])
            })
        } else if (method === 'REMOVE') {
            setQuestions(questions.filter(question => question.id !== questionId))
        }
    }
    const HandleAddRemoveAnswer = (method, answerId, questionId) => {

        let index = questions.findIndex(question => question.id === questionId)
        if (index === -1) return;

        if (method === 'ADD') {
            setQuestions(draft => {
                draft[index].answers.push({
                    id: uuidv4(),
                    isCorrect: false,
                    description: ''
                })
            })

        } else if (method === 'REMOVE') {
            setQuestions(draft => {
                draft[index].answers = questions[index].answers.filter(answer => answer.id !== answerId)
            })
        }
    }

    const handleOnchange = (method, questionId, value, answerId) => {
        console.log(method, questionId, value, answerId)
        let index = questions.findIndex(question => question.id === questionId)
        if (index === -1) return;
        switch (method) {
            case 'QUESTION-DESCRIPTION':
                setQuestions(draft => {
                    draft[index].description = value
                })
                return;
            case 'ANSWER-DESCRIPTION':
                let answerIndex = questions[index].answers.findIndex(answer => answer.id === answerId)
                if (answerIndex === -1) return;
                setQuestions(draft => {
                    draft[index].answers[answerIndex].description = value
                })
                return;
            case 'QUESTION-IMAGE':
                if (value && value.target && value.target.files && value.target.files.length > 0) {
                    setQuestions(draft => {
                        draft[index].imageName = value.target.files[0].name
                        draft[index].image = value.target.files[0]
                    })
                }
                return;
            case 'ANSWER-IS-CORRECT':
                let answerIndex2 = questions[index].answers.findIndex(answer => answer.id === answerId)
                if (answerIndex2 === -1) return;
                setQuestions(draft => { draft[index].answers[answerIndex2].isCorrect = value })
                return;
            default:
                return;


        }
    }

    const HandleSubmitQuestionsForQuiz = async () => {


        //validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please select a quiz')
            return;
        }
        for (const question of questions) {
            if (question.description === '') {
                toast.error('Please fill in all question descriptions')
                return;
            }
            for (const answer of question.answers) {
                if (answer.description === '') {
                    toast.error('Please fill in all answer descriptions')
                    return;
                }
            }
        }



        //submit questions
        try {
            for (const question of questions) {
                const q = await postCreateNewQuestion(+selectedQuiz.value, question.description, question.image)
                for (const answer of question.answers) {
                    await postCreateNewAnswer(answer.description, answer.isCorrect, q.DT.id)
                }
            }
        }
        catch (error) {
            toast.error(error)
            return;
        }


        toast.success('Questions added successfully')
        setSelectedQuiz({})
        setQuestions(INIT_QUESTION)


    }
    const handleShowPreviewIMG = (questiom) => {

        setShowModal(true)
        setImagePreview(questiom.image)

    }

    return (
        <div className="question-container">
            {
                showModal && <ModalImagePreview
                    setShowModal={setShowModal}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                />
            }
            <div className="title">Manage Questions</div>
            <div className='add-new-questions'>
                <div className='select-quiz-option'>
                    <label>Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}

                        className='select-quiz'
                    />
                </div>
                <label className='title'>Add Questions:</label>

                {
                    questions && questions?.length > 0 && questions.map((question, index) => {
                        return (
                            <div className='add-ques-group' key={question.id}>
                                <div className='question-content'>
                                    <div className='group desc-group'>
                                        <label>Question {index + 1} description:</label>
                                        <input
                                            type='text'
                                            value={question.description}
                                            onChange={(e) => handleOnchange('QUESTION-DESCRIPTION', question.id, e.target.value)}
                                        />
                                    </div>
                                    <div className='group img-group'>
                                        <label htmlFor={`imageUpload-${question.id}`}><LuImagePlus /></label>
                                        <input
                                            type='file'
                                            hidden
                                            id={`imageUpload-${question.id}`}
                                            onChange={(e) => handleOnchange('QUESTION-IMAGE', question.id, e)}
                                        />
                                        {
                                            question.imageName !== '' ? <span className="image-name" onClick={() => handleShowPreviewIMG(question)}>{question.imageName}</span> : 'No file is uploaded'
                                        }
                                    </div>
                                    <div className='group btn-group'>
                                        <AiFillPlusSquare
                                            className='add-btn btn'
                                            onClick={() => HandleAddRemoveQuestion('ADD')} />
                                        {
                                            questions.length > 1 && <AiFillMinusSquare
                                                className='remove-btn btn'
                                                onClick={() => HandleAddRemoveQuestion('REMOVE', question.id)} />
                                        }
                                    </div>
                                </div>

                                {
                                    question.answers && question?.answers?.length > 0 && question.answers.map((answer, index) => {
                                        return (
                                            <div className='answers-content' key={answer.id}>
                                                <div className='is-ans-group group'>
                                                    <input
                                                        type='checkbox'
                                                        id={`checkRight-${answer.id}`}
                                                        checked={answer.isCorrect}
                                                        onChange={(e) => handleOnchange('ANSWER-IS-CORRECT', question.id, e.target.checked, answer.id)}
                                                    />
                                                    <label htmlFor={`checkRight-${answer.id}`}>Is Correct?</label>
                                                </div>
                                                <div className='group desc-group'>
                                                    <label>Answer {index + 1}:</label>
                                                    <input
                                                        type='text'
                                                        value={answer.description}
                                                        onChange={(e) => handleOnchange('ANSWER-DESCRIPTION', question.id, e.target.value, answer.id)}
                                                    />
                                                </div>
                                                <div className='group btn-group'>
                                                    <AiFillPlusSquare
                                                        className='add-btn btn'
                                                        onClick={() => HandleAddRemoveAnswer('ADD', '', question.id)} />
                                                    {
                                                        question.answers.length > 1 && <AiFillMinusSquare
                                                            className='remove-btn btn'
                                                            onClick={() => HandleAddRemoveAnswer('REMOVE', answer.id, question.id)} />
                                                    }
                                                </div>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        )

                    })
                }

                {
                    questions && questions?.length > 0 &&
                    <div className='add-ques-btn-container'>
                        <button
                            className='add-ques-btn'
                            onClick={() => HandleSubmitQuestionsForQuiz()}
                        >Add Questions</button>
                    </div>
                }
            </div>
        </div>
    );
}
export default ManageQuestions;