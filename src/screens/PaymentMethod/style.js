import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "10%"
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