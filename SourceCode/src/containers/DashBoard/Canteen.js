import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, Image, FlatList, TextInput, TouchableHighlight } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { appStrings, stylesConfig, colors, fonts, images } from '../../themes';
import { HeaderWithBackImage } from '../../components/Header_C/allHeader';
import { asyncStorage, functionUtils, apiUtils } from '../../utils';
import { ActionCreators } from '../../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import { CustomAcivityIndicator } from '../../components/ActivityIndicator/activityIndicator';
import { EmptyView } from '../../components/EmptyView/EmptyView,';
import DateTimePicker from "react-native-modal-datetime-picker";
import dimens from '../../themes/appDimention';
import { GreenButton } from '../../components/Button_C/Button_C';
import webService from '../../utils/webService';



const TAG = appStrings.canteen
class Canteen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            canteenId: '',
            canteenListData: [],
            isDateTimePickerVisible: false,
            txtSelectedDate: '',
            canteenMenuList: [],
            isDataExist: false,
            isEmpty: false,
            orgData: {},


        }
    }
    componentDidMount() {

        asyncStorage.getOrganizationData().then((data) => {
            const orgData = JSON.parse(data);
            console.log(TAG, "orgData:::", orgData)
            this.setState({ orgData: orgData }, function () {
                this.getCampusCanteenList();
            })

        })


    }
    getCampusCanteenList() {
        var tempCanteenList = [];
        const { orgData } = this.state;
        const { SchoolCode, OrgId, CampusId, SchoolBatchId, UserId, UserType, ObjectId } = orgData;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {

                const inputData = JSON.stringify({ SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId, SchoolBatchId: SchoolBatchId, UserId: UserId, ObjectId: ObjectId, UserType: UserType });
                this.props.getCampusCanteeenListDetails(inputData).then(() => {
                    console.log(TAG, "getCampusCanteeenListDetails::" + JSON.stringify(this.props.campusCanteenListData))
                    const canteenList = this.props.campusCanteenListData;
                    if (canteenList.length > 0) {

                        for (let canteenData of canteenList) {
                            tempCanteenList.push({ 'value': canteenData.Id, 'label': canteenData.Value })

                        }
                        for (let i = 0; i < canteenList.length; i++) {
                            if (i == 0) {
                                this.setState({ canteenId: canteenList[i].Id });
                            }
                        }

                        this.setState({ canteenListData: tempCanteenList }, function () {
                            // In this block you can do something with new state.


                        });

                    }

                });
            } else {
                functionUtils.showToast(appStrings.internetConnection)
            }
        });
    }
    _onCanteenChange = (txtCanteenId) => {
        this.setState({ canteenId: txtCanteenId, }, function () {
        })
    }
    /* On Date selection */
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        const strDate = functionUtils.convertDateToDate(date);
        console.log("A date has been picked: ", date);
        this.setState({ txtSelectedDate: strDate }, function () {
            this.hideDateTimePicker();
        })

    };
    /*On submit  */
    _onSubmit = () => {
        const { canteenId, txtSelectedDate } = this.state;
        if (canteenId.length == 0) {
            functionUtils.showAlert(appStrings.selectCanteen);
        } else if (txtSelectedDate.length == 0) {
            functionUtils.showAlert(appStrings.selectDate)
        } else {
            this.getCanteenMenuList();
        }
    }
    /* Call canteen menu list api */
    getCanteenMenuList = () => {
        this.setState({ isLoading: true }, function () {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    this.apiGetCampusCanteenMenuList();
                } else {
                    this.setState({ isLoading: false }, function () {
                        functionUtils.showToast(appStrings.internetConnection)
                    })

                }
            });
        })

    }
    apiGetCampusCanteenMenuList = () => {
        const { canteenId, txtSelectedDate, orgData } = this.state;
        const { SchoolCode, OrgId, CampusId, SchoolBatchId, UserId, UserType, ObjectId } = orgData;
        const inputData = JSON.stringify({
            SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId,
            SchoolBatchId: SchoolBatchId, UserId: UserId,
            ObjectId: ObjectId, UserType: UserType, CanteenId: canteenId, Date: txtSelectedDate
        });
        console.log(TAG, "inputData..." + JSON.stringify(inputData))

        apiUtils.post(webService.apiGetCanteenMenuItemList, inputData).then(resp => {
            this.setState({ isLoading: false })

            const { Status, ErrorMessage } = resp
            console.log(TAG, "apiGetCampusCanteenMenuList.." + JSON.stringify(resp))
            if (Status == 200) {
                const { CanteenList } = resp.Results;
                this.setState({ canteenMenuList: CanteenList, isEmpty: false, isDataExist: true }, function () {

                })
            } else {
                this.setState({ canteenMenuList: [], isEmpty: true, isDataExist: false }, function () {

                })

            }

        }).catch((ex) => {

            dispatch(actionEndRequest())
        })


    }
    renderItemView = ({ item, index }) => {

        return (<View style={[stylesConfig.cardView, { marginTop: index == 0 ? 0 : dimens.moderateScale10, padding: dimens.moderateScale10, }]}>
            <Text>Hello</Text>
        </View>)
    }
    render() {
        const { campusCanteenListData, loading, errorMsg } = this.props
        const { isDataExist, isEmpty, canteenId, canteenListData, isDateTimePickerVisible, txtSelectedDate, isLoading, canteenMenuList } = this.state;
        return (
            <View style={stylesConfig.container}>
                <HeaderWithBackImage title={appStrings.canteen} />
                <View style={{ flex: 1, margin: dimens.moderateScale10 }}>
                    <View style={{}}>
                        <Dropdown
                            placeholder={appStrings.selectCanteen}
                            dropdownOffset={{ top: 0, }}
                            containerStyle={{ backgroundColor: colors.white, borderRadius: 5, borderColor: colors.maroon, borderWidth: 2 }}
                            onChangeText={this._onCanteenChange}
                            data={canteenListData}
                            value={canteenId}


                        />
                    </View>
                    <View style={{ marginTop: dimens.moderateScale10, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableHighlight underlayColor={colors.transparant} onPress={this.showDateTimePicker} style={{ flex: 1 }}>
                            <View pointerEvents={'none'}>
                                <TextInput
                                    placeholder={appStrings.selectDate}
                                    value={txtSelectedDate}
                                    style={stylesConfig.textFeildStyle}

                                />
                            </View>

                        </TouchableHighlight>
                        <View style={{ marginLeft: dimens.moderateScale10 }}>
                            <GreenButton onPress={this._onSubmit} title={appStrings.btnSubmit} />
                        </View>

                    </View>
                </View>
                <View style={{ flex: 1, }}>
                    {isDataExist == true ? <View style={{ flex: 1, margin: dimens.moderateScale10 }}>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={canteenMenuList}
                            renderItem={this.renderItemView}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />

                    </View> : null}
                    {isEmpty == true ? <EmptyView msg={appStrings.noRecordFound} /> : null}
                </View>
                {/* Loader */}
                <CustomAcivityIndicator isLoading={isLoading == true ? isLoading : loading} />
                <DateTimePicker
                    isVisible={isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </View >

        );
    }
}
/* Redux method for diapatch acrtion and get state data */
const mapStateToProps = state => {
    return {
        loading: state.canteenReducer.isLoading,
        errorMsg: state.canteenReducer.errorMsg,
        campusCanteenListData: state.canteenReducer.campusCanteenListData,
        canteenMenuItemListData: state.canteenReducer.canteenMenuItemListData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Canteen);