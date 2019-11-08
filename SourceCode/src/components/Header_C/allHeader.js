
import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { functionUtils } from '../../utils';
import { colors, images, fonts } from '../../themes';



const HeaderWithMenuImage = ({ title, onPress }) => {
    return (

        <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.perple }}>
            <TouchableOpacity onPress={() => Actions.drawerOpen()} style={{ height: '100%', width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={images.iconMenu} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
            </TouchableOpacity>

            <Text style={{ color: colors.white, fontSize: functionUtils.normalize(20), fontFamily: fonts.proximaNovaBold }}>{title}</Text>
            <TouchableOpacity style={{ height: '100%', width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} />
            </TouchableOpacity>

        </View>)
}


const HeaderWithBackImage = ({ title }) => {
    return (<View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.perple }}>
        <TouchableOpacity onPress={() => Actions.pop()} style={{ height: '100%', width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={images.iconBack} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
        </TouchableOpacity>

        <Text style={{ color: colors.white, fontSize: functionUtils.normalize(20) }}>{title}</Text>
        <TouchableOpacity style={{ height: '100%', width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} />
        </TouchableOpacity>
    </View>)
}


export { HeaderWithMenuImage, HeaderWithBackImage }
