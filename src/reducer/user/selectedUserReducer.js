import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';
import _ from 'lodash';


const selectedUserReducer = (state = initialState.selectedUserReducer, action) => {
    switch(action.type) {
        case ActionType.GET_SINGLE_RESPONSE: {
            return {
                ...state,
                data: _.assign(action.data)
            };
        }
        default: { return state; }
    }
};


export default selectedUserReducer;