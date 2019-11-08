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



const TAG = appStrings.homework
class HomeWork extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        asyncStorage.getOrganizationData().then((data) => {
            const orgData = JSON.parse(data);
            console.log(TAG, "orgData:::", orgData)

            this.getHomeworkDetails(orgData);
        })
    }
    getHomeworkDetails(orgData) {
        const { SchoolCode, OrgId, CampusId, SchoolBatchId, UserId, UserType, ObjectId } = orgData;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {

                const inputData = JSON.stringify({ SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId, SchoolBatchId: SchoolBatchId, UserId: UserId, ObjectId: ObjectId, UserType: UserType });

                this.props.getHomeworkDetails(inputData).then(() => {
                    console.log(TAG, "getHomeworkDetails::" + JSON.stringify(this.props.homeworkData))
                });
            } else {
                functionUtils.showToast(appStrings.internetConnection)
            }
        });
    }

    renderItemView = ({ item, index }) => {
        const { StartDate, EndDate, Subject, ClassWork, HomeWork, ClassTeacher } = item;
        return (<View style={[stylesConfig.cardView, { marginTop: index == 0 ? 0 : 10, padding: 10, }]}>

            <Text style={[styles.blackTextStyle,]}>{"Subject : " + Subject}</Text>
            <Text style={[styles.blackTextStyle,]}>{"ClassTeacher : " + ClassTeacher}</Text>
            <Text style={[styles.blackTextStyle, { marginTop: 3 }]}>{"Date : " + StartDate}</Text>

        </View>)
    }

    render() {
        const { homeworkData, loading, errorMsg } = this.props
        let tempArray = [];
        return (
            <View style={stylesConfig.container}>
                <HeaderWithBackImage title={appStrings.homework} />
                {homeworkData.length > 0 ? <View style={{ flex: 1, }}>
                    {homeworkData.length == 0 ? <EmptyView msg={appStrings.noRecordFound} /> : <View style={{ margin: 10 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={homeworkData}
                            renderItem={this.renderItemView}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />

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
        loading: state.homeworkReducer.isLoading,
        errorMsg: state.homeworkReducer.errorMsg,
        homeworkData: state.homeworkReducer.homeworkData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWork);