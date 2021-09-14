import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1
    },

    week1Style: {
        marginTop: "5%",
        // marginHorizontal: "5%",
        // backgroundColor: themeStyle.COLOR_WHITE,
        // borderRadius: 25,
        // padding: "5%"
    },

    titleContainer: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between"
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    titleStyle: {
        marginTop: -12.5, width: SCREEN_WIDTH * 0.4, justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_MEDIUM,
        color: themeStyle.BAR_COLOR,
        textTransform: "capitalize"
    },
    leftTitleStyle: {
        marginTop: -12.5, marginRight: 15, justifyContent: 'center'
    },
    descriptionContainer: {
        flexWrap: "wrap",
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        alignItems: "center",
        paddingLeft: '5%',
        paddingBottom: "5%"
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textDescription: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#9B9B9B'
    },
    itemContainer1: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 5,
        alignItems: "center"
    },
    dayStyle: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 40,
        borderColor: '#9B9B9B'
    },
    headingText: {
        fontSize: 16,
        marginTop: '5%',
        fontFamily: themeStyle.FONT_MEDIUM,
        marginHorizontal: 10,
        color: '#091011'
    },
    textStyle: {
        color: '#797B7B',
        fontSize: 12,
        marginTop: '5%',
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


    itemContainer: {
        elevation: 5,
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
        marginHorizontal: "2.5%",
        marginBottom: "2.5%",
    },
    textContainer: {
        padding: "5%"
    },
    greyText: {

        fontSize: themeStyle.FONT_SIZE_LARGE,
        fontFamily: themeStyle.FONT_MEDIUM,
        color: '#9B9B9B',
    },
    colorText: {
        fontSize: themeStyle.FONT_SIZE_LARGE,
        fontFamily: themeStyle.FONT_MEDIUM,
        color: themeStyle.BAR_COLOR,
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    rowContainer: {
        flex: 1,
        marginVertical: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dayText: {
        fontSize: 35,
        color: "#091011",
        fontFamily: themeStyle.FONT_BOLD
    },
    textStyle: {
        fontFamily: themeStyle.FONT_BOLD
    }


})