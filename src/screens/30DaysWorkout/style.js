import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
export default StyleSheet.create({
    container: {
        flex: 1,

    },
    upperContainer: {

    },
    imageStyle: {
        height: SCREEN_HEIGHT * 0.25,
        width: SCREEN_WIDTH,
        justifyContent: "center",
        padding: "5%"
    },
    stylingImage: {
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    headingContainer: {
        padding: "5%",
    },
    headingText: {
        height: 25,
        fontSize: 18,
        fontFamily: THEME.FONT_BOLD,
        color: THEME.COLOR_WHITE,
        textTransform: "uppercase",
        borderBottomWidth: 10,
        borderColor: THEME.BAR_COLOR
    },
    headingText1: {
        fontSize: 18,
        fontFamily: THEME.FONT_MEDIUM,
        color: THEME.COLOR_WHITE,
        textTransform: "uppercase",
    },
    whiteText: {
        fontSize: 14,
        fontFamily: THEME.FONT_REGULAR,
        color: THEME.COLOR_WHITE,
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SCREEN_WIDTH,
        paddingVertical: "5%",
        paddingLeft: "5.5%"
    },
    contentContainer1: {
        borderRadius: 10,
        overflow: "hidden",
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_HEIGHT * 0.2,
    },
    opacity: {
        flex: 1,
        backgroundColor: '#00000059'
    },
    itemContainer: {
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 10,
        marginHorizontal: "2.5%",
        marginBottom: "2.5%",
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        paddingTop: '5%'
    },
    textContainer1: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "5%"
    },
    greyText: {
        fontSize: THEME.FONT_SIZE_SMALL,
        fontFamily: THEME.FONT_MEDIUM,
        color: '#9B9B9B',
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    rowContainer1: {
        flex: 1,
        // marginVertical: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowContainer: {
        flex: 1,
        marginVertical: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    dayText: {
        fontSize: 35,
        color: "#091011",
        fontFamily: THEME.FONT_BOLD
    },
    dayText1: {
        fontSize: 22,
        color: "#091011",
        fontFamily: THEME.FONT_BOLD
    },
    textStyle: {
        fontFamily: THEME.FONT_BOLD
    }

})
