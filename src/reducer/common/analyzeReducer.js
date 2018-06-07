import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';
import _ from 'lodash';

const analyzeReducer = (state = initialState.analyzeReducer, action) => {
    switch(action.type) {
        case ActionType.GET_ANALYZE_RESPONSE: {
            // '...' spread operator clones the state
            // lodash Object assign simply clones action.courses into a new array.
            // The return object is a copy of state and overwrites the state.courses with a fresh clone of action.courses
            return {
                ...state, showmodal: action.Modal
            };
        }

        default: { return state; }
    }
};

export default analyzeReducer;