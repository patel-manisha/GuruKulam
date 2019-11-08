import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, StatusBar, Image, ImageBackground, ScrollView } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { appStrings, stylesConfig, images, colors, fonts } from '../../../themes';
import { HeaderWithBackImage } from '../../../components/Header_C/allHeader';
import { ActionCreators } from '../../../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dimens from '../../../themes/appDimention';



const TAG = appStrings.myProfile
class Myprofile extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { myProfileData } = this.props;
        const { BirthDate, BloodGroup, ClassDivision, FullAddress, FullName, GRNumber, House, ParentContact, ParentEmail,
            Photo, RollNumber, StudentContact, StudentEmail, UserName } = myProfileData;
        console.log(TAG, "myProfileData::", myProfileData)
        return (
            <View style={stylesConfig.container}>
                <HeaderWithBackImage title={appStrings.myProfile} />
                <ImageBackground source={images.iconBg} style={{ flex: 1 }}>

                    <View style={{ flex: 1, margin: dimens.moderateScale10 }}>
                        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                            <ImageBackground source={images.iconUserDefault} imageStyle={{ borderRadius: dimens.verticalScale120 / 2, borderWidth: 2, borderColor: colors.white, backgroundColor: colors.perple, }} style={{ height: dimens.verticalScale120, width: dimens.verticalScale120 }}>
                                <Image style={{ height: dimens.verticalScale70, width: dimens.verticalScale70, }} source={{ uri: Photo }} />
                            </ImageBackground>
                            <Text style={{ textAlign: 'center', marginTop: 5, color: colors.black, fontSize: dimens.moderateScale15, fontFamily: fonts.proximaNovaBold }}>{FullName}</Text>
                        </View>
                        <View style={{ flex: 0.6 }}>
                            <Text>{"GR Number " + GRNumber}</Text>
                            <Text>{"Class Division " + ClassDivision}</Text>
                            <Text>{"Birth Date " + BirthDate}</Text>
                            <Text>{"Blood Group " + BloodGroup}</Text>
                            <Text>{"Full Address " + FullAddress}</Text>
                            <Text>{"Student Email " + StudentEmail}</Text>
                            <Text>{"Student Contact " + StudentContact}</Text>
                            <Text>{"Parent Contact " + ParentContact}</Text>
                            <Text>{"Parent Email " + ParentEmail}</Text>

                        </View>
                    </View>

                </ImageBackground>

            </View>

        );
    }
}

/* Redux method for diapatch acrtion and get state data */
const mapStateToProps = state => {
    return {

        errorMsg: state.myProfileReducers.errorMsg,
        myProfileData: state.myProfileReducers.myProfileData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);