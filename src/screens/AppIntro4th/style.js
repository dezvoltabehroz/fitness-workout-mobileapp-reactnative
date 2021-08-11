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
        marginHorizontal: "20%",
        justifyContent: "flex-end"
    },
    selectedButtonStyle: {
        marginTop: "5%",
        flexDirection: "row",
        backgroundColor: THEME.COLOR_WHITE,
        height: 67,
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: "5%",
        marginVertical: "5%",
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
        justifyContent: "center",
        borderRadius: 34,
        alignItems: "center",
        marginVertical: "5%",
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
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    backButton: {
        flex: 0.2,
        paddingTop: Platform.OS == 'ios' ? '10%' : '5%',
        alignItems: "center",
        justifyContent: "center"
    },
    rowContainer: {
        flexDirection: "row"
    },
    rowContainer1: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
})
