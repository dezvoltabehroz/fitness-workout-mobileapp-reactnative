import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
export default StyleSheet.create({
    container: {
        flex: 1,

    },
    headingContainer: {
        padding: "5%",
    },
    headingText: {
        fontFamily: THEME.FONT_MEDIUM,
        color: '#1F2729',
        textTransform: "capitalize"
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SCREEN_WIDTH,
        paddingVertical: "5%",
        paddingLeft: "5.5%"
    },
    contentContainer1: {
        borderRadius: 10,
        overflow: "hidden",
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_HEIGHT * 0.2,
    },
    opacity: {
        flex: 1,
        backgroundColor: '#00000059'
    },
    itemContainer: {
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 10,
        marginHorizontal: "2.5%",
        marginBottom: "2.5%",
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "5%"
    },
    greyText: {
        fontSize:THEME.FONT_SIZE_SMALL,
        fontFamily: THEME.FONT_MEDIUM,
        color: '#9B9B9B',
    }

})
