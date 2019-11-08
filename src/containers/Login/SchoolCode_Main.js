import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, TextInput, Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { images, colors, appStrings, fonts, stylesConfig } from '../../themes';
import { GreenButton } from '../../components/Button_C/Button_C';
import { constUtils, functionUtils } from '../../utils';
import { CustomAcivityIndicator } from '../../components/ActivityIndicator/activityIndicator';
import { ActionCreators } from '../../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



const TAG = appStrings.schoolCode
class SchoolCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            schoolCode: '',
        }
        this._onNext = this._onNext.bind(this);
    }
    componentDidMount() {
        this.getForceUpdate();
    }
    getForceUpdate = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                // const inputData = JSON.stringify({ SchoolCode: this.state.schoolCode })
                const inputData = JSON.stringify({ SchoolCode: "1002" });
                this.props.getAppVersion(inputData);
            } else {
                functionUtils.showToast(appStrings.internetConnection)
            }
        });
    }
    /* Next button click and call validate school code api */
    _onNext() {
        const { schoolCode } = this.state;
        if (schoolCode.trim().length == 0) {
            functionUtils.validationAlert(appStrings.enterSchoolCode)
        } else {

            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {

                    const inputData = JSON.stringify({ SchoolCode: schoolCode })
                    this.props.getSchoolCode(inputData);
                } else {
                    functionUtils.showToast(appStrings.internetConnection)
                }
            });

        }

    }
    /* Render Method */
    render() {
        const { schoolCode } = this.state;
        const { loading } = this.props;

        return (
            <ImageBackground source={images.iconBg} style={{ width: '100%', height: '100%' }}>

                <View style={{ alignSelf: 'center', height: '95%', width: '90%', }}>
                    {/* Logo */}
                    <Image style={{ height: '40%', width: '100%', resizeMode: 'contain' }} source={images.iconGurukulamLogo_s} />
                    {/* School code textfeild */}
                    <View style={{ height: '15%', width: '100%', justifyContent: 'center', }}>
                        <TextInput
                            placeholder={appStrings.schoolCode}
                            value={schoolCode}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            onChangeText={(text) => { this.setState({ schoolCode: text }) }}
                            style={stylesConfig.textFeildStyle}
                        />
                    </View>
                    {/* Nex Button */}
                    <View style={{ height: '10%', width: '100%' }}>
                        <GreenButton onPress={this._onNext} title={appStrings.btnNext} />
                    </View>
                    {/* Text Info */}
                    <View style={{ height: '30%', width: '100%', alignSelf: 'center', alignItems: 'center', }}>
                        <Text style={styles.maroonTextStyle}>{appStrings.noSchoolCodeMsg}</Text>
                        <Text style={[{ marginTop: 10, }, styles.maroonTextStyle]}>{appStrings.noSchoolCodeMsg2}</Text>
                    </View>

                </View>
                {/* Loader */}
                <CustomAcivityIndicator isLoading={loading} />


            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({

    maroonTextStyle: {
        textAlign: 'justify', color: colors.maroon, fontSize: functionUtils.normalize(17), fontFamily: fonts.proximaNovaBold
    }
})

const mapStateToProps = state => {
    return {
        loading: state.authenticationReducer.isLoading
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolCode);
