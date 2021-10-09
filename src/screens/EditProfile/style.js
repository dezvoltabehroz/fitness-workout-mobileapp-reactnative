import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../lib/utils/constants";

export default StyleSheet.create({
    headingText: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_MEDIUM,
        marginHorizontal: 10,
        color: '#091011'
    },
    textStyle: {
        color: '#797B7B',
        fontSize: 12,
        textAlign: "center",
        fontFamily: themeStyle.FONT_REGULAR,
        marginHorizontal: 10,
    },
    cardContainer: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 13,
        elevation: 5,
        padding: "5%",
        marginHorizontal: "5%",
        marginTop: "5%"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    rowMeasureContainer: {
        flexDirection: "row",
        marginHorizontal: "5%",
        paddingVertical: "5%",
        borderBottomWidth: 0.5,
        justifyContent: "space-between",
        alignItems: "center"
    },

    grayText: {
        color: '#797B7B',
        marginLeft: 10,
        width: "82.5%",
        fontSize: 13,
        fontFamily: themeStyle.FONT_REGULAR
    },
    rowStyle: {
        flexDirection: "row",
        justifyContent: "center",

        alignItems: "center",
    },
})