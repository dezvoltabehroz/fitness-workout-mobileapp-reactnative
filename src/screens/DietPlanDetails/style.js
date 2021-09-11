import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 13,
        elevation: 5,
        padding: "5%",
        marginHorizontal: "5%",
        marginTop: "5%"
    },
    cardContainer1: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 25,
        alignItems: "center",
        elevation: 5,
        padding: "10%",
        // marginHorizontal: "5%",
        marginTop: "5%"
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: "5%",
        alignItems: "center"
    },
    headingText: {
        fontSize: 16,
        textTransform: "capitalize",
        marginTop: '2.5%',
        fontFamily: themeStyle.FONT_MEDIUM,
        marginHorizontal: 10,
        color: '#091011'
    },
    textStyle: {
        color: '#797B7B',
        fontSize: 12,
        // marginTop: '5%',
        fontFamily: themeStyle.FONT_REGULAR,
        marginHorizontal: 10,
    },
    textStyle1: {
        color: '#797B7B',
        fontSize: 12,
        marginTop: '5%',
        fontFamily: themeStyle.FONT_REGULAR,
        marginHorizontal: 10,
    },
})