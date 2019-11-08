import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const scale = SCREEN_WIDTH / 320;

const constantUtils = {
    WIDTH: SCREEN_WIDTH,
    HEIGHT: SCREEN_HEIGHT,
    SCALE: scale,
    STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 0 : 0,
    APPBAR_HEIGHT: Platform.OS === 'ios' ? 22 : 0,
    TEXTFEILD_HEIGHT: 46,
}

export default constantUtils;

