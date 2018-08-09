import * as ActionType from './ActionType';
import ObjectApi from '../api/ObjectApi';

// TODO: make the ActionTypes generic

export const getResponse = data => ({
    type: ActionType.GET_RESPONSE,
    data
});

export function getAction(objectKey, offset, limit, ...queryArgs) {
    return (dispatch) => {    
        return ObjectApi.getAllDatas( objectKey, offset, limit, ...queryArgs )
            .then(data => {
                dispatch({...getResponse(data)});
            }).catch(error => {
                throw error
            });
    };
};

export const updateExistingResponse = (rel_or_not,objectKey, change_id, dataField, BeingAddedOrEdited) => ({
    type: ActionType.UPDATE_EXISTING_RESPONSE,
    objectKey:objectKey,
    rel_or_not:rel_or_not,
    dataField:dataField,
    change_id:change_id,
    item: BeingAddedOrEdited
});

export const addNewResponse = data => ({
    type: ActionType.ADD_NEW_RESPONSE,
    data
});



export function saveAction(objectKey, BeingAddedOrEdited, offset, limit,dataField) {
    console.log('track22')
    console.log(objectKey)
    console.log(BeingAddedOrEdited)
    console.log(dataField)
    return function (dispatch) {
        return ObjectApi.saveData(objectKey, BeingAddedOrEdited)
            .then((data) => {
                if (BeingAddedOrEdited.id) {
                    dispatch(updateExistingResponse(0,objectKey, BeingAddedOrEdited.id, dataField, BeingAddedOrEdited))
                } else {
                    dispatch(addNewResponse())
                }
                // dispatch(getAction(objectKey, offset, limit))
                return data.id
            }).catch(error => {
                throw error
            });
                
    };
}

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
                console.log("track_action_1")
                console.log(data[objectKey])
                console.log(objectKey)
                dispatch(updateSelectOptionResponse(route, objectKey, data[objectKey]))
            })
    };
}

export function updateRelationshipAction(objectKey, id, rel_name, data, offset, limit) {
    return function (dispatch) {
        return ObjectApi.updateRelationship(objectKey, id, rel_name, data)
            .then(() => {
                if (data && data.id) {
                    console.log('track_11_50')
                    console.log(rel_name)
                    console.log(id)
                    console.log(data)
                    dispatch(updateExistingResponse(1,objectKey,id,rel_name,data))
                } else {
                    dispatch(addNewResponse())
                }
            })
    };
}

export const getSingleResponse = data => ({
    type: ActionType.GET_SINGLE_RESPONSE,
    data: data
});

export function getSingleAction(objectKey, Id) {
    
    
    return (dispatch) => {
        return ObjectApi.getData(objectKey, Id)
            .then(data => {
                dispatch(getSingleResponse(data));
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

