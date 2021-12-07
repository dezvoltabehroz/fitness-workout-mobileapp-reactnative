import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Focus from '../../../assets/svg/focus-1.svg';

import themeStyle from '../../../assets/styles/theme.style';
import Button from '../../Button';
import { Icon } from '../..';

const UpgradeModal = (props) => {
    return (
        <Modal isVisible={props.visible} backdropColor={"rgba(0,0,0,0.9)"}>
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => props.onSkip()} style={{ justifyContent: "center", alignItems: "flex-end" }}>
                    <Icon.AntDesign name="close" size={20} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Focus />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.headingText}>Change Your Focus Area</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.rowTextStyle}>Get us to design your next workout by choosing new Focus Areas</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={'GO!'} onPress={() => props.onGo()} />
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        // flex: 1,
        // marginHorizontal: "5%",
        padding: "5%",
        // paddingVertical: "10%",
        // justifyContent: "center",
        borderRadius: 8,
        backgroundColor: themeStyle.COLOR_WHITE
    },
    textContainer: {
        marginTop: "5%",
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
        fontSize: 15,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#000000',
        textAlign: "center",
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
        marginHorizontal: "25%",
        marginTop: "10%"
    },
    skipText: {
        fontSize: themeStyle.FONT_SIZE_LARGE,
        textAlign: "center",
        textDecorationLine: "underline",
    }

})

export default UpgradeModal;