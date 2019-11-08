import { StyleSheet, Dimensions, Alert, Platform, PixelRatio } from 'react-native';
import Toast from 'react-native-simple-toast';
import { appStrings } from '../themes';
import { constUtils } from '.';
import firebase from 'react-native-firebase';
var moment = require('moment');



export default class FunctionUtils {


    static normalize(size) {

        const newSize = size * constUtils.SCALE;
        if (Platform.OS == 'ios') {
            return Math.round(PixelRatio.roundToNearestPixel(newSize))
        }
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
    static async getToken() {
        console.log(TAG, "getToken:");
        var fcmToken = await firebase.messaging().getToken();
        console.log(TAG, "fcmToken:" + fcmToken);

        return fcmToken;
    }

    static showToast(msg) {
        Toast.show(msg, Toast.LONG);
    }
    static validationAlert(msg) {
        Alert.alert(
            appStrings.appName,
            msg,
            [{ text: 'Ok', onPress: () => console.log('onPress') }]
        )
    }
    static showAlert(msg) {
        Alert.alert(msg);
    }

    static normalizeImage(size) {
        const newSize = size * constantsUtils.SCALE;
        if (Platform.OS == 'ios') {
            return Math.round(PixelRatio.roundToNearestPixel(newSize))
        } else {
            return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
        }

    }
    static convertDate(dateString) {
        console.log("dateString::", dateString)
        var momentObj = moment(dateString, 'DD/MM/YYYY');
        var momentString = momentObj.format('MMM DD, YYYY');
        return momentString;
    }
    static convertDateToDate(dateString) {

        var momentObj = moment(dateString);
        var momentString = momentObj.format('YYYY-MM-DD');
        return momentString;
    }
}
