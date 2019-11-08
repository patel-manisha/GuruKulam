import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, StatusBar, Image, ImageBackground } from 'react-native';
import stylesConfig from '../../themes/appStyleConfig';
import images from '../../themes/appImages';
import appStrings from '../themes/appStrings';


const TAG = appStrings.dashBoard
export default class ClassFormat extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <ImageBackground source={images.iconBg} style={{ width: '100%', height: '100%' }}>

                <Text>{appStrings.dashBoard}</Text>
            </ImageBackground>

        );
    }
}