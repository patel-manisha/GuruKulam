import createReducer from '../createReducer';
import * as constants from '../../actions/myProfileActions/constants';

const intialState = {
    myProfileData: {},
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const myProfileReducers = createReducer(intialState, {
    [constants.START_REQUEST_MYPROFILE](state, action) {
        return Object.assign({}, state, {
            isLoading: true
        })
    },
    [constants.END_REQUEST_MYPROFILE](state, action) {
        return Object.assign({}, state, {
            isLoading: false
        })
    },
    [constants.GET_MYPROFILE_DETAILS](state, action) {

        return Object.assign({}, {
            myProfileData: action.myProfile,
            isLoading: false,
        })
    },
    [constants.GET_MESSAGE](state, action) {

        return Object.assign({}, {
            errorMsg: action.msg,
            isLoading: false,
        })
    },

});