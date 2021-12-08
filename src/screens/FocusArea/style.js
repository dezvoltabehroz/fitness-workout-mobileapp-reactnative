import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
export default StyleSheet.create({
    container: {
        flex: 1,
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
        alignItems: "center"
    },
    buttonContainer: {
        marginHorizontal: "20%",
    },
    shoulderContainer: {
        position: "absolute",
        // borderRightWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 50,
             // borderLeftWidth: 2,
        height: 30,
        left: "23%",
        top: "31%"
    },
    shoulderStyle: {
        position: "absolute",
        bottom: "70%",
        width: 90,
        right: '15%'
    },
    armContainer: {
        position: "absolute",
        // borderRightWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 70,
        // borderRightWidth: 2,
        height: 30,
        right: "12.5%",
        top: "35%"
    },
    armStyle: {
        position: "absolute",
        bottom: "80%",
        right: '-45%'
    },
    chestContainer: {
        position: "absolute",
        // borderRightWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 100,
             // borderLeftWidth: 2,
        height: 20,
        right: "52%",
        top: "50%"
    },
    chestStyle: {
        position: "absolute",
        bottom: "80%",
        right: '70%'
    },
    legContainer: {
        position: "absolute",
        // borderRightWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 80,
        // borderRightWidth: 2,
        height: 20,
        left: "55%",
        top: "68%"
    },
    legStyle: {
        position: "absolute",
        bottom: "70%",
        left: '50%'
    },
    waistContainer: {
        position: "absolute",
        // borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 70,
             // borderLeftWidth: 2,
        height: 20,
        left: "17%",
        top: "53%"
    },
    waistStyle: {
        position: "absolute",
        top: "70%",
        right: '55%'
    },
    backContainer: {
        position: "absolute",
        // borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 80,
        // borderRightWidth: 2,
        height: 20,
        left: "57.5%",
        top: "42%"
    },
    backStyle: {
        position: "absolute",
        top: "70%",
        left: '60%'
    },
    gluteContainer: {
        position: "absolute",
        // borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 75,
             // borderLeftWidth: 2,
        height: 30,
        right: "62%",
        top: "65%"
    },
    gluteStyle: {
        position: "absolute",
        top: "80%",
        left: '-45%'
    },
    decsTextStyle: {
        fontSize: THEME.FONT_SIZE_SMALL,
        color: "#484848"// THEME.PRIMARY_TEXT_COLOR
    },
    dashContainer: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? SCREEN_HEIGHT >= 812 ? '22.5%' : '15%' : '12.5%',
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    backButton: {
        flex: 0.2,
        paddingTop: Platform.OS == 'ios' ? '15%' : '15%',
        alignItems: "center",
        justifyContent: "center"
    },
    rowContainer: {
        flexDirection: "row"
    },
    bgStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    imageStyle: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.55,
        alignSelf: "center",
        marginRight: "10%",
        marginBottom: "5%"
    },
    imageStyleGirl: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.55,
        alignSelf: "center",
        marginBottom: "5%"
    },
    shoulderContainer1: {
        position: "absolute",
        // borderRightWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 50,
        //       borderRightWidth: 2,
        height: 30,
        left: "80%",
        top: "24%"
    },
    shoulderStyle1: {
        position: "absolute",
        bottom: "80%",
        width: 90,
        left: '5%'
    },
    armContainer1: {
        position: "absolute",
        // borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 90,
             // borderLeftWidth: 2,
        height: 20,
        right: "45%",
        top: "45%"
    },
    armStyle1: {
        position: "absolute",
        top: "70%",
        right: '65%'
    },
    chestContainer1: {
        position: "absolute",
        // borderRightWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 80,
             // borderLeftWidth: 2,
        height: 30,
        right: "50%",
        top: "31%"
    },
    chestStyle1: {
        position: "absolute",
        bottom: "80%",
        right: '60%'
    },
    gluteContainer1: {
        position: "absolute",
        // borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 70,
        // borderRightWidth: 2,
        height: 30,
        left: "72%",
        top: "62%"
    },
    gluteStyle1: {
        position: "absolute",
        top: "80%",
        left: '40%'
    },
    backContainer1: {
        position: "absolute",
        // borderRightWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 60,
        // borderRightWidth: 2,
        height: 30,
        left: "77.5%",
        top: "42%"
    },
    backStyle1: {
        position: "absolute",
        bottom: "80%",
        left: '45%'
    },
    waistContainer1: {
        position: "absolute",
        // borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 60,
        // borderRightWidth: 2,
        height: 20,
        left: "75%",
        top: "52%"
    },
    waistStyle1: {
        position: "absolute",
        top: "70%",
        left: '50%'
    },
    legContainer1: {
        position: "absolute",
        // borderRightWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 75,
             // borderLeftWidth: 2,
        height: 30,
        right: "40%",
        top: "80%"
    },
    legStyle1: {
        position: "absolute",
        bottom: "80%",
        left: '-55%'
    },
})
