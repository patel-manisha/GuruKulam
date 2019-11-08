import createReducer from '../createReducer';
import * as constants from '../../actions/activityActions/constants';

const intialState = {
    activityData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const activityReducer = createReducer(intialState, {
    [constants.START_REQUEST_ACTIVITY](state, action) {
        return Object.assign({}, state, {
            isLoading: true
        })
    },
    [constants.END_REQUEST_ACIVITY](state, action) {
        return Object.assign({}, state, {
            isLoading: false
        })
    },
    [constants.GET_ACTIVITY](state, action) {

        return Object.assign({}, {
            activityData: action.activityData,
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