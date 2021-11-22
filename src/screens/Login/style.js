import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    outLineContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10%"
    },
    heading: {
        marginTop: 30,
        fontSize: 30,
        fontFamily: themeStyle.FONT_BOLD
    },
    whiteBtnContainer: {
        marginHorizontal: '10%',
        marginTop: 23,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: 52,
        borderRadius: 26,
        backgroundColor: themeStyle.COLOR_WHITE,
        paddingHorizontal: "10%"
    },
    facebookBtnContainer: {
        marginTop: 23,
        marginHorizontal: '10%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 52,
        alignItems: "center",
        borderRadius: 26,
        backgroundColor: '#3B5998',
        paddingHorizontal: "10%"
    },
    alignItems: {
        flex: 0.3, alignItems: "center"
    },
    flex: {
        flex: 0.8
    },
    appleBtnContainer: {
        marginHorizontal: '10%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 23,
        alignItems: "center",
        height: 52,
        borderRadius: 26,
        backgroundColor: themeStyle.COLOR_BLACK,
        paddingHorizontal: "10%"
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16
    },
    blackText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16
    },
    cardContainer: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 13,
        elevation: 5,
        padding: "5%",

        marginHorizontal: "5%",
        marginTop: "5%"
    },
})