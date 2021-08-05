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
        height: SCREEN_HEIGHT * 0.55,
        width: SCREEN_WIDTH,
        paddingVertical: '5%',
        paddingHorizontal: "10%",
        backgroundColor: themeStyle.COLOR_WHITE
    },
    headingText: {
        fontSize: 18,
        color: '#1F2729',
        textTransform: "uppercase",
        fontFamily: themeStyle.FONT_BOLD
    },
    headingText2: {
        fontSize: 35,
        color: '#1F2729',
        textTransform: "uppercase",
        fontFamily: themeStyle.FONT_BOLD
    },
    timeText: {
        fontSize: 12,
        color: '#1F2729',
        textTransform: "uppercase",
        fontFamily: themeStyle.FONT_REGULAR
    }
})