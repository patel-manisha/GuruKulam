import createReducer from '../createReducer';
import * as constants from '../../actions/assignmentActions/constants';

const intialState = {
    assignmentData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const assignmentsReducer = createReducer(intialState, {
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
    [constants.GET_ASSIGNMENTS](state, action) {

        return Object.assign({}, {
            assignmentData: action.assignmentData,
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