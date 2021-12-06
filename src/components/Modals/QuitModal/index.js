import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Vegitable from '../../../assets/svg/vegetable-img.svg';
import Standard from '../../../assets/svg/standard-img.svg';
import themeStyle from '../../../assets/styles/theme.style';
import Button from '../../Button';
import { Icon } from '../..';

const UpgradeModal = (props) => {
    return (
        <Modal isVisible={props.visible} style={{ backgroundColor: 'rgba(0,0,0,0.7)', margin: 0 }}
        animationInTiming={400}
        animationOutTiming={200}>
            <View style={styles.modalContainer}>
                <Text style={styles.headingText}>DISCARD</Text>
                <Text style={styles.rowTextStyle}>DUMBELL PULLOVER</Text>
                <TouchableOpacity onPress={() => props.onRestart()} style={styles.restartContainer}>
                    <Text style={styles.rowTextStyle}>Restart this exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onQuit()} style={styles.quitContainer}>
                    <Text style={styles.rowTextStyle}>Quit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onResume()} style={styles.resumeContainer}>
                    <Text style={styles.rowTextStyle}>Resume</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: "5%",
        justifyContent: "center",
        // borderRadius: 25,
        // backgroundColor: themeStyle.COLOR_WHITE
    },
    restartContainer: {
        marginTop: "5%",
        // opacity: 0.1,
        paddingHorizontal: "5%",
        backgroundColor: '#44BDE870',
        borderRadius: 20,
        paddingVertical: "10%"
    },
    quitContainer: {
        marginTop: "5%",
        // opacity: 0.1,
        paddingHorizontal: "5%",
        backgroundColor: '#BC2330E0',
        borderRadius: 20,
        paddingVertical: "10%"
    },
    resumeContainer: {
        marginTop: "5%",
        // opacity: 0.1,
        paddingHorizontal: "5%",
        backgroundColor: '#FFFFFFCF',
        borderRadius: 20,
        paddingVertical: "10%"
    },

    headingText: {
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 18,
        color: '#fff',
        marginVertical: "5%"
    },
    rowTextStyle: {
        fontFamily: themeStyle.FONT_MEDIUM,
        color: '#fff',
        fontSize: 16,
    },
    rowTextStyleColor: {
        marginLeft: "5%",
        fontFamily: themeStyle.FONT_MEDIUM,
        color: '#44BDE8',
        fontSize: 16,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowContainer1: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: "5%",
        flexDirection: "row",
        marginTop: "5%",
        alignItems: "center"
    },
    rowContainer2: {
        borderRadius: 10,
        borderColor: "#44BDE8",
        borderWidth: 1,
        padding: "5%",
        flexDirection: "row",
        marginTop: "5%",
        alignItems: "center"
    },
    buttonContainer: {
        marginLeft: "60%",
        marginTop: "5%",
    },
})

export default UpgradeModal;