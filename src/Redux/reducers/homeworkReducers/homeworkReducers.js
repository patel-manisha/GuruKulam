import createReducer from '../createReducer';
import * as constants from '../../actions/homeworkActions/constants';

const intialState = {
    homeworkData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const homeworkReducer = createReducer(intialState, {
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
    [constants.GET_HOMWORK](state, action) {

        return Object.assign({}, {
            homeworkData: action.homeworkData,
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