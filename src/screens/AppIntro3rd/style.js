import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
export default StyleSheet.create({
    container: {
        flex: 0.9,
        marginHorizontal: "5%",
        justifyContent: "center",
    },
    headingTextStyle: {
        fontSize: 22,
        fontWeight: "bold"
    },
    targetContainer: {
        alignItems: "center"
    },
    headingContainer: {
        marginVertical: "5%",
        alignItems: "center"
    },
    buttonContainer: {
        // flex:0.3,
        // marginTop: "10%",
        marginHorizontal: "10%",
        justifyContent: "flex-end"
    },
    selectedButtonStyle: {
        marginTop: "5%",
        flexDirection: "row",
        backgroundColor: THEME.COLOR_WHITE,
        height: 67,
        borderRadius: 34,
        alignItems: "center",
        paddingHorizontal: "5%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    unSelectedButtonStyle: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: THEME.PRIMARY_TEXT_COLOR,
        backgroundColor: 'transparent',
        height: 67,
        borderRadius: 34,
        alignItems: "center",
        paddingHorizontal: "5%",
        marginTop: '5%'
    },
    decsHeading: {
        fontWeight: "bold"
    },
    decsTextStyle: {
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.PRIMARY_TEXT_COLOR
    },
    marginHorizontal1: {
        marginHorizontal: "2.5%",
    },
    marginHorizontal: {
        marginHorizontal: "2.5%",
    },
    dashContainer: {
        flex: 0.8,
        // marginTop: "10%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    backButton: {
        flex: 0.2,
        // marginHorizontal: "5%",
        alignItems: "center",
        justifyContent: "center"
    },
    rowContainer: {
        flexDirection: "row"
    },
})
