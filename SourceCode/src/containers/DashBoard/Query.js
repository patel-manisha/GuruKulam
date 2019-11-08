import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, StatusBar, Image, ImageBackground } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { appStrings, stylesConfig } from '../../themes';
import { HeaderWithBackImage } from '../../components/Header_C/allHeader';



const TAG = appStrings.query
export default class Query extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <View style={stylesConfig.container}>
               <HeaderWithBackImage title={appStrings.query} />
            </View>

        );
    }
}