import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Resume from '../../../assets/svg/refresh.svg';
import Completed from '../../../assets/svg/next.svg';
import themeStyle from '../../../assets/styles/theme.style';


const UpgradeModal = (props) => {
    return (
        <Modal isVisible={props.visible} style={{ backgroundColor: 'rgba(0,0,0,0.7)', margin: 0 }}>
            <View style={styles.modalContainer}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => props.onReplay()}>
                        <Resume />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.onComplete()}>
                        <Completed />
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: "5%",
        paddingBottom: "70%",
    },

    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

})

export default UpgradeModal;