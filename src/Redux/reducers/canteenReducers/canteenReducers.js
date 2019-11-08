import createReducer from '../createReducer';
import * as constants from '../../actions/canteenActions/constants';

const intialState = {
    campusCanteenListData: [],
    canteenMenuItemListData: [],
    isLoading: false,
    errorMsg: '',

};
/* authenticationReducer */
export const canteenReducer = createReducer(intialState, {
    [constants.START_REQUEST_CAENTEEN](state, action) {
        return Object.assign({}, state, {
            isLoading: true
        })
    },
    [constants.END_REQUEST_CANTEEN](state, action) {
        return Object.assign({}, state, {
            isLoading: false
        })
    },
    [constants.GET_CAMPUS_CANTEEN_LIST](state, action) {

        return Object.assign({}, {
            campusCanteenListData: action.campusCanteenList,
            isLoading: false,
        })
    },
    [constants.GET_CANTEEN_MENU_ITEM_LIST](state, action) {

        return Object.assign({}, {
            canteenMenuItemListData: action.canteenMenuItemList,
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