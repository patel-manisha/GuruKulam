import createReducer from '../createReducer';
import * as constants from '../../actions/attendanceActions/constants';

const intialState = {
    attendanceData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const attendanceReducer = createReducer(intialState, {
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
    [constants.GET_ATTENDANCE](state, action) {

        return Object.assign({}, {
            attendanceData: action.attendanceData,
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