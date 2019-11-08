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
export function actionGetCalander(calanderData) {

    return {
        type: constants.GET_CALANDER,
        calanderData,
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
export function getCalanderDetails(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetCalendarDetails, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { CalendarList } = resp.Results;
                dispatch(actionGetCalander(CalendarList))
            } else {
                dispatch(actionGetMessage(ErrorMessage))
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}
