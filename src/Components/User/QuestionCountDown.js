import CountDown from './CountDown';

const QuestionCountDown = (props) => {
    const { quizData, currentQuestion } = props;


    const onTimeOut = () => {
        props.handleFinish();
    };


    const getClassQuestion = (index, question) => {

        if (question && question.answers && question.answers.length > 0) {
            let isSelected = question.answers.find(item => item.isSelected === true);
            if (isSelected) {
                return 'questionBtn selected';
            }
        }
        if (index === currentQuestion) {
            return 'questionBtn active';
        }

        return 'questionBtn';
    }

    return (
        <div className="question-count">
            <div className="countDown">
                <CountDown
                    onTimeOut={onTimeOut}
                />
            </div>
            <div className="listQuestion">

                {
                    quizData && quizData.length > 0 &&
                    quizData.map((item, index) => {
                        return (
                            <span
                                key={index}
                                className={getClassQuestion(index, item)}
                                onClick={() => props.setCurrentQuestion(index)}
                            >{index + 1}</span>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default QuestionCountDown;