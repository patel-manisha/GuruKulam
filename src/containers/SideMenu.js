import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, Alert, Image, ImageBackground, TouchableHighlight } from 'react-native';
import images from '../themes/appImages';
import appStyleConfig from '../themes/appStyleConfig';
import colors from '../themes/appColors';
import FunctionUtils from '../utils/functionUtils';
import fonts from '../themes/appFonts';
import appStrings from '../themes/appStrings';
import { Actions } from 'react-native-router-flux';
import { asyncStorage, functionUtils } from '../utils';
import { ActionCreators } from '../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import dimens from '../themes/appDimention';
const menuItem = [{ img: images.iconHome, name: appStrings.home }, { img: images.iconProfile, name: appStrings.myProfile }, { img: images.iconManageAc, name: appStrings.manageAccount }
    , { img: images.iconNotification, name: appStrings.notification }, { img: images.iconLogout, name: appStrings.logout }]

const TAG = "SideMenu";
class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            userImg: '',
        }
    }
    componentDidMount() {
        asyncStorage.getOrganizationData().then((data) => {
            const orgData = JSON.parse(data);
            console.log(TAG, "orgData:::", orgData)

            this.getMyProfileDetails(orgData);
        })
    }


    getMyProfileDetails(orgData) {
        const { SchoolCode, OrgId, CampusId, SchoolBatchId, UserId, UserType, ObjectId } = orgData;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {

                const inputData = JSON.stringify({
                    SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId,
                    SchoolBatchId: SchoolBatchId, UserId: UserId, ObjectId: ObjectId, UserType: UserType

                });
                this.props.getMyProfileDetails(inputData).then(() => {
                    const { myProfileData } = this.props;
                    const { UserName, FullName, Photo, GRNumber, ClassDivision,
                        ParentContact, ParentEmail, StudentContact, StudentEmail,
                        BirthDate, BloodGroup, FullAddress, House } = myProfileData;
                    this.setState({ name: FullName, userImg: Photo })
                    console.log(TAG, "getMyProfileDetails::" + JSON.stringify(myProfileData))


                });
            } else {
                functionUtils.showToast(appStrings.internetConnection)
            }
        });
    }



    _onMenuItemSelection = (name) => {
        console.log(TAG, "_onMenuItemSelection ::", name)
        if (name == appStrings.logout) {
            this.logout()
        } else if (name == appStrings.myProfile) {
            Actions.myProfile();
        }
        Actions.drawerClose()
    }
    logout = () => {
        Alert.alert(
            appStrings.appName,
            appStrings.logoutAlertMsg,
            [{ text: 'No', onPress: () => console.log('onPress') },
            { text: 'Yes', onPress: () => this.onLogout() }]
        )
    }
    onLogout = () => {
        asyncStorage.clearPref();
        Actions.scoolcode({ type: 'reset' })
    }
    render() {
        const { name, userImg } = this.state;
        return (<View style={appStyleConfig.container}>
            <ImageBackground source={images.iconBg} style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <ImageBackground source={images.iconUserDefault} imageStyle={{ borderRadius: dimens.verticalScale100 / 2, borderWidth: 2, borderColor: colors.white, backgroundColor: colors.perple, }} style={{ height: dimens.verticalScale100, width: dimens.verticalScale100 }}>
                        <Image style={{ height: dimens.verticalScale70, width: dimens.verticalScale70, }} source={{ uri: userImg }} />
                    </ImageBackground>
                    <Text style={{ textAlign: 'center', marginTop: 5, color: colors.black, fontSize: FunctionUtils.normalize(15), fontFamily: fonts.proximaNovaBold }}>{name}</Text>
                </View>
            </ImageBackground>
            {menuItem.map((item, index) => {
                return (<TouchableHighlight key={index.toString()} underlayColor={colors.transparant} onPress={() => this._onMenuItemSelection(item.name)}>

                    <View>
                        {index == 0 ? null : < View style={styles.grayDivider} />}
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image source={item.img} style={{ marginLeft: 10, height: 25, width: 25, resizeMode: 'contain' }} />
                            <Text style={{ marginLeft: 10, padding: 10, color: colors.black, fontFamily: fonts.proximaNovaSemiBold, fontSize: FunctionUtils.normalize(15) }}>{item.name}</Text>
                        </View>


                    </View>
                </TouchableHighlight>
                )
            })}

        </View>


        );
    }
}
/* Redux method for diapatch acrtion and get state data */
const mapStateToProps = state => {
    return {
        loading: state.myProfileReducers.isLoading,
        errorMsg: state.myProfileReducers.errorMsg,
        myProfileData: state.myProfileReducers.myProfileData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
const styles = StyleSheet.create({
    grayDivider: { backgroundColor: colors.gray, height: 1 }
})