import * as ActionType from '../../action/ActionType';
import { getInitialObject } from '../../api/ObjectApi';

const ObjectReducer = (state = getInitialObject, action) => {
	

    switch(action.type) {
        case ActionType.GET_RESPONSE: {
            return {...state, ...action.data};
        }
        default: { return state; }
        
    }
};


export default ObjectReducer;