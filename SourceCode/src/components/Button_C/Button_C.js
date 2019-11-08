import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { colors } from '../../themes';
import { functionUtils } from '../../utils';
import dimens from '../../themes/appDimention';







const GreenButton = ({ onPress, title }) => {
    return (
        <TouchableHighlight onPress={onPress} underlayColor={colors.maroon} style={{ paddingLeft: dimens.moderateScale10, paddingRight: dimens.moderateScale10, height: 46, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.white, fontSize: functionUtils.normalize(17) }} >{title}</Text>
        </TouchableHighlight>
    )
}
export { GreenButton }


