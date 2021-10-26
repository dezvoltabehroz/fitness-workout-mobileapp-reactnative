import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
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
    headingColorStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FD4E00",
        textAlign: "center",
        fontStyle: "italic",
    },
    arrowButtonContainer: {
        top: -10,
        alignItems: "center"
    },
    arrowContainer: {
        position: "absolute",
        top: 10,
        marginLeft: 2.5
    },
    dashContainer: {
        flex: 1,
        // paddingTop: Platform.OS == 'ios' ? '10%' : '5%',
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    marginHorizontal: {
        flex: 0.2,
        marginHorizontal: "2.5%",
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
    decsTextStyle: {
        marginTop: "5%",
        color: THEME.PRIMARY_TEXT_COLOR,
        textAlign: "center"
    },
    headingContainer: {
        marginVertical: "5%",
        alignItems: "center"
    },
    networkContainer: {
        alignItems: "center"
    },
    secondHeadingContainer: {
        // marginTop: "15%",
        justifyContent:"center",
        alignItems: "center"
    },
    secondHeadingStyle: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: "5%",
        textAlign: "center"
    },
    buttonContainer: {
        marginRight: "5%",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    firstContainer: {
        width: SCREEN_WIDTH * 0.25
    },
    imageStyle: {
        height: SCREEN_HEIGHT * 0.45,
        width: SCREEN_WIDTH * 0.55
    },
    buttonStyle: {
        height: 50,
        width: 50,
        backgroundColor: "white",
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center"
    }
})
