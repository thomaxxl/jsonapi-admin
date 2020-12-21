import * as ActionType from './ActionType';
import ObjectApi from '../api/ObjectApi';

// actions processed by the objectReducer

export const getResponse = data => ({
    type: ActionType.GET_RESPONSE,
    data
});

export function getAction(objectKey, offset, limit, ...queryArgs) {
    return (dispatch) => {
        return ObjectApi.getCollection( objectKey, offset, limit, ...queryArgs )
            .then(data => {
                dispatch({...getResponse(data)});
            }).catch(error => {
                throw error
            });
    };
};

export const updateExistingResponse = (rel_or_not,objectKey, change_id, dataField, object) => ({
    type: ActionType.UPDATE_EXISTING_RESPONSE,
    objectKey:objectKey,
    rel_or_not:rel_or_not,
    dataField:dataField,
    change_id:change_id,
    item: object
});

export const addNewResponse = data => ({
    type: ActionType.ADD_NEW_RESPONSE,
    data
});



export function saveAction(objectKey, object, offset, limit, dataField) {
    return function (dispatch) {
        return ObjectApi.saveData(objectKey, object)
            .then((data) => {
                if (object.id) {
                    if(data.id != object.id){
                        console.warning(`Invalid id for ${object} in ${data}!`)
                    }
                    else{
                        var updated = updateExistingResponse(ActionType.UPDATE_ATTR,objectKey, object.id, dataField, data.attributes)
                        dispatch(updated)
                    }
                } else {
                    dispatch(addNewResponse())
                }
                // useless?
                // dispatch(getAction(objectKey, offset, limit))
                /*var resp = getSingleResponse(data)
                let state = dispatch(resp);
                console.log('saveaction end', state)*/
                return data.id
            }).catch(error => {
                throw error
            });
                
    };
}


/*
select options keep the value of the select dropdowns

Book.author select options are stored in 
Books
*/
export const updateSelectOptionResponse = (route, objectKey,data) => ({
    type: ActionType.SELECT_OPTION_RESPONSE,
    objectKey:objectKey,
    data:data,
    route:route
});


export function updateSelectOptionAction(route, objectKey, param, offset, limit) {
      
    return function (dispatch) {
        return ObjectApi.search(objectKey, param, offset, limit)
            .then((data) => {
                dispatch(updateSelectOptionResponse(route, objectKey, data[objectKey]))
                return data
            })
    };
}

export function updateRelationshipAction(objectKey, id, rel_name, data, offset, limit) {
    /*
        Called from ApiObjectContainer.handleSaveRelationship

        data: new value of the relationship
    */
    console.log(objectKey, id, rel_name, data, offset, limit)
    //const rel_type = ObjectApi.getRelationshipType(objectKey, id, rel_name)
    let rel_type = 'one'
    if(Array.isArray(data)){
        rel_type = 'many'
    }
    else if(data === null){
        rel_type = 'one'
    }
    
    data.action_type = rel_type
    return (dispatch) => {
        let api_data_payload = undefined
        if(data && data.action_type === 'one'){
            api_data_payload = dispatch(updateExistingResponse(ActionType.UPDATE_TOONE,objectKey,id,rel_name,data))
        }
        else {
            api_data_payload = dispatch(updateExistingResponse(ActionType.UPDATE_TOMANY,objectKey,id,rel_name,data))
        }
        console.log(api_data_payload)
        return ObjectApi.updateRelationship(objectKey, id, rel_name, data)
    }
}

export const getSingleResponse = data => ({
    type: ActionType.GET_SINGLE_RESPONSE,
    data: data
});

export function getSingleAction(objectKey, Id, requestArgs) {
    
    return (dispatch) => {
        console.log('getSingleAction',objectKey, Id)       
        return ObjectApi.getItem(objectKey, Id, requestArgs)
            .then(data => {
                dispatch(getSingleResponse(data));
                return data;
            }).catch(error => {
                throw error;
            });
    };
}

export const deleteResponse = () => ({
    type: ActionType.DELETE_RESPONSE
});

export function deleteAction(objectKey, Ids, offset, limit) {
    return (dispatch) => {
        return ObjectApi.deleteData(objectKey, Ids)
            .then(() => {
                dispatch(deleteResponse());
            }).then(() => {
                dispatch(getAction(objectKey, offset, limit));
            });
    };
}

