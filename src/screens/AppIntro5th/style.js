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
        width: 100,
        borderRightWidth: 2,
        height: 30,
        left: "65%",
        top: "25%"
    },
    shoulderStyle: {
        position: "absolute",
        bottom: "80%",
        left: '45%'
    },
    armContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 100,
        borderLeftWidth: 2,
        height: 30,
        right: "50%",
        top: "55%"
    },
    armStyle: {
        position: "absolute",
        bottom: "80%",
        right: '62.5%'
    },
    chestContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 100,
        borderLeftWidth: 2,
        height: 30,
        right: "62%",
        top: "35%"
    },
    chestStyle: {
        position: "absolute",
        bottom: "80%",
        right: '60%'
    },
    gluteContainer: {
        position: "absolute",
        borderTopWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 70,
        borderRightWidth: 2,
        height: 30,
        left: "85%",
        top: "70%"
    },
    gluteStyle: {
        position: "absolute",
        top: "80%",
        left: '40%'
    },
    backContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 100,
        borderRightWidth: 2,
        height: 30,
        left: "70%",
        top: "50%"
    },
    backStyle: {
        position: "absolute",
        bottom: "80%",
        left: '60%'
    },
    legContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 75,
        borderLeftWidth: 2,
        height: 30,
        right: "59%",
        top: "80%"
    },
    legStyle: {
        position: "absolute",
        bottom: "80%",
        left: '-55%'
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
    }
})
