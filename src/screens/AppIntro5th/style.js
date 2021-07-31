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
        marginVertical: "5%",
        alignItems: "center"
    },
    buttonContainer: {
        marginBottom: "5%",
        marginHorizontal: "10%",
        justifyContent: "flex-end"
    },
    shoulderContainer: {
        position: "absolute",
        borderBottomWidth: 2,
        borderColor: THEME.DASH_DARK,
        width: 100,
        borderRightWidth: 2,
        height: 30,
        left: "65%",
        top: "20%"
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
        right: "55%",
        top: "40%"
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
        top: "23%"
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
        left: "95%",
        top: "55%"
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
        left: "77%",
        top: "40%"
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
        right: "79%",
        top: "60%"
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
        flex: 0.8,
        paddingTop: Platform.OS == 'ios' ? '10%' : '5%',
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
    imageStyle:{
         width: SCREEN_WIDTH * 0.4,
          height: SCREEN_HEIGHT * 0.6,
           alignSelf: "center",
            marginRight: "5%" 
    }
})
