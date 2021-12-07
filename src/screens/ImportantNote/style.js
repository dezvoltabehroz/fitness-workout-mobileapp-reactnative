import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "15%",
    },
    svgContainer: {
        marginTop: "5%",
        alignItems: "center"
    },
    importantTextContainer: {
        marginTop: "10%",
        marginHorizontal: "10%",
        alignItems: "center"
    },
    textStyle: {
        marginTop: "5%",
        textAlign: "center",
        color: "#1F2729"
    },
    textStyle1: {
        marginTop: "5%",
        textAlign: "left",
        color: "#1F2729",
    },
    headingText: {
        fontSize: 22,
        color: "#091011",
        fontWeight: "bold",
    },
    rowContainer: {
        flexDirection: "row",
        width: SCREEN_WIDTH * 0.8,
        // alignItems: "center",
        marginHorizontal: "5%"
    },
    gap: {
        width: 20
    },
    buttonContainer: {
        marginVertical: "10%",
        marginHorizontal: "15%"
    }
})