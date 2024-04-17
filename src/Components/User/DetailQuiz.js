import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { getQuizById } from "../../services/apiService";
import _ from 'lodash';
import './DetailQuiz.scss';

import Question from "./Question";

const DetailQuiz = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const quizId = params.id;

    const [quizData, setQuizData] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);



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
                        answers.push(element.answers);
                    })
                    return { questionID: key, answers, questionDescription, image }
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
    const handleFinish = () => {
        navigate("/users");
    }

    return (
        <div className="detail-quiz">
            <div className="left-content">
                <div className="qtitle">
                    <IoChevronBack
                        onClick={() => navigate("/users")}
                        style={{ cursor: "pointer", transform: "translateY(5px)" }}
                    />
                    Quiz {quizId} - {location?.state?.quizTitle}
                </div>
                <Question
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
                <div className="countDown">10:00</div>
                <div className="listQuestion">
                    <ul>
                        <li className="active">1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default DetailQuiz;