import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";


export default StyleSheet.create({
    upperContainer: {
        padding: "5%",
        marginTop: "5%",
        marginHorizontal: "5%",
        borderRadius: 15,
        backgroundColor: themeStyle.COLOR_WHITE,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%"
    },
    itemContainer: {
        flex: 1,
        paddingVertical: "5%",
        marginLeft: "5%",
        borderBottomWidth: 0.5,
        borderColor: 'lightgray'
    },
    heading: {
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 18,
        color: '#1F2729'
    },
    text: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16,
        color: "#1F2729"
    },
    scrollContainer: {
        paddingVertical: '5%',
        paddingBottom: "10%"
    }
})