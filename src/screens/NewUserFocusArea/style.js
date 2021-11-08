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
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 50,
        borderLeftWidth: 2,
        height: 50,
        left: "18%",
        top: "27%"
    },
    shoulderStyle: {
        position: "absolute",
        bottom: "70%",
        width: 90,
        right: '15%'
    },
    armContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 70,
        borderRightWidth: 2,
        height: 30,
        right: "8%",
        top: "30%"
    },
    armStyle: {
        position: "absolute",
        bottom: "80%",
        right: '-45%'
    },
    chestContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 120,
        borderLeftWidth: 2,
        height: 20,
        right: "58%",
        top: "37%"
    },
    chestStyle: {
        position: "absolute",
        bottom: "80%",
        right: '70%'
    },
    legContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 80,
        borderRightWidth: 2,
        height: 20,
        left: "60%",
        top: "70%"
    },
    legStyle: {
        position: "absolute",
        bottom: "70%",
        left: '50%'
    },
    waistContainer: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 70,
        borderLeftWidth: 2,
        height: 10,
        left: "19%",
        top: "55%"
    },
    waistStyle: {
        position: "absolute",
        top: "10%",
        right: '55%'
    },
    backContainer: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 80,
        borderRightWidth: 2,
        height: 20,
        left: "61%",
        top: "42%"
    },
    backStyle: {
        position: "absolute",
        top: "70%",
        left: '60%'
    },
    gluteContainer: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 75,
        borderLeftWidth: 2,
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
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 80,
        borderRightWidth: 2,
        height: 30,
        left: "75%",
        top: "32%"
    },
    shoulderStyle1: {
        position: "absolute",
        bottom: "80%",
        width: 90,
        left: '35%'
    },
    armContainer1: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 90,
        borderLeftWidth: 2,
        height: 20,
        right: "40%",
        top: "50%"
    },
    armStyle1: {
        position: "absolute",
        top: "70%",
        right: '65%'
    },
    chestContainer1: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 80,
        borderLeftWidth: 2,
        height: 30,
        right: "47%",
        top: "35%"
    },
    chestStyle1: {
        position: "absolute",
        bottom: "80%",
        right: '60%'
    },
    gluteContainer1: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 70,
        borderRightWidth: 2,
        height: 30,
        left: "72%",
        top: "70%"
    },
    gluteStyle1: {
        position: "absolute",
        top: "80%",
        left: '40%'
    },
    backContainer1: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 60,
        borderRightWidth: 2,
        height: 20,
        left: "75%",
        top: "48%"
    },
    backStyle1: {
        position: "absolute",
        bottom: "80%",
        left: '45%'
    },
    waistContainer1: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 80,
        borderRightWidth: 2,
        height: 15,
        left: "69%",
        top: "59%"
    },
    waistStyle1: {
        position: "absolute",
        top: "10%",
        left: '50%'
    },
    legContainer1: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 75,
        borderLeftWidth: 2,
        height: 30,
        right: "53%",
        top: "80%"
    },
    legStyle1: {
        position: "absolute",
        bottom: "80%",
        left: '-55%'
    },
})
