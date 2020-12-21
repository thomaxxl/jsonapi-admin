import * as ActionType from '../../action/ActionType';

const SelectedReducer = (state = {}, action) => {
    
    let order = null
    let tb_updated = null
    
    if(state && state[action.objectKey]){
        state[action.objectKey].data.forEach((state_item, index) =>{
                if(state_item.id === action.change_id){
                    order = index
                    tb_updated = state_item
                }
            })
    }
    switch(action.type) {
        case ActionType.GET_SINGLE_RESPONSE: {
            if(tb_updated){
                state[action.objectKey].data[order] = action.item
            }
            else{
                //state[action.objectKey].data.push(action.item)
            }
            return {...state, ...action.data};
        }
        default: { return state; }
    }
};

export default SelectedReducer;
