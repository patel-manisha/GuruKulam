import createReducer from '../createReducer';
import * as constants from '../../actions/circularActions/constants';

const intialState = {
    circularData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const circularsReducer = createReducer(intialState, {
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
    [constants.GET_CIRCULAR](state, action) {

        return Object.assign({}, {
            circularData: action.circularData,
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