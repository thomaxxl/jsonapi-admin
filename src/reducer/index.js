import {combineReducers} from 'redux';
import modalReducer from './common/modalReducer';
import formReducer from './common/formReducer';
import analyzeReducer from './common/analyzeReducer';
import { reducer as api} from 'redux-json-api'
import selectedUserReducer from './user/selectedUserReducer';
import UsersReducer from './user/UsersReducer';
import selectedBookReducer from './book/selectedBookReducer';
import BooksReducer from './book/BooksReducer';


export default combineReducers({
    UsersReducer,
    api,
    modalReducer,
    formReducer,
    analyzeReducer,
    selectedUserReducer,
    BooksReducer,
    selectedBookReducer
});