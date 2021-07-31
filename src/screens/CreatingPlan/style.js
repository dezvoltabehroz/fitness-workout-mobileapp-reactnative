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
        fontWeight: "bold",
        color: "#1F2729", textAlign: "center"
    },
    targetContainer: {
        alignItems: "center"
    },
    headingContainer: {
        marginVertical: "5%",
        alignItems: "center"
    },
    dashContainer: {
        // marginTop: "10%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    rowContainer: {
        flexDirection: "row"
    },
    progressContainer:{ alignItems: "center", justifyContent: "center", alignSelf: "center", height: 300, width: 300, marginTop: '10%', borderColor: THEME.DASH_LIGHT, borderWidth: 15, borderRadius: 220 },
    textStyle:{
        backgroundColor: "#fff",
        justifyContent: "center", alignItems: "center",
        height: 190,
        top: 25,
        left: 25,
        width: 190,
        overflow: 'hidden',
        fontWeight:"bold",
        borderRadius: 100,
    },
    buttonContainer: {
        // flex:0.3,
        // marginTop: "10%",
        marginHorizontal: "10%",
        justifyContent: "flex-end"
    },
    selectedButtonStyle: {
        marginTop: "5%",
        flexDirection: "row",
        backgroundColor: THEME.COLOR_WHITE,
        height: 67,
        borderRadius: 34,
        alignItems: "center",
        paddingHorizontal: "5%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    unSelectedButtonStyle: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: THEME.PRIMARY_TEXT_COLOR,
        backgroundColor: 'transparent',
        height: 67,
        borderRadius: 34,
        alignItems: "center",
        paddingHorizontal: "5%",
        marginTop: '5%'
    },
    decsHeading: {
        fontWeight: "bold"
    },
    decsTextStyle: {
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.PRIMARY_TEXT_COLOR
    },
    marginHorizontal1: {
        marginHorizontal: "2.5%",
    },
    marginHorizontal: {
        marginHorizontal: "2.5%",
    }
})
