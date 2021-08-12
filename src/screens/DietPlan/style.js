import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 28,
        fontFamily: themeStyle.FONT_MEDIUM,
        color: themeStyle.COLOR_WHITE
    },
    desc: {
        fontSize: 15,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_WHITE
    },
    buttonContainer: {
        marginHorizontal: "10%",
        marginVertical: "5%",
        marginBottom: "10%"
    },
    imageContainer: {
        paddingHorizontal: "10%",
        paddingBottom: "15%",
        justifyContent: "flex-end",
        // alignItems: "center",
        height: SCREEN_HEIGHT * 0.9,
        width: SCREEN_WIDTH
    }
})