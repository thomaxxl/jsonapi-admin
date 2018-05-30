import * as ActionType from './ActionType';
import ObjectApi from '../api/ObjectApi';

export const getResponse = data => ({
    type: ActionType.GET_USERS_RESPONSE,
    data
});


export function getAction() {
    return (dispatch) => {
        return ObjectApi.getAllDatas()
            .then(data => {
                dispatch(getResponse(data));
            }).catch(error => {
                throw error;
            });
    };
};

export const updateExistingResponse = () => ({
    type: ActionType.UPDATE_EXISTING_USER_RESPONSE
});

export const addNewResponse = () => ({
    type: ActionType.ADD_NEW_USER_RESPONSE
});


export function saveAction(BeingAddedOrEdited) {
    return function (dispatch) {
        return ObjectApi.saveData(BeingAddedOrEdited)
            .then(() => {
                if (BeingAddedOrEdited.id) {
                    dispatch(updateExistingResponse());
                } else {
                    dispatch(addNewResponse());
                }
            }).then(() => {
                dispatch(getAction());
            });
    };
}

export const getSingleResponse = data => ({
    type: ActionType.GET_SINGLE_RESPONSE,
    data: data
});

export function getSingleAction(Id) {
    return (dispatch) => {
        return ObjectApi.getData(Id)
            .then(data => {
                dispatch(getSingleResponse(data));
            }).catch(error => {
                throw error;
            });
    };
}

export const deleteResponse = () => ({
    type: ActionType.DELETE_USER_RESPONSE
});

export function deleteAction(Id) {
    return (dispatch) => {
        return ObjectApi.deleteData(Id)
            .then(() => {
                dispatch(deleteResponse());
            }).then(() => {
                dispatch(getAction());
            });
    };
}
