import { FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGOUT } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    access_token: action?.payload?.access_token,
                    refresh_token: action?.payload?.refresh_token,
                    username: action?.payload?.username,
                    image: action?.payload?.image,
                    role: action?.payload?.role
                },
                isAuthenticated: true
            };

        case FETCH_USER_LOGOUT:
            return INITIAL_STATE;

        default: return state;
    }
};

export default userReducer;