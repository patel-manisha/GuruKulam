import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, StatusBar, Image, ImageBackground, ScrollView, FlatList } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { appStrings, stylesConfig, colors, images, fonts } from '../../../themes';
import { ActionCreators } from '../../../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dimens from '../../../themes/appDimention';
import { functionUtils, constUtils } from '../../../utils';



const TAG = appStrings.albumsGallary
class AlbumsGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    renderItemView = ({ item, index }) => {
        const { Title, AttachmentPath, Count } = item;
        return (<View style={{ width: (constUtils.WIDTH / 2) - 10, height: (constUtils.WIDTH / 2) - 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginRight: 10, }}>
            <View style={{ height: '100%', width: '100%' }}>
                <View style={{ height: '80%' }}>
                    <ImageBackground source={images.icongalleryPlaceholder} style={{ borderRadius: 5, height: '100%', width: '100%' }}>
                        <Image source={{ uri: AttachmentPath }} style={{ height: '100%', width: '100%', resizeMode: 'stretch', }} />
                    </ImageBackground>

                </View>

                <View style={{ height: '20%', alignItems: 'center', justifyContent: 'center', marginTop: dimens.moderateScale2 }}>
                    <Text style={{ color: colors.black, fontSize: dimens.moderateScale13, }}>{Title}</Text>
                    <Text style={{ color: colors.gray, fontSize: dimens.moderateScale11, fontFamily: fonts.proximaNovaRegular }}>{Count}</Text>
                </View>
            </View>
        </View>)



    }
    render() {
        const { albumsData } = this.props;

        return (
            <View style={stylesConfig.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={albumsData}
                            renderItem={this.renderItemView}
                            extraData={this.state}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </ScrollView>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    blackTextStyle: { fontSize: dimens.moderateScale14, color: colors.black, fontFamily: fonts.proximaNovaSemiBold },
})

/* Redux method for diapatch acrtion and get state data */
const mapStateToProps = state => {
    return {

        galleryDetail: state.galleryReducers.galleryData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsGallery);