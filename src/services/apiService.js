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

export {
    postCreateNewUser
}