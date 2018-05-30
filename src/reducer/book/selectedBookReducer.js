import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';
import _ from 'lodash';

const selectedBookReducer = (state = initialState.selectedBookReducer, action) => {
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

export default selectedBookReducer;