import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';
import { fonts, colors } from '.';
import { functionUtils, constUtils } from '../utils';


const stylesConfig = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    cardView: {
        backgroundColor: colors.white,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        borderRadius: 10,
        elevation: 3,
    },
    textFeildStyle: { backgroundColor: colors.white, fontFamily: fonts.proximaNovaRegular, fontSize: functionUtils.normalize(17), textAlign: 'center', borderWidth: 2, borderRadius: 5, borderBottomColor: colors.transparant, borderColor: colors.maroon, height: constUtils.TEXTFEILD_HEIGHT },
})

export default stylesConfig;