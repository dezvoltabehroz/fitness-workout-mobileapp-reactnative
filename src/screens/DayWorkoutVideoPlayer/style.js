import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../lib/utils/constants";


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        // marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        flex: 0.5,
        height: SCREEN_HEIGHT * 0.4,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    videoContainer: {
        height: SCREEN_HEIGHT * 0.35,
    },
    textStyle: {
        marginLeft: "2.5%",
        fontFamily: themeStyle.FONT_REGULAR,
        color: 'white'
    },
    lowerContainer: {
        flex: 0.5,
        paddingTop: "10%",
        paddingHorizontal: "5%",
        backgroundColor: "#2F3435"
    },
    headingStyle: {
        fontFamily: themeStyle.FONT_BOLD,
        color: "white",
        fontSize: 18
    },
    rowContainer:{ marginTop: "5%", flexDirection: "row" }
})