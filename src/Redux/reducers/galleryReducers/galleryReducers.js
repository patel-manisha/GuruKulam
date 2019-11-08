import createReducer from '../createReducer';
import * as constants from '../../actions/galleryActions/constants';

const intialState = {
    galleryData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const galleryReducers = createReducer(intialState, {
    [constants.START_REQUEST_GALLERY](state, action) {
        return Object.assign({}, state, {
            isLoading: true
        })
    },
    [constants.END_REQUEST_GALLERY](state, action) {
        return Object.assign({}, state, {
            isLoading: false
        })
    },
    [constants.GET_GALLERY_DETAILS](state, action) {

        return Object.assign({}, {
            galleryData: action.gallaryData,
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