import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';
import _ from 'lodash';

import * as Param from '../../Config';

const SelectedReducer = (state = Param.InitObject(), action) => {
    switch(action.type) {
        case ActionType.GET_SINGLE_RESPONSE: {
            return {...state, ...action.data};
        }
        default: { return state; }
    }
};


export default SelectedReducer;