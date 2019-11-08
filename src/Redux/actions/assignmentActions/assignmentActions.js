import * as constants from './constants'
import { apiUtils, webservice, functionUtils, asyncStorage } from '../../../utils';
import { Actions } from 'react-native-router-flux';



/* sctart loader action */
export function actionStartRequest() {
    return {
        type: constants.START_REQUEST
    };
}
/* end loader action */
export function actionEndRequest() {
    return {
        type: constants.END_REQUEST
    };
}
/* news action */
export function actionGetAssignments(assignmentData) {

    return {
        type: constants.GET_ASSIGNMENTS,
        assignmentData,
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
export function getAssignmentsDetails(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetAssignmentDetails, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { AssignmentList } = resp.Results;
                dispatch(actionGetAssignments(AssignmentList))
            } else {
                dispatch(actionGetMessage(ErrorMessage))
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}
