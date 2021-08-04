import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../lib/utils/constants";



export default StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        marginTop: "5%",
        height: SCREEN_HEIGHT * 0.4,
        width: SCREEN_WIDTH * 0.9,
        borderRadius: 13,
        bottom: "10%",
        alignSelf: "center"
    },
    rowContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly", bottom: "10%",
    },
    timerContainer: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    }
})