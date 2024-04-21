import Select from 'react-select';
import { useEffect, useState } from 'react';
import { getAllQuizzesByAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify'
import ModalImagePreview from './ModalImagePreview';



const AssignQuiz = (props) => {



    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null)

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    const [selectedUser, setSelectedUser] = useState({});
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchAllQuizzes();
        fetchListUsers()
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
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res && res.EC === 0) {

            let newUser = res.DT.map(user => {
                return {
                    value: user.id,
                    label: `${user.id} - ${user.username !== '' ? user.username : 'noname'} | email: ${user.email}`
                }
            })
            setListUser(newUser)
        }
        else {
            toast.error(res.EM)
        }
    }

    const handleAssignQuiz = async (quizId, userId) => {
        let res = await postAssignQuiz(quizId, userId)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setSelectedQuiz({});
            setSelectedUser({});
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className='assign-quiz-container'>
            {
                showModal && <ModalImagePreview
                    setShowModal={setShowModal}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                />
            }
            <div className='assign-quiz-content'>
                <div className='select-quiz-option select-id-group'>
                    <label>Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        className='select-quiz'
                    />
                </div>
                <div className='select-user-option select-id-group'>
                    <label>Select User:</label>
                    <Select
                        value={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                        className='select-user'
                    />
                </div>
            </div>
            <div className='assign-btn-container'>
                <button
                    onClick={() => {
                        handleAssignQuiz(selectedQuiz.value, selectedUser.value)
                    }}
                >Assign</button>
            </div>
        </div>
    );
}
export default AssignQuiz;