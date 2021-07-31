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
    decsTextStyle: {
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.PRIMARY_TEXT_COLOR
    },
})
