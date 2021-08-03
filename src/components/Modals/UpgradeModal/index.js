import React from 'react';
import { Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'
import themeStyle from '../../../assets/styles/theme.style';

const UpgradeModal = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={styles.modalContainer}>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: "10%",
        borderRadius: 25,
        backgroundColor: themeStyle.COLOR_WHITE
    }
})

export default UpgradeModal;