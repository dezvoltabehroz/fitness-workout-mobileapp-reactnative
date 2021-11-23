import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Resume from '../../../assets/svg/refresh.svg';
import Completed from '../../../assets/svg/next.svg';
import themeStyle from '../../../assets/styles/theme.style';
import Input from '../../Input';
import { Button } from '../..';


const HipSizeModal = (props) => {
    const changeInches = (e) => {
        if (e <= 70) {
            props.onChangeText(e)
        } else {
            alert("Please enter appropieate inch")
        }

    }
    return (
        <Modal isVisible={props.visible}
            animationInTiming={400}
            animationOutTiming={200} >
            <View style={styles.modalContainer} >

                {
                    props.frontImage ?
                        <>
                            <Text>FRONT PICTIRE</Text>
                        </>
                        :
                        props.backImage ?
                            <>
                                <Text>BACK PICTIRE</Text>
                            </>
                            :
                            props.rightImage ?
                                <>
                                    <Text>RIGHT SIDE PICTIRE</Text>
                                </>
                                :
                                props.leftImage ?
                                    <>
                                        <Text>LEFT SIDE PICTIRE</Text>
                                    </>
                                    : null
                }

                <View>
                    <Text>Take picture as shown above</Text>
                    <View style={{ marginTop: "5%" }}>
                        <Button title="Take Picture" onPress={() => {
                            props.frontImage ?
                                props.openCamera('frontImage')
                                :
                                props.backImage ?
                                    props.openCamera('backImage')
                                    :
                                    props.rightImage ?
                                        props.openCamera('rightImage')
                                        :
                                        props.leftImage ?
                                            props.openCamera('leftImage')
                                            : null
                        }} />
                    </View>
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
        alignItems: "center",

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

export default HipSizeModal;