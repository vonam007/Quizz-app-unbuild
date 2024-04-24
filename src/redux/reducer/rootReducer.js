import { combineReducers } from 'redux';
import { userReducer, languageReducer } from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    language: languageReducer
});


export default rootReducer;