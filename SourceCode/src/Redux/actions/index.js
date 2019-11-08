
import * as authenticationActions from './authenticationActions/authActions';
import * as newsActions from './newsActions/newsActions';
import * as circularActions from './circularActions/circularActions';
import * as assignmentActions from './assignmentActions/assignmentActions';
import * as homeworkActions from './homeworkActions/homeworkActions';
import * as calanderActions from './calendarActions/calenderActions';
import * as feeActions from './feeActions/feeActions';
import * as attendanceActions from './attendanceActions/attendanceActions';
import * as pollActions from './pollActions/pollAction';
import * as galleryActions from './galleryActions/galleryActions';
import * as myProfileActions from './myProfileActions/myProfileActions';
import * as noticeActions from './noticeActions/noticeActions';
import * as activityActions from './activityActions/activityActions';
import * as canteenActions from './canteenActions/canteenActions';

export const ActionCreators = Object.assign({},

    authenticationActions, newsActions, circularActions, assignmentActions,
    homeworkActions, calanderActions, feeActions, attendanceActions, pollActions,
    galleryActions,myProfileActions,noticeActions,activityActions,canteenActions

)
