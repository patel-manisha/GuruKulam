import createReducer from '../createReducer';
import * as constants from '../../actions/authenticationActions/constants';

const intialState = {
    schoolCodeData: null,
    isLoading: false,
    campusListData: null,
    batchListData: null,
    loginData: null,
    orgId: null,
};
/* authenticationReducer */
export const authenticationReducer = createReducer(intialState, {
    [constants.START_REQUEST](state, action) {
        return Object.assign({}, state, {
            isLoading: true
        })
    },
    [constants.END_REQUEST](state, action) {
        return Object.assign({}, state, {
            isLoading: false
        })
    },
    [constants.GET_SCHOOL_CODE](state, action) {
        console.log("action.orgId::" + action.orgId);
        return Object.assign({}, {
            schoolCodeData: action.schoolCodeData,
            orgId: action.orgId,
            isLoading: false,
        })
    },
    [constants.GET_CAMPUS_LIST](state, action) {
        return Object.assign({}, {
            campusListData: action.campusData,
            isLoading: false,
        })
    },
    [constants.GET_BATCHLIST_BY_CAMPUSID](state, action) {
        return Object.assign({}, {
            batchListData: action.batchList,
            isLoading: false,
        })
    },
    [constants.GET_LOGIN](state, action) {
        return Object.assign({}, {
            loginData: action.loginData,
            isLoading: false,
        })
    },
});