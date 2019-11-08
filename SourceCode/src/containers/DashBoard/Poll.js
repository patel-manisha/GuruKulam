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


const TAG = appStrings.poll
class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDataExist: true, isEmpty: false,
            PoleListData: [],
        }
    }
    componentDidMount() {

        asyncStorage.getOrganizationData().then((data) => {
            const orgData = JSON.parse(data);
            console.log(TAG, "orgData:::", orgData)

            this.getPollDetails(orgData);
        })

    }
    getPollDetails(orgData) {
        const { SchoolCode, OrgId, CampusId, SchoolBatchId, UserId, UserType, ObjectId } = orgData;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {

                const inputData = JSON.stringify({
                    SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId,
                    SchoolBatchId: SchoolBatchId, UserId: UserId, ObjectId: ObjectId, UserType: UserType

                });
                this.props.getpollDetails(inputData).then(() => {
                    const { pollData } = this.props;

                    console.log(TAG, "getpollDetails::" + JSON.stringify(pollData))

                    if (pollData.length > 0) {
                        this.setState({ isDataExist: true, isEmpty: false, PoleListData: pollData }, function () {

                        });

                    } else {
                        this.setState({ isDataExist: false, isEmpty: true, PoleListData: [] })
                    }


                });
            } else {
                functionUtils.showToast(appStrings.internetConnection)
            }
        });
    }
    renderItemView = ({ item, index }) => {
        const { Title, Details, Date, UserName, CreatedDate, Attachment } = item;
        return (<View style={[stylesConfig.cardView, { marginTop: index == 0 ? 0 : 10, padding: 10, }]}>
            <Text style={{ color: colors.black, fontSize: functionUtils.normalize(16), fontWeight: 'bold' }}>{Title}</Text>
            <Text numberOfLines={3} ellipsizeMode={'tail'} style={{ marginTop: 3, color: colors.black, fontSize: functionUtils.normalize(14), fontWeight: '200', fontFamily: fonts.proximaNovaRegular }}>{Details}</Text>
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
        const { PoleListData, isDataExist, isEmpty } = this.state;
        const { loading, errorMsg } = this.props
        let tempArray = [];
        return (
            <View style={stylesConfig.container}>
                <HeaderWithBackImage title={appStrings.poll} />
                {isDataExist == true ? <View style={{ flex: 1, margin: 10 }}>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={PoleListData}
                        renderItem={this.renderItemView}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View> : null}
                {isEmpty == true ? <EmptyView msg={appStrings.noRecordFound} /> : null}

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
        loading: state.pollReducer.isLoading,
        errorMsg: state.pollReducer.errorMsg,
        pollData: state.pollReducer.pollData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);