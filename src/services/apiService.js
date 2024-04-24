
import axios from '../utils/axiosCustomize';


// User related API calls
const postCreateNewUser = (email, password, username, role, image) => {

    // create data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('role', role);
    formData.append('userImage', image);

    return axios.post('api/v1/participant', formData)

}


const putEditUser = (id, username, role, image) => {

    // create data
    const formData = new FormData();
    formData.append('id', id);
    formData.append('username', username);
    formData.append('role', role);
    formData.append('userImage', image);

    return axios.put('api/v1/participant', formData)

}

const delDeleteUser = (userID) => {
    console.log(userID);
    return axios.delete('api/v1/participant', { data: { id: userID } });
}

const getUsersWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);

}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}


//Auth

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay: 3000 });
}

const postRegister = (email, username, password) => {
    return axios.post('api/v1/register', { email, username, password });

}

const postLogout = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email,
        refresh_token
    });
}

const postRefreshToken = (email, refresh_token) => {
    return axios.post('api/v1/refresh-token', {
        email,
        refresh_token
    });
}


//get quiz
const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getQuizById = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}

//submit quiz
const postSubmitQuiz = (data) => {

    return axios.post('http://localhost:8081/api/v1/quiz-submit', { ...data, delay: 2000 });

}

// Quiz admin

const postCreateNewQuiz = (name, description, difficulty, quizImage) => {
    const formData = new FormData();
    formData.append('name', name)
    formData.append('description', description)
    formData.append('difficulty', difficulty)
    formData.append('quizImage', quizImage)

    return axios.post('api/v1/quiz', formData);
}

const getAllQuizzesByAdmin = () => {
    return axios.get('api/v1/quiz/all');
}

const delDeleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}
const putEditQuiz = (id, name, description, difficulty, quizImage) => {
    const formData = new FormData();
    formData.append('id', id)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('difficulty', difficulty)
    formData.append('quizImage', quizImage)

    return axios.put('api/v1/quiz', formData);
}


// Questions and answers

const postCreateNewQuestion = (quiz_id, description, questionImage) => {

    const formData = new FormData();
    formData.append('quiz_id', quiz_id)
    formData.append('description', description)
    formData.append('questionImage', questionImage)

    return axios.post('api/v1/question', formData);
}

const postCreateNewAnswer = (description, correct_answer, question_id) => {

    return axios.post('api/v1/answer', { description, correct_answer, question_id });

}


const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId });
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);

}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data });
}

const getOverview = () => {
    return axios.get('api/v1/overview');
}
export {
    postCreateNewUser, putEditUser, delDeleteUser,
    getUsersWithPaginate, getAllUsers,
    postLogin, postRegister, postLogout, postRefreshToken,
    getQuizByUser, getQuizById,
    postSubmitQuiz, postCreateNewQuiz, delDeleteQuiz, putEditQuiz,
    getAllQuizzesByAdmin,
    postCreateNewQuestion, postCreateNewAnswer,
    postAssignQuiz, getQuizWithQA, postUpsertQA,
    getOverview
}