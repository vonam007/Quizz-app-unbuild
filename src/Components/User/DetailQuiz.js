import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { getQuizById, postSubmitQuiz } from "../../services/apiService";
import _ from 'lodash';
import { toast } from 'react-toastify';
import './DetailQuiz.scss';


import Question from "./Question";
import QuestionCountDown from "./QuestionCountDown";
import ModalResult from "./ModalResult";

const DetailQuiz = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const quizId = params.id;

    const [quizData, setQuizData] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showModalResult, setShowModalResult] = useState(false);
    const [dataResult, setDataResult] = useState({});


    useEffect(() => {
        fetchQuestion()
    }, [quizId]);

    const fetchQuestion = async () => {
        let res = await getQuizById(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let handledData = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((element, index) => {
                        if (index === 0) {
                            questionDescription = element.description;
                            image = element.image;
                        }
                        element.answers.isSelected = false;
                        answers.push(element.answers);
                    })

                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setQuizData(handledData);
        }
    }

    const handlePrev = () => {
        setCurrentQuestion(currentQuestion <= 0 ? 0 : currentQuestion - 1);
    }
    const handleNext = () => {
        setCurrentQuestion(currentQuestion >= quizData?.length - 1 ? quizData?.length - 1 : currentQuestion + 1);
    }
    const handleFinish = async () => {

        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (quizData && quizData.length > 0) {
            quizData.forEach(question => {
                let qID = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(answer => {
                    if (answer.isSelected) {
                        userAnswerId.push(answer.id);
                    }
                })
                answers.push(
                    {
                        questionId: +qID,
                        userAnswerId
                    });
            })
        }

        payload.answers = answers;

        let response = await postSubmitQuiz(payload);

        if (response && response.EC === 0) {
            toast.success(`Quiz ${quizId} submitted successfully!`);
            setDataResult({
                countCorrect: response.DT.countCorrect,
                countTotal: response.DT.countTotal,
                quizData: response.DT.quizData
            });
            setTimeout(() => {
                setShowModalResult(true);
            }, 1000);
        }
        else {
            toast.error(response.EM);
        }
    }




    const handleCheckBox = (aid, qid) => {
        let dataQuizClone = _.cloneDeep(quizData);
        let ques = dataQuizClone.find(item => +item.questionId === +qid);
        if (ques && ques.answers && ques.answers.length > 0) {
            let temp = ques.answers.map(item => {
                if (+item.id === +aid) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            ques.answers = [...temp]

        }

        let index = dataQuizClone.findIndex(item => +item.questionId === +qid);
        if (index > -1) {
            dataQuizClone[index] = ques;
            setQuizData(dataQuizClone)
        }

    }

    return (
        <>
            {
                showModalResult && <ModalResult
                    dataResult={dataResult}
                    isShowModal={showModalResult}
                    setShowModal={setShowModalResult}
                />
            }
            <div className="detail-quiz">


                <div className="left-content">
                    <div className="qtitle">
                        <IoChevronBack
                            onClick={() => navigate("/users")}
                            style={{ cursor: "pointer", transform: "translateY(5px)" }}
                        />
                        Quiz {quizId} - {location?.state?.quizTitle}
                    </div>
                    {
                        quizData && quizData.length === 0 &&
                        <div className="no-quiz" onClick={() => navigate('/users')}>
                            No question in this quiz <br />	&nbsp;	&nbsp;&lt;--Back to quiz list
                        </div>

                    }
                    <Question
                        handleCheckBox={handleCheckBox}
                        index={currentQuestion}
                        questionData=
                        {
                            quizData && quizData.length > 0
                                ? quizData[currentQuestion]
                                : []
                        }
                    />
                    <div className="footer">
                        <button className="prev-btn" onClick={() => handlePrev()}>Previous</button>
                        <button className="next-btn" onClick={() => handleNext()}>Next</button>
                        <button className="finish-btn" onClick={() => handleFinish()}>Finish</button>
                    </div>
                </div>
                <div className="right-content">
                    <QuestionCountDown
                        quizData={quizData}
                        handleFinish={handleFinish}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                    // currentQuestion={currentQuestion}
                    />
                </div>
            </div>
        </>

    );
}
export default DetailQuiz;