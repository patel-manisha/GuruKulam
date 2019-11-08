import * as constants from './constants'
import { apiUtils, webservice, functionUtils, asyncStorage } from '../../../utils';
import { Actions } from 'react-native-router-flux';



/* sctart loader action */
export function actionStartRequest() {
    return {
        type: constants.START_REQUEST_GALLERY
    };
}
/* end loader action */
export function actionEndRequest() {
    return {
        type: constants.END_REQUEST_GALLERY
    };
}
/* news action */
export function actionGetGellary(gallaryData) {

    return {
        type: constants.GET_GALLERY_DETAILS,
        gallaryData,
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
export function getGalleryDetails(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetGalleryDetails, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { CircularList } = resp.Results;
                console.log("GalleryList:::" + JSON.stringify(CircularList))
                dispatch(actionGetGellary(CircularList))
            } else {
                dispatch(actionGetMessage(ErrorMessage))
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}
