import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        marginTop: "20%",
        borderRadius: 15,
        marginHorizontal: "8%",
        backgroundColor: themeStyle.COLOR_WHITE,
        padding: "5%"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%"
    },
    itemStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: "5%",
        marginLeft: "5%",
        borderBottomWidth: 0.5,
        alignItems: "center",
        borderColor: 'lightgray'
    },
    heading: {
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 18,
        textTransform: "uppercase",
        color: '#1F2729'
    },
    nameContainer: {
        top: -50,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16,
        color: 'lightgray'
    },
    graytext: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12,
        color: 'lightgray'
    },
    colortext: {
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.DASH_DARK
    },
    scrollContainer: {
        paddingVertical: '5%',
        paddingBottom: "10%"
    },
    avatarContainer: {
        top: -70,
        justifyContent: "center",
        alignItems: 'center'
    },
})