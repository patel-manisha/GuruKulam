import * as constants from './constants'
import { apiUtils, webservice, functionUtils, asyncStorage } from '../../../utils';
import { Actions, ActionConst } from 'react-native-router-flux';


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
/* school code action */
export function actionGetSchoolCode(schoolCodeData) {
    const orgId = schoolCodeData.Results.OrganizationId;
    console.log("orgId:::" + orgId);

    return {
        type: constants.GET_SCHOOL_CODE,
        orgId: schoolCodeData.Results.OrganizationId,
        schoolCodeData,
    };
}
/* campus list action */
export function actionGetCampusList(campusData) {
    return {
        type: constants.GET_CAMPUS_LIST,
        campusData,
    };
}
/*  actionGetBatchListByCampusId*/
export function actionGetBatchListByCampusId(batchList) {
    return {
        type: constants.GET_BATCHLIST_BY_CAMPUSID,
        batchList,
    };
}
/* login action */

export function actionGetLogin(loginData) {
    return {
        type: constants.GET_LOGIN,
        loginData,
    };
}
/* validate school code api */
export function getSchoolCode(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiIsValidSchoolCode, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp
            if (Status == 200) {
                dispatch(actionGetSchoolCode(resp))
                const { SchoolCode, OrganizationId } = resp.Results;

                asyncStorage.setSchoolCode(SchoolCode)
                asyncStorage.setOrganizationId(OrganizationId);
                Actions.login();
            } else {
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}
/* Campus list api */

export function getCampusList(params) {

    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiCampusList, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp
            if (Status == 200) {
                dispatch(actionGetCampusList(resp))

            } else {
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}
/* Batch list api */
export function getBatchList(params) {

    return (dispatch) => {
        // dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetBatchListByCampusId, params).then(resp => {
            // dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp
            if (Status == 200) {
                dispatch(actionGetBatchListByCampusId(resp))

            } else {
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            //  dispatch(actionEndRequest())
        })
    }
}
/* Get login api */
export function getLogin(params) {


    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiLogin, params).then(resp => {
            dispatch(actionEndRequest())

            const { Status, ErrorMessage } = resp
            if (Status == 200) {
                dispatch(actionGetLogin(resp))
                asyncStorage.setIsLogin(1);
                const { UserId, UserType, ObjectId, ModuleList } = resp.Results;
                const orgData = JSON.parse(params)
                const { SchoolCode, OrgId, CampusId, SchoolBatchId } = orgData;
                const tempData = {
                    SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId,
                    SchoolBatchId: SchoolBatchId, UserId: UserId, UserType: UserType, ObjectId: ObjectId
                };

                console.log("getLogin", "ModuleList::", ModuleList)
                asyncStorage.setOrganizationData(JSON.stringify(tempData));
                asyncStorage.setLoginData(ModuleList)
                Actions.replace('home');
                // Actions.drawerMenu({ type: ActionConst.RESET })

            } else {
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}


/* Force update */
export function getAppVersion(params) {
    console.log("getAppVersion...params::." + JSON.stringify(params))
    return (dispatch) => {
        dispatch(actionStartRequest())
        return apiUtils.post(webservice.apiGetAppVersion, params).then(resp => {
            dispatch(actionEndRequest())
            console.log("getAppVersion...." + JSON.stringify(resp))
            const { Status, ErrorMessage } = resp

            if (Status == 200) {
                const { OldVersion, NewVersion } = resp.Results;
                console.log("getAppVersion OldVersion...." + OldVersion)
            } else {
                functionUtils.showAlert(ErrorMessage)
            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })
    }
}