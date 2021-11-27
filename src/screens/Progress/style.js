import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
export default StyleSheet.create({
    container: {
        flex: 1,

    },
    headingContainer1: {
        backgroundColor: THEME.BAR_COLOR,
        paddingHorizontal: "5%",
        // paddingBottom: "5%",
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25
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
        margin: "5%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowContainer1: {
        flexDirection: "row",
        marginHorizontal: "5%",
        marginBottom: "2.5%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowMeasureContainer: {
        flexDirection: "row",
        marginHorizontal: "5%",
        paddingVertical: "5%",
        borderBottomWidth: 0.5,
        justifyContent: "space-between",
        alignItems: "center"
    },
    planContainer: {
        flexDirection: "row",
        marginVertical: "5%",
        // marginBottom: "15%",
        paddingHorizontal: "10%",
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
        alignItems: "center",
        marginVertical: "5%",
        marginBottom: '10%'
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
    textStyle1: {
        fontSize: 16,
        marginRight: "12.5%",
        fontFamily: THEME.FONT_MEDIUM,
        color: THEME.COLOR_BLACK,
        textTransform: "uppercase"
        // marginHorizontal: 5
    },
    textStyle: {
        fontSize: 14,
        marginRight: "12.5%",
        fontFamily: THEME.FONT_MEDIUM,
        color: '#D4CFCF',
        textTransform: "uppercase"
        // marginHorizontal: 5
    },
    blackText: {
        fontSize: 14,
        fontFamily: THEME.FONT_MEDIUM,
        color: '#091011',
        // marginHorizontal: 5
    },

    divider: {
        height: 20,
        backgroundColor: THEME.DASH_LIGHT
    },
    bmiContainer: {
        paddingVertical: "2.5%"
        // height: SCREEN_HEIGHT * 0.3,
        // backgroundColor:"white"
    },
    blackheading: {
        color: '#091011',
        fontSize: 16,
        fontFamily: THEME.FONT_MEDIUM
    },
    colorText: {
        color: "#00ADDC",
        fontSize: 14,
        fontFamily: THEME.FONT_MEDIUM
    },
    colorText1: {
        color: "#00ADDC",
        fontSize: 14,
        fontFamily: THEME.FONT_REGULAR
    },
    grayText: {
        color: '#797B7B',
        fontSize: 16,
        fontFamily: THEME.FONT_REGULAR
    },
    container1: {
        flex: 1,
        overflow: "hidden",
        justifyContent: "center", alignItems: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    dateContainer: {
        flex: 1,
        marginBottom: "5%",
        marginTop: "5%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    dateText: {
        color: THEME.COLOR_WHITE,
        fontFamily: THEME.FONT_MEDIUM,
        fontSize: 14
    },
})
