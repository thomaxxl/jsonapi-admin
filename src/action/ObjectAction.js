import * as ActionType from './ActionType';
import ObjectApi from '../api/ObjectApi';


// TODO: make the ActionTypes generic

export const getResponse = data => ({
    type: ActionType.GET_RESPONSE,
    data
});


export function getAction(objectKey, offset, limit) {
    return (dispatch) => {        
        return ObjectApi.getAllDatas( objectKey, offset, limit )
            .then(data => {
                dispatch({...getResponse(data)});
            }).catch(error => {
                throw error;
            });
    };
};

export const updateExistingResponse = () => ({
    type: ActionType.UPDATE_EXISTING_RESPONSE
});

export const addNewResponse = () => ({
    type: ActionType.ADD_NEW_RESPONSE
});


export function saveAction(objectKey, BeingAddedOrEdited, offset, limit) {
    return function (dispatch) {
        return ObjectApi.saveData(objectKey, BeingAddedOrEdited)
            .then(() => {
                if (BeingAddedOrEdited.id) {
                    dispatch(updateExistingResponse());
                } else {
                    dispatch(addNewResponse());
                }
            }).then(() => {
                dispatch(getAction(objectKey, offset, limit));
            });
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
