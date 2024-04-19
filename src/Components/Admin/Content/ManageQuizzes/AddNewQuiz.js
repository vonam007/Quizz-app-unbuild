import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { postCreateNewQuiz } from '../../../../services/apiService'


const AddNewQuiz = (props) => {


    const { name, setName, description, setDescription, difficulty, setDifficulty, quizImage, setQuizImage, fetchAllQuizzes } = props;

    // thiết lập hiệu ứng cho input
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

    const handleChangeImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setQuizImage(e.target.files[0]);
        }
    }
    const handleAddQuiz = async () => {
        if (name === '') {
            toast.error('Please fill in the quiz title')
        }
        if (description === '') {
            toast.error('Please fill in the quiz description')
        }
        if (difficulty === '') {
            toast.error('Please choose the difficulty')
        }
        if (quizImage === null) {
            toast.error('Please upload an image')
        }
        if (name === '' || description === '' || difficulty === '' || quizImage === null) {
            return
        }

        let res = await postCreateNewQuiz(name, description + ' - LEVEL ' + difficulty, difficulty, quizImage)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setDifficulty('')
            setQuizImage(null)
            document.getElementById('quiz-image').value = null;
            fetchAllQuizzes()
        }
        else {
            toast.error(res.EM)
        }

    }



    return (
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
                        <option value="" disabled></option>
                        <option value={"EASY"}>EASY</option>
                        <option value={"MEDIUM"}>MEDIUM</option>
                        <option value={"HARD"}>HARD</option>
                    </select>
                    <label className="did-floating-label">Difficulty</label>
                </div>
                <div className="did-floating-label-content">
                    <input
                        className="did-floating-input-file"
                        type="file"
                        placeholder=" "
                        onChange={(e) => handleChangeImage(e)}
                        id='quiz-image'
                    />
                    <label className="did-floating-label">Upload Image</label>
                </div>
            </div>

            <div className='add-btn-container'>
                <button
                    className='add-btn'
                    onClick={() => handleAddQuiz()}
                >Add</button>
            </div>
        </fieldset>
    );
}

export default AddNewQuiz;