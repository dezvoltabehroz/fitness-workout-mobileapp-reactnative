import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../lib/utils/constants";


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: SCREEN_HEIGHT * 0.525,
        width: SCREEN_WIDTH,
        paddingVertical: '5%',
        paddingHorizontal: "10%",
        backgroundColor: themeStyle.COLOR_WHITE
    },
    headingText: {
        fontSize: 18,
        color: '#fff',
        textTransform: "uppercase",
        fontFamily: themeStyle.FONT_BOLD
    },
    headingText2: {
        fontSize: 35,
        color: '#fff',
        textTransform: "uppercase",
        fontFamily: themeStyle.FONT_BOLD
    },
    headingText3: {
        fontSize: 30,
        color: '#fff',
        textTransform: "uppercase",
        fontFamily: themeStyle.FONT_BOLD
    },
    timeText: {
        fontSize: 12,
        color: '#fff',
        textTransform: "uppercase",
        fontFamily: themeStyle.FONT_REGULAR
    },
    rowContentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    container1: {
        flex: 1,
        overflow: "hidden",
        justifyContent: "center", alignItems: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
})