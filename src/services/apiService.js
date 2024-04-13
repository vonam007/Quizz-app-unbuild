import axios from '../utils/axiosCustomize';

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

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

export {
    postCreateNewUser,
    putEditUser,
    delDeleteUser,
    getAllUsers
}