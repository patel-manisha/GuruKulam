import React, { Component } from 'react';
import { Platform, Alert, Text, FlatList, BackHandler, StyleSheet, ScrollView, View, TouchableHighlight, Image, ImageBackground, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { ActionCreators } from '../../../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { appStrings, images, colors, fonts, stylesConfig } from '../../../themes';
import { HeaderWithMenuImage } from '../../../components/Header_C/allHeader';
import { functionUtils, constUtils, asyncStorage } from '../../../utils';
import { EmptyView } from '../../../components/EmptyView/EmptyView,';


const TAG = appStrings.dashBoard
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moduleListData: [],
            isDataExist: false,
            isEmpty: false,
            /*  dashBoardData: [{ name: appStrings.news, image: images.iconeNews },
             { name: appStrings.circular, image: images.iconeCircular, },
             { name: appStrings.calendar, image: images.iconeCalender },
             { name: appStrings.fee, image: images.iconeFee },
             { name: appStrings.attendance, image: images.iconeAttendence },
             { name: appStrings.homework, image: images.iconeHomework },
             { name: appStrings.assignment, image: images.iconeAssignment },
             { name: appStrings.query, image: images.iconeQuery },
             { name: appStrings.poll, image: images.iconePoll },
             { name: appStrings.gallery, image: images.iconeGallery },
             //{ name: appStrings.video, image: images.iconeVideo },
             { name: appStrings.activities, image: images.iconeActivity },
             ] */
        }
        this._onItemSelect = this._onItemSelect.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        this.getModuleData();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        console.log(TAG, "cuttennt sense:" + Actions.currentScene)
        if (Actions.currentScene == "_home") {
            Alert.alert(
                appStrings.appName,
                appStrings.exitApp,
                [{ text: 'No', onPress: () => console.log('onPress') },
                { text: 'Yes', onPress: () => this.closeApp() }]
            )
            return true;
        }

    }
    closeApp = () => {
        BackHandler.exitApp()
    }
    getModuleData = () => {
        asyncStorage.getLoginData().then((data) => {

            if (data.length > 0) {
                this.setState({ moduleListData: JSON.parse(data), isDataExist: true, isEmpty: false }, function () {
                    // console.log(TAG, "moduleListData:::", this.state.moduleListData)
                })
            } else {
                this.setState({ moduleListData: [], isDataExist: false, isEmpty: true })
            }


        })
    }

    _onItemSelect(screenName) {
        if (screenName == appStrings.news) {
            Actions.news();
        } else if (screenName == appStrings.calendar) {
            Actions.calendar();
        } else if (screenName == appStrings.circular) {
            Actions.circular();
        } else if (screenName == appStrings.assignment) {
            Actions.assignment();
        } else if (screenName == appStrings.homework) {
            Actions.homework();
        } else if (screenName == appStrings.fee) {
            Actions.fee();
        } else if (screenName == appStrings.attendance) {
            Actions.attendance();
        } else if (screenName == appStrings.query) {
            Actions.query();
        } else if (screenName == appStrings.poll) {
            Actions.poll();
        } else if (screenName == appStrings.gallery) {
            Actions.gallery();
        } else if (screenName == appStrings.canteen) {
            Actions.canteen();
        } else if (screenName == appStrings.notice) {
            Actions.notice();
        } else if (screenName == appStrings.activities) {
            Actions.activities();
        }
    }
    renderDashboardView = ({ item, index }) => {
        // const { Title ,Icon512,Icon64} = item;
        console.log(TAG, "item:::", item)
        var name = item.Title;
        var icon = item.Icon64;

        return (<TouchableHighlight underlayColor={colors.transparant} onPress={() => this._onItemSelect(name)} style={{ borderRadius: 5, backgroundColor: colors.white, height: (constUtils.WIDTH / 3) - 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginRight: 10, width: (constUtils.WIDTH / 3) - 13 }}>
            <View style={{}}>
                <Image source={{ uri: icon }} style={{ height: 64, width: 64, alignSelf: 'center', resizeMode: 'contain' }} />
                <Text style={{ fontFamily: fonts.proximaNovaSemiBold, textAlign: 'center', marginTop: 3, fontSize: functionUtils.normalize(15), color: colors.black, fontWeight: '800' }}>{name}</Text>

            </View>

        </TouchableHighlight>)
    }
    render() {
        const { moduleListData, isDataExist, isEmpty } = this.state;
        console.log(TAG, "moduleListData...." + JSON.stringify(moduleListData))
        return (
            <View style={stylesConfig.container}>
                <View>
                    <HeaderWithMenuImage title={appStrings.dashBoard} />
                </View>
                {isDataExist == true ? <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                            <FlatList
                                data={moduleListData}
                                showsVerticalScrollIndicator={false}
                                renderItem={this.renderDashboardView}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={3}
                            //ItemSeparatorComponent={this.flatListItemSeparator}
                            />

                        </View>
                    </ScrollView>
                </View> : null}
                {isEmpty == true ? <EmptyView msg={appStrings.noRecordFound} /> : null}
            </View>

        );
    }
}
/* Redux method for diapatch acrtion and get state data */
const mapStateToProps = state => {
    return {

        loginData: state.authenticationReducer.loginData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);