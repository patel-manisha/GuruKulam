import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, FlatList, Image, ImageBackground } from 'react-native';
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



const TAG = appStrings.calendar
class CalendarScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            eventData: {},
            isDataExist: false,
            eventTital: '',
            eventDate: '',
            eventDescription: ''
        }
    }
    componentDidMount() {
        asyncStorage.getOrganizationData().then((data) => {
            const orgData = JSON.parse(data);
            console.log(TAG, "orgData:::", orgData)

            this.getCalanderDetails(orgData);
        })



    }
    getCalanderDetails(orgData) {
        const { SchoolCode, OrgId, CampusId, SchoolBatchId, UserId, UserType, ObjectId } = orgData;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                const inputData = JSON.stringify({ SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId, SchoolBatchId: SchoolBatchId, UserId: UserId, ObjectId: ObjectId, UserType: UserType });
                this.props.getCalanderDetails(inputData).then(() => {
                    this.getMarkedData();
                    console.log(TAG, "getCalanderDetails::" + JSON.stringify(this.props.calanderData))
                });
            } else {
                functionUtils.showToast(appStrings.internetConnection)
            }
        });
    }

    getDateArray = (start, end) => {
        var arr = new Array();
        var dt = new Date(start);
        while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    getMarkedData = () => {
        const { calanderData } = this.props;
        var tempEventData = [];
        var dateObject = {};

        var fullDate = [];
        if (calanderData.length > 0) {
            for (i = 0; i < calanderData.length; i++) {
                console.log(TAG, "complated event date:" + calanderData[i].StartDate);


                tempEndDateObj = {};
                var dateArr = [];
                let startdate = calanderData[i].StartDate;
                let title = calanderData[i].Title;
                let eventID = calanderData[i].EventId;
                let endDate = calanderData[i].EndDate;
                let bgColor = calanderData[i].backgroundColor;
                let desc = calanderData[i].Description;
                var startDatenew = new Date(startdate); //YYYY-MM-DD
                var endDatenew = new Date(endDate); //YYYY-MM-DD
                dateArr = this.getDateArray(startDatenew, endDatenew);

                for (let j = 0; j < dateArr.length; j++) {
                    tempObj = {};
                    var date = functionUtils.convertDateToDate(dateArr[j]);


                    tempObj = { 'date': date, 'title': title, 'event_id': eventID, bgColor: bgColor, 'end_Date': endDate, "start_date": startdate, "description": desc }
                    tempEventData.push(tempObj);
                }



                // tempEventData.push(tempEndDateObj);

            }


            for (i = 0; i < tempEventData.length; i++) {

                console.log(TAG, "date:" + tempEventData[i].date);
                console.log(TAG, "event_id:" + tempEventData[i].event_id);

                dateObject[tempEventData[i].date] = this.getEventData(tempEventData[i].title, tempEventData[i].event_id,
                    tempEventData[i].date, tempEventData[i].end_Date,
                    tempEventData[i].bgColor, tempEventData[i].start_date, tempEventData[i].description)
            }
            this.setState({ eventData: dateObject }, function () {
                console.log(TAG, "eventData:", this.state.eventData);
            });
        }

    }
    getEventData = (title, id, date, endDate, bgColor, startDate, desc) => {
        console.log(TAG, "getEventData startDate", startDate)
        console.log(TAG, "getEventData,endDate", endDate)
        /*       '2019-11-24': { startingDay: true, color: 'gray' },
              '2019-11-25': { color: 'gray' },
              '2019-11-26': { endingDay: true, color: 'gray' } */


        if (date == startDate) {
            return { startingDay: true, color: bgColor, text: title, eventId: id, endDate: endDate, startDate: startDate, description: desc }
        } else if (date == endDate) {
            return { endingDay: true, color: bgColor, text: title, eventId: id, endDate: endDate, startDate: startDate, description: desc }

        } else {
            return { color: bgColor, text: title, eventId: id, endDate: endDate, startDate: startDate, description: desc }
        }
    }




    // return { startingDay: true, endingDay: true, color: bgColor }
    /* 
            if (startDate == endDate) {
                return {  startingDay: true,endingDay: true, color: bgColor }
            }else if(startDate!=endDate){
               return{ startingDay: true, color: bgColor }
            }else{
                return{ color: bgColor }
            } */
    /*  if (startDate != endDate) {
         console.log(TAG, "getEventData,if....")
         return { selected: true, startingDay: true, color: bgColor, text: title, eventId: id, endDate: endDate }
     } else {
         console.log(TAG, "getEventData else....")
         return { selected: true, endingDay: true, color: bgColor, text: title, eventId: id, endDate: endDate }
     } */



    _onDayPress(date) {
        console.log('day pressed' + date)

        const data = this.state.eventData;

        for (let i in data) {

            if (i == date) {
                const e_id = data[i].eventId;
                const title = data[i].text;
                const startDate = data[i].startDate;
                const endDate = data[i].endDate;
                const description = data[i].description;

                var fullDate;
                if (endDate == '' || endDate == null || endDate == undefined) {
                    fullDate = date
                } else {
                    fullDate = startDate + " To " + endDate;
                }
                this.setState({ eventTital: title, eventDate: fullDate, isDataExist: true, eventDescription: description })

                // alert(title);
            }

        }


    }
    renderItemView = ({ item, index }) => {
        const { Title, } = item;
        return (<View style={[stylesConfig.cardView, { marginTop: index == 0 ? 0 : 10, padding: 10, }]}>

            <Text style={[styles.blackTextStyle,]}>{Title}</Text>

        </View>)
    }

    render() {
        const { calanderData, loading, errorMsg, } = this.props
        const { eventData, isDataExist, eventDate, eventTital, eventDescription } = this.state;

        return (
            <View style={stylesConfig.container}>
                <HeaderWithBackImage title={appStrings.calendar} />
                {calanderData.length > 0 ? <View style={{ flex: 1, }}>
                    {calanderData.length == 0 ? <EmptyView msg={appStrings.noRecordFound} /> : <View style={{ margin: 10 }}>
                        {/*  <FlatList
                            showsVerticalScrollIndicator={false}
                            data={calanderData}
                            renderItem={this.renderItemView}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        /> */}

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
                                },

                                'stylesheet.day.period': {
                                    base: {
                                        overflow: 'hidden',
                                        height: 34,
                                        alignItems: 'center',
                                        width: 38,
                                    }
                                }
                            }}



                            /*   markedDates={{
                                  '2019-11-17': { disabled: true },
                                  '2019-11-08': { textColor: '#666' },
                                  '2019-11-09': { textColor: '#666' },
                                  '2019-11-14': { startingDay: true, color: 'blue', endingDay: true },
                                  '2019-11-21': { startingDay: true, color: 'blue' },
                                  '2019-11-22': { endingDay: true, color: 'gray' },
                                  '2019-11-24': { startingDay: true, color: 'gray' },
                                  '2019-11-25': { color: 'gray' },
                                  '2019-11-26': { endingDay: true, color: 'gray' }
                              }}
                              //hideArrows={false} */
                            markingType={'period'}
                            markedDates={eventData}                            // Collection of dates that have to be marked. Default = {}
                            onMonthChange={(month) => { this.setState({ isDataExist: false }) }}
                            hideExtraDays={true}
                            onDayPress={(day) => this._onDayPress(day.dateString)}
                        />

                        {isDataExist == true ? <View style={[stylesConfig.cardView, { marginTop: 30, padding: 3, backgroundColor: colors.blue }]}>
                            <View style={{ padding: 10, backgroundColor: colors.white, borderRadius: 5 }}>
                                <Text style={{ color: colors.black, fontSize: dimens.moderateScale16, fontFamily: fonts.proximaNovaSemiBold }}>{eventTital}</Text>

                                <Text style={{ color: colors.black, fontSize: dimens.moderateScale13, marginTop: 3, fontFamily: fonts.proximaNovaSemiBold }}>{eventDescription}</Text>
                                <Text style={{ color: colors.green, marginTop: 3,fontSize: dimens.moderateScale13 }}>{eventDate}</Text>
                            </View>
                        </View> : null}

                    </View>}
                </View> : null}

                {/* Loader */}
                <CustomAcivityIndicator isLoading={loading} />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    blackTextStyle: { fontSize: functionUtils.normalize(14), color: colors.black, fontFamily: fonts.proximaNovaSemiBold },
})

/* Redux method for diapatch acrtion and get state data */
const mapStateToProps = state => {
    return {
        loading: state.calanderReducer.isLoading,
        errorMsg: state.calanderReducer.errorMsg,
        calanderData: state.calanderReducer.calanderData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);