import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1
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
        flexWrap: "wrap", width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: "center"
        // paddingRight: 50
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textDescription: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#9B9B9B'
    },
    itemContainer: {
        flexDirection: 'row', padding: 9, alignItems: "center"
    },
    dayStyle: {
        height: 40, width: 40, justifyContent: "center", alignItems: "center", borderWidth: 1, borderRadius: 20, borderColor: '#9B9B9B'
    },
    headingText: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_MEDIUM,
        marginHorizontal: 10,
        color: '#091011'
    },
    textStyle: {
        color: '#797B7B',
        fontSize: 12,
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
})