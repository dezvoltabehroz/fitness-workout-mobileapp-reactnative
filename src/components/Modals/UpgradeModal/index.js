import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Tick from '../../../assets/svg/black-tick.svg';

import themeStyle from '../../../assets/styles/theme.style';
import Button from '../../Button';

const UpgradeModal = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.headingText}>Upgrade Membership</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>Unlock Membership Access To All Restricted Content</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Tick />
                    <Text style={styles.rowTextStyle}>High Quality Workout Music</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Tick />
                    <Text style={styles.rowTextStyle}>High Quality Workout Music</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Tick />
                    <Text style={styles.rowTextStyle}>High Quality Workout Music</Text>
                </View>
                <Text style={styles.textStyle}>Use Advance Features Only With</Text>
                <View style={styles.rowContainer1}>
                    <Text style={styles.color}>$10.00</Text>
                    <Text style={styles.smallText}>For life time</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={'UPGRADE'} onPress={() => props.onSkip()} />
                </View>
                <TouchableOpacity onPress={() => props.onSkip()} style={styles.buttonContainer}>
                    <Text style={styles.skipText}>SKIP</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        // flex: 1,
        // marginHorizontal: "5%",
        padding: "5%",
        paddingVertical: "15%",
        // justifyContent: "center",
        borderRadius: 25,
        backgroundColor: themeStyle.COLOR_WHITE
    },
    textContainer: {
        alignItems: "center"
    },
    headingText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 24,
        textAlign: "center"
    },
    color: {
        color: "#32B3E1",
        fontSize: 24,
        fontFamily: themeStyle.FONT_BOLD,
    },
    textStyle: {
        marginVertical: "5%",
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#1F2729',
        textAlign: "center"
    },
    smallText: {
        marginTop: "2%",
        fontSize: themeStyle.FONT_SIZE_SMALL,
        marginLeft: "5%",
        color: "#1F2729"
    },
    rowTextStyle: {
        marginLeft: "5%",
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#1F2729',
        // marginTop:"5%",
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center"
    },
    rowContainer1: {
        flexDirection: "row",
        marginTop: "2.5%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginHorizontal: "20%",
        marginTop: "5%"
    },
    skipText: {
        fontSize: themeStyle.FONT_SIZE_LARGE,
        textAlign: "center",
        textDecorationLine: "underline",
    }

})

export default UpgradeModal;