import * as ActionType from './ActionType';

export const getModalResponse = Modal => ({
    type: ActionType.GET_MODAL_RESPONSE,
    Modal
});

export function getModalAction(modal) {
    return (dispatch) => {
        setTimeout(()=>{
            dispatch(getModalResponse(modal));
        },50);
    };
}

export const getAnalyzeResponse = Modal => ({
    type: ActionType.GET_ANALYZE_RESPONSE,
    Modal
});

export function getAnalyzeAction(modal) {
    return (dispatch) => {
        setTimeout(()=>{
            dispatch(getAnalyzeResponse(modal));
        },50);
    };
}