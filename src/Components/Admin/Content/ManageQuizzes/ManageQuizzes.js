import './ManageQuizzes.scss'
import './inputMagic.scss'
import { useEffect, useState } from 'react'
const ManageQuizzes = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [quizImage, setQuizImage] = useState(null)



    useEffect(() => {
        let temp = document.getElementById('difficulty-select');
        let temp2 = document.querySelectorAll('.did-floating-input')
        if (temp.value === "") {
            temp.classList.add('did-floating-select-empty')
        }
        else {
            temp.classList.remove('did-floating-select-empty')
        }
        temp2.forEach((element) => {
            if (element.value === "") {
                element.classList.add('did-floating-input-empty')
            }
            else {
                element.classList.remove('did-floating-input-empty')
            }
        })
    }, [difficulty, description, name])


    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>
            <fieldset className="add-a-quiz">
                <legend> Add A Quiz</legend>
                <div className='form-content'>
                    <div className="did-floating-label-content">
                        <input className="did-floating-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label className="did-floating-label">Quiz title</label>
                    </div>
                    <div className="did-floating-label-content">
                        <input className="did-floating-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label className="did-floating-label">Quiz description</label>
                    </div>
                    <div className="did-floating-label-content">
                        <select className="did-floating-select" id='difficulty-select'
                            value={difficulty}
                            onChange={(e) => {
                                setDifficulty(e.target.value)
                            }}
                        >
                            <option value={""}></option>
                            <option value={"EASY"}>EASY</option>
                            <option value={"MEDIUM"}>MEDIUM</option>
                            <option value={"HARD"}>HARD</option>
                        </select>
                        <label className="did-floating-label">Difficulty</label>
                    </div>
                    <div className="did-floating-label-content">
                        <input className="did-floating-input-file" type="file" placeholder=" " />
                        <label className="did-floating-label">Upload Image</label>
                    </div>
                </div>
            </fieldset>
            <div className="list-quiz">
                A table will here
            </div>
        </div>
    );
}
export default ManageQuizzes;