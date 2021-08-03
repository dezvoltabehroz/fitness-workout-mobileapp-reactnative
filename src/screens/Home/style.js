import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
export default StyleSheet.create({
    container: {
        flex: 1,

    },
    headingTextStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1F2729", textAlign: "center"
    },
    targetContainer: {
        alignItems: "center"
    },
    headingContainer: {
        paddingTop: Platform.OS == 'ios' ? '10%' : '5%',
        backgroundColor: THEME.BAR_COLOR,
        paddingHorizontal: "5%",
    },
    headingContainer1: {
        backgroundColor: THEME.BAR_COLOR,
        paddingHorizontal: "5%",
        paddingBottom: "5%",
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25
    },

    progressContainer: { alignItems: "center", justifyContent: "center", alignSelf: "center", height: 300, width: 300, marginTop: '10%', borderColor: THEME.DASH_LIGHT, borderWidth: 15, borderRadius: 220 },
    textStyle: {
        backgroundColor: "#fff",
        justifyContent: "center", alignItems: "center",
        height: 190,
        top: 25,
        left: 25,
        width: 190,
        overflow: 'hidden',
        fontWeight: "bold",
        borderRadius: 100,
    },
    buttonContainer: {
        // flex:0.3,
        // marginTop: "10%",
        marginHorizontal: "10%",
        justifyContent: "flex-end"
    },
    verticalLine: {
        height: 25,
        width: 1,
        backgroundColor: "#0000004D"
    },
    decsTextStyle: {
        fontSize: THEME.FONT_SIZE_SMALL,
        fontFamily: THEME.FONT_REGULAR,
        color: THEME.PRIMARY_TEXT_COLOR
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    planContainer: {
        flexDirection: "row",
        marginVertical: "10%",
        marginBottom: "15%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 15,
        paddingVertical: '5%',
        padding: '5%'
    },
    alignItems: { alignItems: "center" },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    workoutDayContainer: {
        backgroundColor: THEME.DASH_LIGHT,
        marginHorizontal: "5%",
        padding: "5%",
        borderRadius: 15,
        overflow: "hidden",
        width: SCREEN_WIDTH * 0.9,
        bottom: "5%"
    },
    goButtonContainer: {
        marginTop: "10%",
        width: SCREEN_WIDTH * 0.3,

    },
    rowStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: '25%',
        marginVertical: "5%",
    },

    barTextStyle: {
        color: THEME.BAR_COLOR,
        fontFamily: THEME.FONT_MEDIUM,
        fontSize: 18,
        marginHorizontal: 5
    },
    whiteTextStyle: {
        fontSize: 18,
        color: THEME.COLOR_WHITE,
        fontFamily: THEME.FONT_MEDIUM,
    },
    whiteTextStyle1: {
        fontSize: 14,
        fontFamily: THEME.FONT_REGULAR,
        color: THEME.COLOR_WHITE,
        // marginHorizontal: 5
    },
    whiteTextStyle2: {
        fontSize: 13,
        fontFamily: THEME.FONT_MEDIUM,
        color: THEME.COLOR_WHITE,
        // marginHorizontal: 5
    },
    cardContainer: {
        bottom: "5%",
        backgroundColor: THEME.DASH_LIGHT, margin: "5%", borderRadius: 25, padding: 30, justifyContent: "space-between", height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.9
    },
    cardContainer1: {
        bottom: "5%",
        backgroundColor: THEME.DASH_LIGHT,
        margin: "5%",
        borderRadius: 25,
        paddingHorizontal: 30,
        justifyContent: "center",
        height: SCREEN_HEIGHT * 0.2,
        width: SCREEN_WIDTH * 0.9,
    },
    starContainer: {
        position: "absolute", top: '-15%', left: '5%'
    }

})
