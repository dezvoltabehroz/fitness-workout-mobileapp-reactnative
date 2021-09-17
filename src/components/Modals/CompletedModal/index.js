import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Resume from '../../../assets/svg/refresh.svg';
import Completed from '../../../assets/svg/img.svg';
import themeStyle from '../../../assets/styles/theme.style';


const UpgradeModal = (props) => {
    return (
        <Modal isVisible={props.visible} style={{ backgroundColor: 'rgba(0,0,0,0.7)', margin: 0 }}
        animationInTiming={400}
        animationOutTiming={200}>
            <View style={styles.modalContainer}>
                <View style={{ alignItems: "center" }}>
                    <Completed />

                </View>

                <Text style={styles.headingText}>Completed!</Text>
                <Text style={styles.text}>How did you find your workout?</Text>
                <TouchableOpacity onPress={() => props.onSelect("Good")}>
                    <Text style={styles.textStyle}>Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onSelect("Easy")}>
                    <Text style={styles.textStyle}>Too Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onSelect("Difficult")}>
                    <Text style={styles.textStyle}>Too Difficult</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: "5%",
        margin: '5%',
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: themeStyle.COLOR_WHITE
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    headingText: {
        color: "#1F2729",
        textAlign: "center",
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 20
    },
    text: {
        color: "#1F2729",
        textAlign: "center",
        fontFamily: themeStyle.FONT_MEDIUM
    },
    textStyle: {
        marginTop: "5%",
        paddingHorizontal: '20%',
        paddingVertical: "5%",
        borderRadius: 25,
        textAlign: "center",
        borderWidth: 1,
        borderColor: 'lightgray'
    }

})

export default UpgradeModal;