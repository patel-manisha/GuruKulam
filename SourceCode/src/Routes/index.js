import React, { Component } from 'react';
import { Platform, StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';

//import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import SplashScreen from 'react-native-splash-screen'
import { Scene, Router, Actions, Stack, Drawer } from 'react-native-router-flux';
import SideMenu from '../containers/SideMenu';
import constantUtils from '../utils/constantsUtils';
import images from '../themes/appImages';
import Home from '../containers/DrawerMenu/Home/Home';
import appStrings from '../themes/appStrings';
import SchoolCode from '../containers/Login/SchoolCode_Main';
import colors from '../themes/appColors';
import Login from '../containers/Login/Login';
import { asyncStorage } from '../utils';
import { ActionCreators } from '../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import News from '../containers/DashBoard/News';
import Circular from '../containers/DashBoard/Circular';
import CalendarScreen from '../containers/DashBoard/Calender';
import Assignment from '../containers/DashBoard/Assignment';
import HomeWork from '../containers/DashBoard/HomeWork';
import Fee from '../containers/DashBoard/Fee';
import Attendance from '../containers/DashBoard/Attandance';
import Query from '../containers/DashBoard/Query';
import Poll from '../containers/DashBoard/Poll';
import Gallery from '../containers/DashBoard/Gallery/Gallery';
import Canteen from '../containers/DashBoard/Canteen';
import Activities from '../containers/DashBoard/Activities';
import Myprofile from '../containers/DrawerMenu/MyProfile/Myprofile';
import Notice from '../containers/DashBoard/Notice';
import ZoomFullImage from '../containers/DashBoard/Gallery/ZoomFullImage';


export default class Routes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: '',
        }
    }
    componentDidMount() {

        if (Platform.OS == 'android') {
            SplashScreen.hide()
        }
        asyncStorage.getIsLogin().then((isLogin) => {
            this.setState({ isLogin: isLogin });
        })


    }

    render() {
        return (<Router>
            <Stack key="root"
                animationEnabled={true}
                transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })}
            >
                <Scene key="scoolcode" component={SchoolCode} title={appStrings.schoolCode} hideNavBar={true} initial={!this.state.isLogin} />
                <Scene key="login" component={Login} title={appStrings.schoolCode} hideNavBar={true} />
                {/* Dash board */}

                <Scene key="news" component={News} title={appStrings.news} hideNavBar={true} />
                <Scene key="circular" component={Circular} title={appStrings.circular} hideNavBar={true} />
                <Scene key="calendar" component={CalendarScreen} title={appStrings.calendar} hideNavBar={true} />
                <Scene key="fee" component={Fee} title={appStrings.fee} hideNavBar={true} />
                <Scene key="attendance" component={Attendance} title={appStrings.attendance} hideNavBar={true} />
                <Scene key="homework" component={HomeWork} title={appStrings.homework} hideNavBar={true} />
                <Scene key="assignment" component={Assignment} title={appStrings.assignment} hideNavBar={true} />
                <Scene key="query" component={Query} title={appStrings.query} hideNavBar={true} />
                <Scene key="poll" component={Poll} title={appStrings.poll} hideNavBar={true} />
                <Scene key="gallery" component={Gallery} title={appStrings.gallery} hideNavBar={true} />
                <Scene key="canteen" component={Canteen} title={appStrings.canteen} hideNavBar={true} />
                <Scene key="notice" component={Notice} title={appStrings.notice} hideNavBar={true} />
                <Scene key="mediaView" component={ZoomFullImage} title={appStrings.activities} hideNavBar={true} />
                <Scene key="activities" component={Activities} title={appStrings.activities} hideNavBar={true} />
                {/* Drawer */}
                <Drawer key="drower"
                    hideNavBar={true}
                    contentComponent={SideMenu}
                    title={appStrings.dashBoard}
                    titleStyle={{ alignItems: 'center', color: colors.white, backgroundColor: colors.perple }}
                    drawerWidth={constantUtils.WIDTH - 60}
                    drawerImage={images.iconMenu
                    }
                    initial={this.state.isLogin}>
                    <Scene key="home" component={Home} title={appStrings.dashBoard} hideNavBar={true} />
                    <Scene key="myProfile" component={Myprofile} title={appStrings.myProfile} hideNavBar={true} />

                </Drawer>

            </Stack>
        </Router >)
    }
}




/* Redux method for diapatch acrtion and get state data */
/* const mapStateToProps = state => {
    return {

    }
} */


/* const Routes = () => (
    <Router>
        <Stack key="root">
            <Scene key="login" component={Login} title="Login" hideNavBar={true} />

        </Stack>
    </Router>
);
export default Routes; */