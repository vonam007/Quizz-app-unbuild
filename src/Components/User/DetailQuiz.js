import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/apiService";
import _ from 'lodash';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

    const [quizData, setQuizData] = useState({});

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
    return (
        <div>

            {quizData && quizData.length > 0 && quizData.map((question, index) => {
                return (
                    <div key={`${index}-question`} className="card">
                        <div className='card-img-holder'>
                            <img src={`data:image/png;base64,${question.image}`} alt="Avatar" style={{ width: "100%" }} />
                        </div>
                        <div className="card-info">
                            <h4><b>Question {index + 1}</b></h4>
                            <p>{question.questionDescription}</p>
                            <div>
                                {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                    return (
                                        <div key={`${index}-answer`}>
                                            <input type="radio" id={index} name={question.questionID} value={answer.id} />
                                            <label htmlFor={index}>{answer.description}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    );
}
export default DetailQuiz;