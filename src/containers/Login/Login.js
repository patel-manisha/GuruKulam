import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, TextInput, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { images, appStrings, colors, stylesConfig } from '../../themes';
import { GreenButton } from '../../components/Button_C/Button_C';
import DeviceInfo from 'react-native-device-info';
import { ActionCreators } from '../../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { functionUtils, asyncStorage } from '../../utils';
import { Dropdown } from 'react-native-material-dropdown';
import { firebase } from 'react-native-firebase';
import NetInfo from "@react-native-community/netinfo";
import { CustomAcivityIndicator } from '../../components/ActivityIndicator/activityIndicator';
const TAG = appStrings.login

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fcmToken: '',
            text: '',
            schoolCode: '',
            schoolData: [],
            yearData: [],
            campusId: '',
            batchId: '',
            userName: '',
            password: '',
            orgId: '',

        }
        this._onLogin = this._onLogin.bind(this);

    }
    componentDidMount() {

        /*   asyncStorage.getFcmToken().then((token) => {
              console.log(TAG, "token.." + token)
              this.setState({ fcmToken: token })
          }) */
        asyncStorage.getSchoolCode().then((code) => {
            console.log(TAG, "code:::" + code)
            this.setState({ schoolCode: code }, function () {
                this.getSchoolData()
            })
        })
        asyncStorage.getOrganizationId().then((orgId) => {
            this.setState({ orgId: orgId }, function () {
                this.checkPermission();
            })
        })
    }

    async checkPermission() {
        this.getToken();
        /*  const enabled = await firebase.messaging().hasPermission();
         if (enabled) {
             this.getToken();
         } else {
             this.requestPermission();
         } */
    }
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }
    async getToken() {

        let fcmToken = await asyncStorage.getFcmToken();
        console.log(TAG, "getToken out side ", fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log(TAG, "getToken inside ", fcmToken);
            if (fcmToken) {
                // user has a device token
                asyncStorage.setFcmToken(fcmToken)
            }
        }

    }

    /* Load school data */
    getSchoolData = () => {
        var tempSchool = [];
        const inputData = JSON.stringify({ SchoolCode: this.state.schoolCode })
        this.props.getCampusList(inputData).then(() => {
            const campusList = this.props.schoolData.Results.CampusList;
            console.log(TAG, "SchoolDATA:::" + JSON.stringify(campusList));
            if (campusList.length > 0) {

                for (let schoolList of campusList) {
                    tempSchool.push({ 'value': schoolList.Id, 'label': schoolList.Name })
                    console.log(TAG, "tempSchool ID :" + tempSchool);
                }
                for (let i = 0; i < campusList.length; i++) {
                    if (i == 0) {
                        this.setState({ campusId: campusList[i].Id });
                    }
                }

                this.setState({ schoolData: tempSchool }, function () {
                    // In this block you can do something with new state.

                    this.getYearData();
                });
            }

        });
    }
    /* Load year base on selected school  */
    getYearData() {
        var tempBatchList = [];
        const { campusId, schoolCode } = this.state;
        const inputData = JSON.stringify({ SchoolCode: schoolCode, CampusId: campusId });
        this.props.getBatchList(inputData).then(() => {
            const yearList = this.props.yearList.Results.BatchList;
            console.log(TAG, "yearList:::" + JSON.stringify(yearList));
            if (yearList.length > 0) {

                for (let batchList of yearList) {
                    tempBatchList.push({ 'value': batchList.Id, 'label': batchList.Name })

                }
                for (let i = 0; i < yearList.length; i++) {
                    if (i == 0) {
                        this.setState({ batchId: yearList[i].Id });
                    }
                }

                this.setState({ yearData: tempBatchList }, function () {
                    // In this block you can do something with new state.


                });
            }
        });

    }


    /* Login with user details */
    _onLogin() {
        asyncStorage.getFcmToken().then((token) => {
            console.log(TAG, "_onLogin....token.." + token)
            this.callLoginApi(token)
        })




    }
    callLoginApi = (fcmToken) => {
        const { schoolCode, batchId, campusId, orgId, userName, password } = this.state;
        var deviceType;
        console.log(TAG, "callLoginApi fcmToken::" + fcmToken)
        DeviceInfo.getDeviceType().then(deviceType => {
            console.log(TAG, "deviceType::" + deviceType)
            deviceType = deviceType;
        });
        console.log(TAG, "deviceType::" + JSON.stringify(deviceType), "orgId::" + orgId, "school code" + schoolCode, "batch id::" + batchId, "Campusid::" + campusId);
        if (campusId.length == 0) {
            functionUtils.showAlert(appStrings.enterSchool)
        } else if (batchId.length == 0) {
            functionUtils.showAlert(appStrings.enterYear)
        } else if (userName.trim().length == 0) {
            functionUtils.showAlert(appStrings.enterUserName)
        } else if (password.length == 0) {
            functionUtils.showAlert(appStrings.enterpwd)
        } else {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    const inputData = JSON.stringify({ SchoolCode: schoolCode, OrgId: orgId, CampusId: campusId, SchoolBatchId: batchId, UserName: userName, Password: password, DeviceType: deviceType, DeviceToken: fcmToken });

                    this.props.getLogin(inputData);
                } else {
                    functionUtils.showToast(appStrings.internetConnection)
                }
            });
        }

    }
    /* School change  */
    _onSchoolChange = (txtCampusId) => {
        this.setState({ campusId: txtCampusId, }, function () {

            this.getYearData();
        })
    }
    /* Year change  */
    _onBatchChange = (txtbatchId) => {
        this.setState({ batchId: txtbatchId, }, function () {
        })
    }
    /* Render method */
    render() {

        const { schoolData, yearData, campusId, batchId, userName, password } = this.state;
        return (
            <ImageBackground source={images.iconBg} style={{ width: '100%', height: '100%' }}>

                <View style={{ alignSelf: 'center', height: '95%', width: '90%', }}>
                    <Image style={{ height: '40%', width: '100%', resizeMode: 'contain' }} source={images.iconGurukulamLogo_s} />
                    <View style={{ justifyContent: 'center', }}>
                        {/* Droupdown for school selection */}
                        <Dropdown
                            placeholder={appStrings.selectSchool}
                            dropdownOffset={{ top: 0, }}
                            containerStyle={{ backgroundColor: colors.white, borderRadius: 5, borderColor: colors.maroon, borderWidth: 2 }}
                            onChangeText={this._onSchoolChange}
                            data={schoolData}
                            value={campusId}


                        />
                        {/* Droupdown for year selection */}
                        <View style={{ marginTop: 10 }}>
                            <Dropdown
                                placeholder={appStrings.selectYear}
                                dropdownOffset={{ top: 0, }}
                                containerStyle={{ backgroundColor: colors.white, borderRadius: 5, borderColor: colors.maroon, borderWidth: 2 }}
                                onChangeText={this._onBatchChange}
                                data={yearData}
                                value={batchId}


                            />
                        </View>
                        {/* Username/password input feild */}
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                placeholder={appStrings.userName}
                                value={userName}
                                returnKeyType={'next'}
                                onSubmitEditing={() => { this.password.focus(); }}
                                blurOnSubmit={false}
                                onChangeText={(text) => { this.setState({ userName: text }) }}
                                style={stylesConfig.textFeildStyle}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <TextInput
                                ref={(input) => { this.password = input; }}
                                placeholder={appStrings.password}
                                value={password}
                                returnKeyType={'done'}
                                secureTextEntry={true}

                                onChangeText={(text) => { this.setState({ password: text }) }}
                                style={stylesConfig.textFeildStyle}
                            />
                        </View>
                        {/* Login button */}

                        <GreenButton onPress={this._onLogin} title={appStrings.login} />
                    </View>
                </View>
                {/* Loader */}
                <CustomAcivityIndicator isLoading={this.props.loading} />
            </ImageBackground>

        );
    }
}
/* Redux method for diapatch acrtion and get state data */
const mapStateToProps = state => {
    return {
        loading: state.authenticationReducer.isLoading,
        schoolData: state.authenticationReducer.campusListData,
        yearList: state.authenticationReducer.batchListData,
        orgId: state.authenticationReducer.orgId,
        codeData: state.authenticationReducer.schoolCodeData,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);