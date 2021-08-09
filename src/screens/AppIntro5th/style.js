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
        // marginVertical: "5%",
        alignItems: "center"
    },
    buttonContainer: {
        // marginBottom: "5%",
        marginHorizontal: "10%",
        // justifyContent: "flex-end"
    },
    shoulderContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 50,
        borderLeftWidth: 2,
        height: 30,
        left: "15%",
        top: "29%"
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
        right: "-10%",
        top: "32%"
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
        width: 100,
        borderLeftWidth: 2,
        height: 20,
        right: "66%",
        top: "38%"
    },
    chestStyle: {
        position: "absolute",
        bottom: "80%",
        right: '60%'
    },
    legContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 70,
        borderRightWidth: 2,
        height: 20,
        left: "65%",
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
        width: 90,
        borderRightWidth: 2,
        height: 20,
        left: "60%",
        top: "48%"
    },
    waistStyle: {
        position: "absolute",
        top: "70%",
        left: '65%'
    },
    backContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 90,
        borderLeftWidth: 2,
        height: 20,
        // left: "10%",
        top: "52%"
    },
    backStyle: {
        position: "absolute",
        bottom: "80%",
        left: '-45%'
    },
    gluteContainer: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 75,
        borderLeftWidth: 2,
        height: 30,
        right: "66%",
        top: "65%"
    },
    gluteStyle: {
        position: "absolute",
        top: "80%",
        left: '-45%'
    },
    decsTextStyle: {
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.PRIMARY_TEXT_COLOR
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
        // marginBottom:100 ,
        width: SCREEN_WIDTH * 0.6,
        height: SCREEN_HEIGHT * 0.55,
        alignSelf: "center",
        marginRight: "5%",
        marginBottom: "5%"
    },
    shoulderContainer1: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 50,
        borderRightWidth: 2,
        height: 30,
        left: "85%",
        top: "28%"
    },
    shoulderStyle1: {
        position: "absolute",
        bottom: "80%",
        width: 90,
        left: '5%'
    },
    armContainer1: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 80,
        borderLeftWidth: 2,
        height: 30,
        right: "50%",
        top: "47%"
    },
    armStyle1: {
        position: "absolute",
        bottom: "80%",
        right: '60%'
    },
    chestContainer1: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 50,
        borderLeftWidth: 2,
        height: 30,
        right: "47%",
        top: "35%"
    },
    chestStyle1: {
        position: "absolute",
        bottom: "80%",
        right: '40%'
    },
    gluteContainer1: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 70,
        borderRightWidth: 2,
        height: 30,
        left: "80%",
        top: "70%"
    },
    gluteStyle1: {
        position: "absolute",
        top: "80%",
        left: '40%'
    },
    backContainer1: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 60,
        borderRightWidth: 2,
        height: 20,
        left: "80%",
        top: "55%"
    },
    backStyle1: {
        position: "absolute",
        top: "70%",
        left: '50%'
    },
    waistContainer1: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 60,
        borderRightWidth: 2,
        height: 30,
        left: "85%",
        top: "45%"
    },
    waistStyle1: {
        position: "absolute",
        bottom: "80%",
        left: '45%'
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
