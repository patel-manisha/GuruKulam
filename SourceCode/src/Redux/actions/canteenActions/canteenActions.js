import * as constants from './constants'
import { apiUtils, webservice, functionUtils, asyncStorage } from '../../../utils';
import { Actions } from 'react-native-router-flux';


/* sctart loader action */
export function actionStartRequest() {
    return {
        type: constants.START_REQUEST_CAENTEEN
    };
}
/* end loader action */
export function actionEndRequest() {
    return {
        type: constants.END_REQUEST_CANTEEN
    };
}
/* news action */
export function actionGetCampusCanteenList(campusCanteenList) {

    return {
        type: constants.GET_CAMPUS_CANTEEN_LIST,
        campusCanteenList,
        ErrorMessage: '',
    };
}

export function actionGetCanteenMenuItemList(canteenMenuItemList) {

    return {
        type: constants.GET_CANTEEN_MENU_ITEM_LIST,
        canteenMenuItemList,
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
export function getCampusCanteeenListDetails(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetCampusCanteenList, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { CanteenList } = resp.Results;
                dispatch(actionGetCampusCanteenList(CanteenList))
            } else {
                dispatch(actionGetMessage(ErrorMessage))
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}


export function getCanteeenMenuItemListDetails(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetCanteenMenuItemList, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { CanteenList } = resp.Results;
                dispatch(actionGetCanteenMenuItemList(CanteenList))
            } else {
                dispatch(actionGetMessage(ErrorMessage))
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}