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
        <Modal isVisible={props.visible}
            animationInTiming={400}
            animationOutTiming={200}
        >
            <View style={styles.modalContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.headingText}>What is your dietary preference?</Text>
                    <Icon.AntDesign disabled={props.loading} onPress={() => props.onClose()} name="close" size={25} />
                </View>
                <TouchableOpacity onPress={() => props.onValue('vegetarian')} style={props.value == 'vegetarian' ? styles.rowContainer2 : styles.rowContainer1}>
                    <Vegitable />
                    <Text style={props.value == 'vegetarian' ? styles.rowTextStyleColor : styles.rowTextStyle}>Vegetarian/Vegan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onValue('standard diet')} style={props.value == 'standard diet' ? styles.rowContainer2 : styles.rowContainer1}>
                    <Standard />
                    <Text style={props.value == 'standard diet' ? styles.rowTextStyleColor : styles.rowTextStyle}>Standard Diet</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Button disabled={props.value ? false : true} loading={props.loading} title={'DONE'} onPress={() => props.onSkip()} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: "5%",
        borderRadius: 25,
        backgroundColor: themeStyle.COLOR_WHITE
    },
    headingText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 18,
        color: '#1F2729',
    },
    rowTextStyle: {
        marginLeft: "5%",
        fontFamily: themeStyle.FONT_MEDIUM,
        color: '#1F2729',
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