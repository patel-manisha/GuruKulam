import * as constants from './constants'
import { apiUtils, webservice, functionUtils, asyncStorage } from '../../../utils';
import { Actions } from 'react-native-router-flux';



/* sctart loader action */
export function actionStartRequest() {
    return {
        type: constants.START_REQUEST_POLL
    };
}
/* end loader action */
export function actionEndRequest() {
    return {
        type: constants.END_REQUEST_POLL
    };
}
/* news action */
export function actionGetPoll(pollData) {

    return {
        type: constants.GET_POLL_DETAILS,
        pollData,
        ErrorMessage: '',
    };
}
export function actionGetMessage(msg) {
    return {
        type: constants.GET_MESSAGE,
        msg,
    }
}

/* validate circular api */
export function getpollDetails(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetPoleDetails, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { PoleList } = resp.Results;
                console.log("PoleList:::" + JSON.stringify(PoleList))
                dispatch(actionGetPoll(PoleList))
            } else {
                dispatch(actionGetMessage(ErrorMessage))
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}
