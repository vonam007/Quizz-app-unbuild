import './ManageQuizzes.scss'
import './inputMagic.scss'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllQuizzesByAdmin } from '../../../../services/apiService'
import TableQuiz from './TableQuiz'
import AddNewQuiz from './AddNewQuiz'

import ModalUpdateQuiz from './ModalEditQuiz'
import ModalDeleteQuiz from './ModalDeleteQuiz'
import UpdateQA from './UpdateQA'
import AssignQuiz from './AssignQuiz'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ManageQuizzes = () => {

    //add quiz
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [quizImage, setQuizImage] = useState(null)

    //quiz table
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchAllQuizzes()
    }, [])

    const fetchAllQuizzes = async () => {
        let res = await getAllQuizzesByAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
        else {
            toast.error(res.EM)
        }
    }
    //modal edit/delete
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [quizEdit, setQuizEdit] = useState({});
    const [quizDelete, setQuizDelete] = useState({});

    const handleClickEditBtn = (quiz) => {
        setQuizEdit(quiz)
        setShowModalEdit(true)
    }
    const handleClickDeleteBtn = (quiz) => {
        setQuizDelete(quiz)
        setShowModalDelete(true)
    }



    return (
        <div className="quiz-container">
            {showModalEdit && <ModalUpdateQuiz
                setShowModal={setShowModalEdit}
                quiz={quizEdit}
                fetchAllQuizzes={fetchAllQuizzes}
            />}
            {showModalDelete && <ModalDeleteQuiz
                setShowModal={setShowModalDelete}
                quiz={quizDelete}
                fetchAllQuizzes={fetchAllQuizzes}
            />}
            <h1>Manage Quizzes</h1>
            <Tabs>
                <TabList>
                    <Tab>All Quizzes</Tab>
                    <Tab>Add Quizzes</Tab>
                    <Tab>Update Q/A Quizzes</Tab>
                    <Tab>Assign Quizzes to USER</Tab>
                </TabList>
                <TabPanel>
                    <TableQuiz
                        listQuiz={listQuiz}
                        handleClickEditBtn={handleClickEditBtn}
                        handleClickDeleteBtn={handleClickDeleteBtn}
                    />
                </TabPanel>
                <TabPanel>
                    <AddNewQuiz
                        name={name}
                        setName={setName}
                        description={description}
                        setDescription={setDescription}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        quizImage={quizImage}
                        setQuizImage={setQuizImage}
                        fetchAllQuizzes={fetchAllQuizzes}
                    />
                </TabPanel>
                <TabPanel>
                    <UpdateQA />
                </TabPanel>
                <TabPanel>
                    <AssignQuiz />
                </TabPanel>
            </Tabs>
        </div>
    );
}
export default ManageQuizzes;