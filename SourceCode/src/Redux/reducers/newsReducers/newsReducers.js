import createReducer from '../createReducer';
import * as constants from '../../actions/newsActions/constants';

const intialState = {
    newsData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const newsReducer = createReducer(intialState, {
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
    [constants.GET_NEWS](state, action) {

        return Object.assign({}, {
            newsData: action.news,
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