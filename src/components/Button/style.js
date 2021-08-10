import { StyleSheet, Dimensions } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    btnPrimary: {
        height: 51,
        borderRadius: 26,
        backgroundColor: themeStyle.BUTTON_COLOR
    },
    btnPrimaryText: {
        fontSize: 18,
        color: 'white',
    },
    clearBtnPrimary: {
        height: 51,
        // width: 100,
        borderRadius: 26,
        borderWidth: 0.5,
        borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
        backgroundColor: 'white'
    },
    clearBtnPrimaryText: {
        fontSize: 18,
        color: themeStyle.BAR_COLOR,
    },
    colorBtnPrimary: {
        height: 51,
        borderRadius: 26,
        backgroundColor: 'red'
    },
    colorBtnPrimaryText: {
        fontSize: 18,
        // fontWeight: "normal",
        color: "white",
    },
    iconContainerStyle: {
        marginHorizontal: 0
    },
});