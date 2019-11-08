import React, { Component } from 'react'
import { ActivityIndicator, AppRegistry, StyleSheet, Text, View, } from 'react-native'
import { colors } from '../../themes';
import Spinner from 'react-native-loading-spinner-overlay';

const TAG = 'AcivityIndicator';
const CustomAcivityIndicator = ({ isLoading }) => {


    return (
        <View>
            <Spinner
                visible={isLoading}
            // textContent={'Loading...'}
            //textStyle={styles.spinnerTextStyle}
            />
        </View>
        /* <View style={[styles.container, { alignItems: 'center', flex: 1 }]}>
            <ActivityIndicator size="large" color={colors.maroon} animating={isLoading} />
        </View> */
    )
}


export { CustomAcivityIndicator };






const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

})