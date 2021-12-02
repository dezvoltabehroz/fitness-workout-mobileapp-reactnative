import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Resume from '../../../assets/svg/refresh.svg';
import Completed from '../../../assets/svg/next.svg';
import themeStyle from '../../../assets/styles/theme.style';
import Input from '../../Input';


const CalftSizeModal = (props) => {
    const changeInches = (e) => {
        if ( e <= 99) {
            props.onChangeText(e)
        } else {
            alert("Please enter an appropriate measurement in inches")
        }

    }
    return (
        <Modal isVisible={props.visible}
            animationInTiming={400}
            animationOutTiming={200} >
            <View style={styles.modalContainer} >


                <View style={{ marginBottom: "10%" }}>
                    <Text style={styles.headingText}>Calf Size</Text>
                </View>
                <View style={{ marginBottom: "10%" }}>
                    <Input keyboardType={"number-pad"} placeholder=' ' onChangeText={(e) => changeInches(e)} />
                </View>


                <View style={styles.rowContainer}>
                    <TouchableOpacity style={{ marginHorizontal: 30 }} onPress={() => props.onClose()}>
                        <Text style={styles.blackText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => props.onSave()}>
                        <Text style={styles.colorText}>Save</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "white",
        padding: '5%',
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 25
    },

    rowContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    colorText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 16,
        color: themeStyle.BAR_COLOR
    },
    blackText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 16,
        color: '#B2B2B2'
    },
    headingText: {
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 21,
        color: '#1F2729',
        textAlign: "center"

    }

})

export default CalftSizeModal;