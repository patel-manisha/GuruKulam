import createReducer from '../createReducer';
import * as constants from '../../actions/calendarActions/constants';

const intialState = {
    calanderData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const calanderReducer = createReducer(intialState, {
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
    [constants.GET_CALANDER](state, action) {

        return Object.assign({}, {
            calanderData: action.calanderData,
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