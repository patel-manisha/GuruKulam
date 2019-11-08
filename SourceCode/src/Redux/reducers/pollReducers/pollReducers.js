import createReducer from '../createReducer';
import * as constants from '../../actions/pollActions/constants';

const intialState = {
    pollData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const pollReducer = createReducer(intialState, {
    [constants.START_REQUEST_POLL](state, action) {
        return Object.assign({}, state, {
            isLoading: true
        })
    },
    [constants.END_REQUEST_POLL](state, action) {
        return Object.assign({}, state, {
            isLoading: false
        })
    },
    [constants.GET_POLL_DETAILS](state, action) {

        return Object.assign({}, {
            pollData: action.pollData,
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