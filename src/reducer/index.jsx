import {combineReducers} from 'redux';
import modalReducer from './common/modalReducer';
import formReducer from './common/formReducer';
import inputReducer from './common/inputReducer';
import analyzeReducer from './common/analyzeReducer';
import { reducer as api} from 'redux-json-api'
import ObjectReducer from './common/objectReducer'
import selectedReducer from './common/selectedReducer';


export default combineReducers({
    api,
    modalReducer,
    formReducer,
    inputReducer,
    analyzeReducer,
    object: ObjectReducer,
    selectedReducer,
});