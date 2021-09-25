import { StyleSheet, Dimensions } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import { SCREEN_WIDTH } from '../../lib/utils/constants';
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    containerStyle: {
        height: 75,
        marginBottom: 0
    },
    inputContainerStyle: {
        borderBottomWidth: 1,
        borderColor: themeStyle.BAR_COLOR,
        // borderRadius: 5,
    },
    inputStyle: {
        fontSize: 12,
        // marginLeft: '2.5%',
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.BAR_COLOR,
        // textAlign: "center"

    },
    inputContainerWidthStyle: {
        borderBottomWidth: 1,
        borderColor: themeStyle.BAR_COLOR,
        width: SCREEN_WIDTH * 0.4
    },
    labelStyle: {
        fontSize: 14,
        color: "black"
    }
}
);
