
import { StyleSheet } from 'react-native';
import themeStyle from '../assets/styles/theme.style';
export default StyleSheet.create({
    headerTitleStyle: { color: "#fff" },
    headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR
    },
    headerStyle1: {
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: themeStyle.BAR_COLOR,
    },
    headerTextStyle: {
        color: "#fff",
        textTransform: "uppercase",
    },
    headerTextStyle1: {
        color: "#fff",
        textTransform: "uppercase",
        paddingLeft:"10%"
    }

})