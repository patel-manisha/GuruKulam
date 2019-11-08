import * as constants from './constants'
import { apiUtils, webservice, functionUtils, asyncStorage } from '../../../utils';
import { Actions } from 'react-native-router-flux';



/* sctart loader action */
export function actionStartRequest() {
    return {
        type: constants.START_REQUEST_MYPROFILE
    };
}
/* end loader action */
export function actionEndRequest() {
    return {
        type: constants.END_REQUEST_MYPROFILE
    };
}
/* news action */
export function actionGetMyProfile(myProfile) {

    return {
        type: constants.GET_MYPROFILE_DETAILS,
        myProfile,
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
export function getMyProfileDetails(params) {

    return (dispatch) => {
       // dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetMyProfileDetails, params).then(resp => {
           // dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { MyProfile } = resp.Results;
                console.log("MyProfile:::" + JSON.stringify(MyProfile))
                dispatch(actionGetMyProfile(MyProfile))
            } else {
                dispatch(actionGetMessage(ErrorMessage))
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}
