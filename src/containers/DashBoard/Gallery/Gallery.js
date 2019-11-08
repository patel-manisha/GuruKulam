import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, TouchableHighlight, Image, FlatList } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { appStrings, stylesConfig, colors, fonts, images } from '../../../themes';
import { HeaderWithBackImage } from '../../../components/Header_C/allHeader';
import { asyncStorage, functionUtils } from '../../../utils';
import { ActionCreators } from '../../../Redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CustomAcivityIndicator } from '../../../components/ActivityIndicator/activityIndicator';
import { EmptyView } from '../../../components/EmptyView/EmptyView,';
import dimens from '../../../themes/appDimention';
import PhotosGallery from './PhotoGallery';
import AlbumsGallery from './AlbumsGallery';


const TAG = appStrings.gallery
class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDataExist: true, isEmpty: false,
            galleryData: [],
            albumsData: [],
            photosData: [],
            isPhotos: true,
            isAlbums: false,

        }
    }
    componentDidMount() {

        asyncStorage.getOrganizationData().then((data) => {
            const orgData = JSON.parse(data);
            console.log(TAG, "orgData:::", orgData)

            this.getGalleryDetails(orgData);
        })

    }
    getGalleryDetails(orgData) {
        const { SchoolCode, OrgId, CampusId, SchoolBatchId, UserId, UserType, ObjectId } = orgData;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {

                const inputData = JSON.stringify({
                    SchoolCode: SchoolCode, OrgId: OrgId, CampusId: CampusId,
                    SchoolBatchId: SchoolBatchId, UserId: UserId, ObjectId: ObjectId, UserType: UserType

                });
                this.props.getGalleryDetails(inputData).then(() => {
                    const { galleryDetail } = this.props;

                    // console.log(TAG, "getpollDetails::" + JSON.stringify(galleryDetail))

                    if (galleryDetail.length > 0) {
                        var tempAlbumsData = [];
                        var tempPhothos = [];

                        for (let i = 0; i < galleryDetail.length; i++) {
                            var tempData = [];
                            const Attachment = galleryDetail[i].Attachment;
                            const AttachmentLen = Attachment.length;
                            const AttachmentPath = Attachment[0].AttachmentPath;
                            tempData.push({ data: Attachment })
                            const dateStr = functionUtils.convertDate(galleryDetail[i].Date);
                            tempPhothos.push({ title: dateStr, data: tempData })
                            tempAlbumsData.push({ Title: galleryDetail[i].Title, Count: AttachmentLen, AttachmentPath: AttachmentPath })
                        }


                        /*    for (let i = 0; i < tempPhothos.length; i++) {
                                const data = tempPhothos[i].data;
                                const title = tempPhothos[i].title;
    
                                tempData.push({ title: title, data: data })
    
                            }
      */


                        console.log(TAG, "tempPhothos:::" + JSON.stringify(tempPhothos))
                        this.setState({ isDataExist: true, isEmpty: false, photosData: tempPhothos, galleryData: galleryDetail, albumsData: tempAlbumsData }, function () {

                        });

                    } else {
                        this.setState({ isDataExist: false, isEmpty: true, photosData: [], galleryData: [], albumsData: [] })
                    }


                });
            } else {
                functionUtils.showToast(appStrings.internetConnection)
            }
        });
    }
    onAlbumsClick = () => {
        this.setState({ isAlbums: true, isPhotos: false })
    }
    onPhotosClick = () => {
        this.setState({ isAlbums: false, isPhotos: true })
    }
    renderItemView = ({ item, index }) => {
        const { Title, Details, Date, UserName, CreatedDate, Attachment } = item;
        return (<View style={[stylesConfig.cardView, { marginTop: index == 0 ? 0 : 10, padding: 10, }]}>
            <Text style={{ color: colors.black, fontSize: functionUtils.normalize(16), fontWeight: 'bold' }}>{Title}</Text>
            <Text numberOfLines={3} ellipsizeMode={'tail'} style={{ marginTop: 3, color: colors.black, fontSize: functionUtils.normalize(14), fontWeight: '200', fontFamily: fonts.proximaNovaRegular }}>{Details}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                {/*  <Text>{appStrings.date}</Text> */}
                <Text style={styles.blackTextStyle}>{"Date : " + Date}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                <Image source={images.iconProfile} style={{ height: 20, width: 20, resizeMode: 'contain', marginRight: 5, }} />
                <Text style={[styles.blackTextStyle, { marginRight: 5, }]}>{UserName}</Text>
                <Text style={styles.blackTextStyle}>{CreatedDate}</Text>
            </View>
        </View>)
    }
    render() {
        const { galleryData, isDataExist, isEmpty, isPhotos, photosData, albumsData } = this.state;
        const { loading, errorMsg } = this.props

        return (
            <View style={stylesConfig.container}>
                <HeaderWithBackImage title={appStrings.gallery} />
                {isDataExist == true ? <View style={{ flex: 1, }}>
                    <View style={{ flex: 1, margin: 10 }}>
                        {isPhotos == true ? <PhotosGallery photosData={photosData} /> : <AlbumsGallery albumsData={albumsData} />}
                        {/*  <FlatList
                            showsVerticalScrollIndicator={false}
                            data={galleryData}
                            renderItem={this.renderItemView}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        /> */}
                    </View>

                    <View style={{ height: dimens.verticalScale50, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableHighlight onPress={this.onPhotosClick} style={{ flex: 0.5, }} underlayColor={colors.transparant}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: dimens.verticalScale20, width: dimens.verticalScale20, resizeMode: 'contain' }} source={images.iconPhotos} />
                                <Text style={{ color: colors.black, fontSize: dimens.moderateScale11 }}>{appStrings.photos}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.onAlbumsClick} style={{ flex: 0.5, }} underlayColor={colors.transparant}>
                            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: dimens.verticalScale20, width: dimens.verticalScale20, resizeMode: 'contain' }} source={images.iconAlbums} />
                                <Text style={{ color: colors.black, fontSize: dimens.moderateScale11 }}>{appStrings.albums}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                </View> : null}
                {isEmpty == true ? <EmptyView msg={appStrings.noRecordFound} /> : null}

                {/* Loader */}
                <CustomAcivityIndicator isLoading={loading} />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    blackTextStyle: { fontSize: functionUtils.normalize(14), color: colors.black, fontFamily: fonts.proximaNovaSemiBold },
})

/* Redux method for diapatch acrtion and get state data */
const mapStateToProps = state => {
    return {
        loading: state.galleryReducers.isLoading,
        errorMsg: state.galleryReducers.errorMsg,
        galleryDetail: state.galleryReducers.galleryData,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);