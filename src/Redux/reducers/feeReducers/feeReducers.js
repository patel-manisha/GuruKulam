import createReducer from '../createReducer';
import * as constants from '../../actions/feeActions/constants';

const intialState = {
    feeData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const feeReducer = createReducer(intialState, {
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
    [constants.GET_FEES](state, action) {

        return Object.assign({}, {
            feeData: action.feeData,
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