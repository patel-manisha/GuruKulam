import createReducer from '../createReducer';
import * as constants from '../../actions/noticeActions/constants';

const intialState = {
    noticeData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const noticeReducer = createReducer(intialState, {
    [constants.START_REQUEST_NOTICE](state, action) {
        return Object.assign({}, state, {
            isLoading: true
        })
    },
    [constants.END_REQUEST_NOTICE](state, action) {
        return Object.assign({}, state, {
            isLoading: false
        })
    },
    [constants.GET_NOTICE](state, action) {

        return Object.assign({}, {
            noticeData: action.noticeData,
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