import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        flex: 1,
        height: SCREEN_HEIGHT * 0.45,
        width: SCREEN_WIDTH*0.96
    },
    dateContainer: {
        marginHorizontal: "5%",
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    dateText: {
        color: themeStyle.COLOR_WHITE,
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 14
    },
    buttonContainer: {
        backgroundColor: themeStyle.BAR_COLOR,
        padding: '6%',
        alignItems: "center"
    },
    btnText:{
        color:themeStyle.COLOR_WHITE,
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 16
    },
    container1: {
        flex: 1,
        overflow: "hidden",
        justifyContent:"center",alignItems:"center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
})