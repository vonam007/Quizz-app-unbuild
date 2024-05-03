import './ListQuiz.scss';
import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListQuiz = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const [arrQuiz, setArrQuiz] = useState([]);
    useEffect(() => {
        getQuiz()
    }, []);

    const getQuiz = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }

    }
    return (

        <div className='center-list-quiz'>
            <div className='list-quiz-container'>
                {arrQuiz && arrQuiz.length > 0 && arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card">

                            <span>
                                <div className='card-img-holder'>
                                    <img src={`data:image/png;base64,${quiz.image}`} alt="Avatar" style={{ width: "100%" }} />
                                </div>
                                <div className="card-info">
                                    <h4><b>Quiz Number {index + 1}</b></h4>
                                    <p>{quiz.description}</p>
                                </div>

                            </span>
                            <button
                                onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                            >Start Now</button>

                        </div>
                    )
                }
                )}

                {isAuthenticated && arrQuiz && arrQuiz.length === 0
                    ?
                    <div className='no-quiz'>You have no quiz now...</div>
                    :
                    isAuthenticated === false && <div className='no-quiz'>Please login to see your quiz</div>
                }
            </div>
        </div>

    );
}
export default ListQuiz;