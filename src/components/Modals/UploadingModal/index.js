import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal'

import Resume from '../../../assets/svg/refresh.svg';
import Completed from '../../../assets/svg/next.svg';
import themeStyle from '../../../assets/styles/theme.style';
import Input from '../../Input';


const UploadingModal = (props) => {
    return (
        <Modal isVisible={props.visible} >
            <View style={styles.modalContainer} >

                <ActivityIndicator color={themeStyle.BAR_COLOR} />

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "center",
        alignItems: "center"
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

export default UploadingModal;