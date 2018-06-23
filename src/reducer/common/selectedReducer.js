import * as ActionType from '../../action/ActionType';
import _ from 'lodash';
import { getInitialObject } from '../../api/ObjectApi';

const SelectedReducer = (state = getInitialObject, action) => {
	console.log('SelectedReducer', state)
    switch(action.type) {
        case ActionType.GET_SINGLE_RESPONSE: {
            return {...state, ...action.data};
        }
        default: { return state; }
    }
};

export default SelectedReducer;