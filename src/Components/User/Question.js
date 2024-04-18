
import _ from 'lodash';
import { useEffect } from 'react';
import { MdOutlineImageNotSupported } from "react-icons/md";


const Question = (props) => {
    const { questionData, index } = props;
    // useEffect(() => {
    //     document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
    //         radio.checked = false;
    //     });
    // }, [index]);


    if (_.isEmpty(questionData)) {
        return <></>;
    }


    const handleOnchange = (e, aid, qid) => {
        // let inputs = document.querySelectorAll('input[type="checkbox"]');
        // inputs.forEach(function (input) {
        //     input.checked = false;
        // });
        // e.target.checked = true;   
        props.handleCheckBox(aid, qid);
    }
    return (
        <>
            <div className="qImg">
                {
                    questionData.image !== null
                        ? <img src={`data:image/jpeg;base64,${questionData.image}`} alt="Question" />
                        : <>
                            <MdOutlineImageNotSupported style={{ width: "100%", height: "100%" }} />
                            <h3 style={{ textAlign: "center", userSelect: "none" }}>Image not found</h3>
                        </>
                }

            </div>
            <div className="qContent">
                <div className="qDescription">Question {index + 1}: {questionData.questionDescription}?</div>
                <div className="qAnswers">
                    {
                        questionData.answers && questionData.answers.length > 0 && questionData.answers.map((answer, index) => {
                            let widths = 100 / questionData.answers.length - 5; // 5% is the margin
                            return (
                                <div className="answer" key={`${index}-answer`} style={{ width: `${widths}%` }}>
                                    <input
                                        type='checkbox'
                                        id={`quesID-${index}`}
                                        name="question"
                                        value={index}
                                        checked={answer.isSelected}
                                        onChange={(e) => handleOnchange(e, answer.id, questionData.questionId)}
                                    />
                                    <label htmlFor={`quesID-${index}`}>{answer.description}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>

    );
}
export default Question;