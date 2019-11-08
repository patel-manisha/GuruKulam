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


const TAG = appStrings.fee
class Fee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDataExist: true, isEmpty: false,
            feesData: [],
        }
    }
    componentDidMount() {

        asyncStorage.getOrganizationData().then((data) => {
            const orgData = JSON.parse(data);
            console.log(TAG, "orgData:::", orgData)

            this.getFeeDetails(orgData);
        })

    }
    getFeeDetails(orgData) {
        const { SchoolCode, OrgId, CampusId, SchoolBatchId, UserId, UserType, ObjectId } = orgData;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {

                const inputData = JSON.stringify({
                    SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId,
                    SchoolBatchId: SchoolBatchId, UserId: UserId, ObjectId: ObjectId, TypeId: "2"
                });
                this.props.getFeesDetails(inputData).then(() => {
                    const { feeData } = this.props;
                    const { FeesDetails, FeesReciptDetails } = feeData;
                    console.log(TAG, "getFeesDetails::" + JSON.stringify(FeesDetails))

                    if (FeesDetails.length > 0) {
                        this.setState({ isDataExist: true, isEmpty: false, feesData: FeesDetails }, function () {

                        });

                    } else {
                        this.setState({ eventData: {}, isDataExist: false, isEmpty: true, feesData: [] })
                    }


                });
            } else {
                functionUtils.showToast(appStrings.internetConnection)
            }
        });
    }
    renderItemView = ({ item, index }) => {
        const { FeeName, Amount, AdditionalAmount, ExemptionAmount, NotApplicableAmount, PaidAmount, PendingAmount } = item;
        return (<View style={[stylesConfig.cardView, { marginTop: index == 0 ? 0 : 10, padding: 10, }]}>
            <Text style={{ color: colors.black, fontSize: functionUtils.normalize(16), fontWeight: 'bold' }}>{FeeName}</Text>

        </View>)
    }
    render() {
        const { feesData, isDataExist, isEmpty } = this.state;
        const { feeData, loading, errorMsg } = this.props
        let tempArray = [];
        return (
            <View style={stylesConfig.container}>
                <HeaderWithBackImage title={appStrings.fee} />
                {isDataExist == true ? <View style={{ flex: 1, margin: 10 }}>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={feesData}
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
        loading: state.feeReducer.isLoading,
        errorMsg: state.feeReducer.errorMsg,
        feeData: state.feeReducer.feeData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Fee);