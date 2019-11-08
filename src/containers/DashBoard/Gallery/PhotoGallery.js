
import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, SectionList, Image, ImageBackground, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { appStrings, stylesConfig, colors, images, fonts } from '../../../themes';
import { ActionCreators } from '../../../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dimens from '../../../themes/appDimention';
import { functionUtils, constUtils } from '../../../utils';
import { Actions } from 'react-native-router-flux';



const TAG = appStrings.photoGallary
class PhotosGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    sectionFlatListRender = ({ item, index }) => {
        return (<TouchableHighlight onPress={() => Actions.mediaView({ imageUrl: item.AttachmentPath })} style={{ width: (constUtils.WIDTH / 4) - 8, height: (constUtils.WIDTH / 4) - 8, alignItems: 'center', justifyContent: 'center', marginBottom: 3, marginRight: 3, }}>
            <View style={{ height: '100%', width: '100%' }}>
                {/* <Image source={{ uri: item.AttachmentPath }} style={{ height: '100%', width: '100%', resizeMode: 'stretch', }} /> */}
                <View style={{ height: '100%' }}>
                    <ImageBackground source={images.icongalleryPlaceholder} style={{ borderRadius: 5, height: '100%', width: '100%' }}>
                        <Image source={{ uri: item.AttachmentPath }} style={{ height: '100%', width: '100%', resizeMode: 'stretch', }} />
                    </ImageBackground>

                </View>

            </View>
        </TouchableHighlight>)

    }
    renderSectionItem = ({ item, index, section }) => {
        console.log(TAG, "renderSectionItem::", item.data)
        /*  return (<View style={{ flexDirection: 'row', width: (constUtils.WIDTH / 4) - 10, height: (constUtils.WIDTH / 4) - 10, alignItems: 'center', justifyContent: 'center', marginBottom: 3, marginRight: 3, }}>
             <View style={{ height: '100%', width: '100%' }}>
 
                 <View style={{ height: '100%' }}>
                     <ImageBackground source={images.icongalleryPlaceholder} style={{ borderRadius: 5, height: '100%', width: '100%' }}>
                         <Image source={{ uri: item.AttachmentPath }} style={{ height: '100%', width: '100%', resizeMode: 'stretch', }} />
                     </ImageBackground>
 
                 </View>
 
             </View>
         </View>) */
        return (<FlatList
            data={item.data}
            //horizontal={true}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.sectionFlatListRender}
            showsHorizontalScrollIndicator={false}
        />)


    }
    renderSectionHeader = ({ section }) => {
        let title = section.title;

        return (<View style={{ padding: dimens.moderateScale5 }}>
            <Text style={{ fontSize: dimens.moderateScale15 }}>{title}</Text>

        </View>);

    }
    render() {
        const { photosData } = this.props;

        return (
            <View style={stylesConfig.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <SectionList

                            sections={photosData}
                            keyExtractor={(item, index) => item + index}
                            renderItem={this.renderSectionItem}
                            renderSectionHeader={this.renderSectionHeader}

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

export default connect(mapStateToProps, mapDispatchToProps)(PhotosGallery);