import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import { SCREEN_WIDTH } from '../../lib/utils/constants';
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
    dashContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    rowContainer: {
        flexDirection: "row"
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
        marginTop: '5%',
        flexDirection: "row",
        borderWidth: 1,
        backgroundColor: 'transparent',
        height: 67,
        borderRadius: 34,
        alignItems: "center",
        paddingHorizontal: "5%",
        borderColor: THEME.PRIMARY_TEXT_COLOR,
    },
    decsHeading: {
        fontWeight: "bold"
    },
    decsTextStyle: {
        width: SCREEN_WIDTH * 0.6,
        fontSize: THEME.FONT_SIZE_SMALL,
        color: "#484848" //THEME.PRIMARY_TEXT_COLOR
    },
    marginHorizontal1: {
        marginHorizontal: "2.5%",
    },
    marginHorizontal: {
        marginHorizontal: "2.5%",
    }
})
