
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

export {
    postCreateNewUser, putEditUser, delDeleteUser,
    getUsersWithPaginate, getAllUsers,
    postLogin, postRegister,
    getQuizByUser, getQuizById,
    postSubmitQuiz
}