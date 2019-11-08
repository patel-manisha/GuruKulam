
import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { functionUtils } from '../../utils';
import { colors, images, fonts, stylesConfig } from '../../themes';



const EmptyView = ({ msg }) => {
    return (

        <View style={[stylesConfig.cardView, { height: 100, margin: 10, alignItems: 'center', justifyContent: 'center' }]}>
            <Text>{msg}</Text>
        </View>)
}




export { EmptyView }
