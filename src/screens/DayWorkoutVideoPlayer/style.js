import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../lib/utils/constants";


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        // marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        height: SCREEN_HEIGHT * 0.4
        // position: 'relative',
        // top: 0,
        // left: 0,
        // bottom:200,
        // right: 0,
        // backgroundColor: 'black',
        // justifyContent: 'center',
    },

})