import * as constants from './constants'
import { apiUtils, webservice, functionUtils, asyncStorage } from '../../../utils';
import { Actions } from 'react-native-router-flux';


/* sctart loader action */
export function actionStartRequest() {
    return {
        type: constants.START_REQUEST_NOTICE
    };
}
/* end loader action */
export function actionEndRequest() {
    return {
        type: constants.END_REQUEST_NOTICE
    };
}
/* news action */
export function actionGetNotice(noticeData) {

    return {
        type: constants.GET_NOTICE,
        noticeData,
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
export function getNoticeDetails(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetNoticeDetails, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { CircularList } = resp.Results;
                dispatch(actionGetNotice(CircularList))
            } else {
                dispatch(actionGetMessage(ErrorMessage))
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}
