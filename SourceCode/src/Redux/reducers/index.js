import { combineReducers } from 'redux'
import * as authReducers from './authenticationReducers/authReducers'
import * as newsReducers from './newsReducers/newsReducers';
import * as circularReducers from './circularReducers/circularReducers';
import * as assignmentReducers from './assignmentReducers/assignmentReducers';
import * as homeworkReducers from './homeworkReducers/homeworkReducers';
import * as calanderReducers from './calanderReducers/calanderReducers';
import * as feeReducers from './feeReducers/feeReducers';
import * as attendanceReducers from './attendanceReducers/attendanceReducers';
import * as pollReducers from './pollReducers/pollReducers';
import * as galleryReducers from './galleryReducers/galleryReducers';
import * as myProfileReducers from './myProfileReducers/myProfileReducers';
import * as noticeReducers from './noticeReduceers/noticeReducers';
import * as activityReducers from './activityReducers/activityReducers';
import * as canteenReducers from './canteenReducers/canteenReducers';

export default combineReducers(Object.assign({}, authReducers, newsReducers, circularReducers,
    assignmentReducers, homeworkReducers, calanderReducers, feeReducers, attendanceReducers, pollReducers,
    galleryReducers, myProfileReducers, noticeReducers, activityReducers, canteenReducers

))
