import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, StatusBar, Image, FlatList } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { appStrings, stylesConfig, colors, fonts, images } from '../../themes';
import { HeaderWithBackImage } from '../../components/Header_C/allHeader';
import { asyncStorage, functionUtils } from '../../utils';
import { ActionCreators } from '../../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CustomAcivityIndicator } from '../../components/ActivityIndicator/activityIndicator';
import { EmptyView } from '../../components/EmptyView/EmptyView,';
import { Calendar } from 'react-native-calendars';
import dimens from '../../themes/appDimention';

const TAG = appStrings.attendance
class Attendance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            /*  month: '',
             year: '', */
            month: new Date().getMonth() + 1, //Current Month
            year: new Date().getFullYear(), //Current Year
            attendanceListData: [],
            isDataExist: false,
            isEmpty: false,
            eventData: {},
            orgData: {}
        }
    }
    componentDidMount() {

        asyncStorage.getOrganizationData().then((data) => {
            const orgData = JSON.parse(data);
            console.log(TAG, "orgData:::", orgData)
            this.setState({ orgData: orgData }, function () {
                this.getAttendanceDetails();
            })

        })

    }
    getAttendanceDetails() {
        const { orgData, year, month } = this.state;
        const { SchoolCode, OrgId, CampusId, SchoolBatchId, UserId, UserType, ObjectId } = orgData;

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {

                const inputData = JSON.stringify({ SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId, SchoolBatchId: SchoolBatchId, TypeId: "2", ObjectId: ObjectId, Year: year, "Month": month });
                this.props.getAttendanceDetails(inputData).then(() => {
                    const { attendanceData } = this.props;
                    console.log(TAG, "getAttendanceDetails::" + JSON.stringify(attendanceData))
                    var dateObject = {};
                    if (attendanceData.length > 0) {

                        for (i = 0; i < attendanceData.length; i++) {
                            const pDate = attendanceData[i].PresentDate;
                            var replaceDate = pDate.split('/');
                            var year = replaceDate[2];
                            var month = replaceDate[1];
                            var day = replaceDate[0];
                            const fullDate = year + "-" + month + "-" + day;
                            console.log(TAG, "date:" + fullDate);


                            dateObject[fullDate] = this.getEventData(attendanceData[i].Present, attendanceData[i].Color)
                        }
                        this.setState({ eventData: dateObject, isDataExist: true, isEmpty: false, attendanceListData: attendanceData }, function () {
                            console.log(TAG, "eventData:", JSON.stringify(this.state.eventData));
                        });

                    } else {
                        this.setState({ eventData: {}, isDataExist: false, isEmpty: true, attendanceListData: [] })
                    }


                });
            } else {
                functionUtils.showToast(appStrings.internetConnection)
            }
        });
    }


    getEventData = (pesent, color) => {
        return { selected: true, selectedColor: color, text: pesent }
    }
    onMonthChange = (monthData) => {
        console.log(TAG, "monthData::", monthData)
        this.setState({ year: monthData.year, month: monthData.month }, function () {
            this.getAttendanceDetails();
        })
    }
    renderItemView = ({ item, index }) => {
        const { Title, Details, Date, Subject, UserName, CreatedDate } = item;
        return (<View style={[stylesConfig.cardView, { marginTop: index == 0 ? 0 : 10, padding: 10, }]}>
            <Text style={{ color: colors.black, fontSize: functionUtils.normalize(16), fontWeight: 'bold' }}>{Title}</Text>
            <Text numberOfLines={3} ellipsizeMode={'tail'} style={{ marginTop: 3, color: colors.black, fontSize: functionUtils.normalize(14), fontWeight: '200', fontFamily: fonts.proximaNovaRegular }}>{Details}</Text>
            <Text style={[styles.blackTextStyle, { marginTop: 3 }]}>{"Subject : " + Subject}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                {/*  <Text>{appStrings.date}</Text> */}
                <Text style={styles.blackTextStyle}>{"Date : " + Date}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                <Image source={images.iconProfile} style={{ height: 20, width: 20, resizeMode: 'contain', marginRight: 5, }} />
                <Text style={[styles.blackTextStyle, { marginRight: 5, }]}>{UserName}</Text>
                <Text style={styles.blackTextStyle}>{CreatedDate}</Text>
            </View>
        </View>)
    }
    render() {
        const { attendanceListData, isDataExist, isEmpty, eventData } = this.state;
        const { attendanceData, loading, errorMsg } = this.props
        let tempArray = [];
        return (
            <View style={stylesConfig.container}>
                <HeaderWithBackImage title={appStrings.attendance} />
                {isDataExist == true ? <View style={{ flex: 1, }}>

                    <View>


                        <Calendar style={{
                            borderWidth: 1,
                            borderColor: 'gray',

                        }}
                            theme={{
                                dayTextColor: colors.black,
                                monthTextColor: colors.blue,
                                todayTextColor: colors.blue,
                                calendarBackground: colors.white,
                                textSectionTitleColor: colors.blue, arrowColor: colors.blue,
                                'stylesheet.calendar.header': {
                                    week: {
                                        marginTop: 5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }
                                }
                            }}


                            markedDates={eventData}
                            // Collection of dates that have to be marked. Default = {}
                            onMonthChange={this.onMonthChange}
                            hideExtraDays={true}

                        />

                    </View>
                    <View style={{ marginTop: dimens.moderateScale30, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={[styles.circleViewStyle, { backgroundColor: "#00FF00" }]} />
                            <Text style={[styles.circleTextStyle, { color: "#00FF00" }]}>{"Present"}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: dimens.moderateScale5 }}>
                            <View style={[styles.circleViewStyle, { backgroundColor: "#FF0000" }]} />
                            <Text style={[styles.circleTextStyle, { color: "#FF0000" }]}>{"Absent"}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: dimens.moderateScale5 }}>
                            <View style={[styles.circleViewStyle, { backgroundColor: "#0000FF" }]} />
                            <Text style={[styles.circleTextStyle, { color: "#0000FF" }]}>{"Holiday"}</Text>
                        </View>
                    </View>

                </View> : null}


                {isEmpty == true ? <EmptyView msg={appStrings.noRecordFound} /> : null}

                {/* Loader */}
                <CustomAcivityIndicator isLoading={loading} />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    circleViewStyle: { alignItems: 'center', justifyContent: 'center', height: dimens.verticalScale10, width: dimens.verticalScale10, borderRadius: dimens.verticalScale10 / 2, },
    blackTextStyle: { fontSize: functionUtils.normalize(14), color: colors.black, fontFamily: fonts.proximaNovaSemiBold },
    circleTextStyle: {  marginLeft: dimens.moderateScale10, width: dimens.verticalScale100, fontSize: dimens.moderateScale14, fontWeight: 'bold' },
})

/* Redux method for diapatch acrtion and get state data */
const mapStateToProps = state => {
    return {
        loading: state.attendanceReducer.isLoading,
        errorMsg: state.attendanceReducer.errorMsg,
        attendanceData: state.attendanceReducer.attendanceData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);