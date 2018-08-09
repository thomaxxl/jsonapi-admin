import * as ActionType from '../../action/ActionType';
import { getInitialObject } from '../../api/ObjectApi';

const ObjectReducer = (state = getInitialObject, action) => {
    switch(action.type) {

        case ActionType.GET_RESPONSE: {
            return {...state, ...action.data};
        }

        case ActionType.UPDATE_EXISTING_RESPONSE: {
            console.log("track_reducer_1")
            console.log(action)
            console.log(state[action.objectKey].data)
            var order
            state[action.objectKey].data.forEach((state_item, index) =>{
                if(state_item.id === action.change_id){
                    order = index
                }
            })
            var mem = state
            console.log('track_reducer_11')
            console.log(mem)
            if(!action.rel_or_not)mem[action.objectKey].data[order][action.dataField] = action.item[action.dataField]
            else{
                mem[action.objectKey].data[order][action.dataField].data = action.item
                var atr = action.dataField + '_id'
                mem[action.objectKey].data[order][atr] = action.item.id
            }
            console.log({...state,...mem})
            return {...state,mem}
        }

        case ActionType.SELECT_OPTION_RESPONSE: {
            console.log('track_reducer_2')
            console.log(action)
            // return {...state, ...state[action.objectKey].select_option[action.objectKey]}
            state[action.route].select_option[action.objectKey] = action.data.data
            console.log(state)
            return state;
        }

        default: { return state; }
        
    }
};


export default ObjectReducer;