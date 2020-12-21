import * as ActionType from '../../action/ActionType';
import { getInitialObject } from '../../api/ObjectApi';


const ObjectReducer = (state = getInitialObject, action) => {

    /*
    action = {
        type: ActionType.UPDATE_EXISTING_RESPONSE,
        objectKey:objectKey,
        rel_or_not: 0,1,2,
        dataField:dataField,
        change_id:change_id,
        item: object
    }
    */

    switch(action.type) {

        
        case ActionType.GET_RESPONSE: {
            return {...state, ...action.data};
        }

        case ActionType.UPDATE_EXISTING_RESPONSE: {
            // Update an existing item: change attributes or relationships
            var state_idx="" // index in state[action.objectKey]
            var tb_updated = null
            state[action.objectKey].data.forEach((state_item, index) =>{
                if(state_item.id === action.change_id){
                    state_idx = index
                    tb_updated = state_item
                }
            })

            if(!action || !action.item){
                console.log('no action item')

            }
            else if(!action.item[action.dataField]){
                console.log('no action data')
            }
            
            if(action.rel_or_not === ActionType.UPDATE_ATTR)
            {
                // Update attributes
                if(action.dataField === undefined){
                    console.warn('Invalid data', action)
                }
                else{
                    state[action.objectKey].data[state_idx][action.dataField] = action.item[action.dataField]
                }
                
                return {...state}
            }
            else if(action.rel_or_not === ActionType.UPDATE_TOONE){
                // Update a toone relationship
                //state[action.objectKey].data[state_idx][action.dataField].data = action.item
                state[action.objectKey].data[state_idx].relationships[action.dataField]['data'] = action.item
                var atr = action.dataField + '_id'
                state[action.objectKey].data[state_idx][atr] = action.item.id
                return {...state}
            }else if(action.rel_or_not === ActionType.UPDATE_TOMANY){
                // Update a tomany relationship
                console.log(action)
                console.log(state[action.objectKey].data[state_idx])
                state[action.objectKey].data[state_idx].relationships[action.dataField].data = action.item
                return {...state}
            }
        }
        case ActionType.SELECT_OPTION_RESPONSE: {
            if(!state[action.route].select_option){   
                state[action.route].select_option = {}
            }
            console.log('RR', action.route)
            console.log(action.data.data)
            state[action.route].select_option[action.objectKey] = action.data.data
            return state;
        }

        default: { return state; }
        
    }
};


export default ObjectReducer;
