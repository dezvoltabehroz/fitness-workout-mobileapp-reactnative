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
    buttonContainer: {
        marginTop: "5%",
        marginHorizontal: "20%",
        justifyContent: "flex-end"
    },
    selectedButtonStyle: {
        marginTop: "5%",
        flexDirection: "row",
        backgroundColor: THEME.COLOR_WHITE,
        height: 72,
        borderRadius: 40,
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
        height: 72,
        borderRadius: 40,
        alignItems: "center",
        paddingHorizontal: "5%",
        marginTop: '5%'
    },
    decsHeading: {
        fontWeight: "bold"
    },
    decsTextStyle: {
        width: SCREEN_WIDTH * 0.6,
        fontSize: THEME.FONT_SIZE_SMALL,
        color: "#484848"//THEME.PRIMARY_TEXT_COLOR
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
})
