export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const FETCH_USER_LOGOUT = 'FETCH_USER_LOGOUT';
export const FETCH_USER_EXPIRED = 'FETCH_USER_EXPIRED';
export const EDIT_PROFILE = 'EDIT_PROFILE';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    };
};

export const doLogout = () => {
    return {
        type: FETCH_USER_LOGOUT
    };
};

export const doChangeLanguage = (data) => {
    return {
        type: CHANGE_LANGUAGE,
        payload: data
    };
};

export const doExpired = (data) => {
    return {
        type: FETCH_USER_EXPIRED,
        payload: data
    };
};

export const doEditProfile = (data) => {
    return {
        type: EDIT_PROFILE,
        payload: data
    };
}
