import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
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
        flex: 0.8,
        paddingTop: Platform.OS == 'ios' ? '10%' : '5%',
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
        marginTop: "15%",
        alignItems: "center"
    },
    secondHeadingStyle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonContainer: {
        marginHorizontal: "10%",
        justifyContent: "flex-end"
    }
})
