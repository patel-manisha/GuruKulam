import * as constants from './constants'
import { apiUtils, webservice, functionUtils, asyncStorage } from '../../../utils';
import { Actions } from 'react-native-router-flux';


/* sctart loader action */
export function actionStartRequest() {
    return {
        type: constants.START_REQUEST_ACTIVITY
    };
}
/* end loader action */
export function actionEndRequest() {
    return {
        type: constants.END_REQUEST_ACIVITY
    };
}
/* news action */
export function actionGetActivity(activityData) {

    return {
        type: constants.GET_ACTIVITY,
        activityData,
        ErrorMessage: '',
    };
}
export function actionGetMessage(msg) {
    return {
        type: constants.GET_MESSAGE,
        msg,
    }
}

/* validate news api */
export function getActivityDetails(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetActivityDetails, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { NewsList } = resp.Results;
                dispatch(actionGetActivity(NewsList))
            } else {
                dispatch(actionGetMessage(ErrorMessage))
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}
