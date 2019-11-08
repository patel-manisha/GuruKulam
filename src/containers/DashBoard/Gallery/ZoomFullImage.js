import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, StatusBar, Image, ImageBackground, TouchableHighlight } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import NetInfo from "@react-native-community/netinfo";
import { appStrings, stylesConfig, images, colors } from '../../../themes';
import { HeaderWithBackImage } from '../../../components/Header_C/allHeader';
import dimens from '../../../themes/appDimention';
import { constUtils } from '../../../utils';
import { Actions } from 'react-native-router-flux';



const TAG = appStrings.activities
export default class ZoomFullImage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <View style={stylesConfig.container}>
                <View style={{ flex: 1, backgroundColor: colors.black, }}>
                    <View style={{ height: dimens.verticalScale50, width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableHighlight underlayColor={colors.transparant} onPress={() => Actions.pop()} style={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: dimens.verticalScale50, marginLeft: dimens.moderateScale10,  }}>
                            <Image style={{ height: dimens.verticalScale25, width: dimens.verticalScale25, }} source={images.iconCancel} />
                        </TouchableHighlight>

                    </View>
                    <View style={{ flex: 1 }}>
                        <ImageZoom cropWidth={constUtils.WIDTH}
                            cropHeight={constUtils.HEIGHT}
                            imageWidth={200}
                            imageHeight={200}>
                            <Image style={{ width: 200, height: 200 }}
                                source={{ uri: this.props.imageUrl }} />
                        </ImageZoom>
                    </View>
                </View>
            </View>

        );
    }
}