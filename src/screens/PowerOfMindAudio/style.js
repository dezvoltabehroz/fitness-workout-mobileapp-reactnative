import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../lib/utils/constants";



export default StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        marginTop: "10%",
        height: SCREEN_HEIGHT * 0.4,
        width: SCREEN_WIDTH * 0.9,
        borderRadius: 13,
        bottom: "15%",
        alignSelf: "center"
    },
    rowContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly", bottom: "15%",
    },
    timerContainer: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        marginVertical: "5%",
        bottom: "10%"
    },
    boxView: {
        backgroundColor: themeStyle.BAR_COLOR, height: SCREEN_HEIGHT * 0.1
    },
    textStyle: {
        color: "#21386D", textAlign: "center", fontSize: 14, fontFamily: themeStyle.FONT_REGULAR
    },
    textStyle1: {
        color: "#21386D", textAlign: "center", fontSize: 18, fontFamily: themeStyle.FONT_MEDIUM
    },
    buttonContainer: {
        alignItems: 'center', bottom: '5%'
    }
})