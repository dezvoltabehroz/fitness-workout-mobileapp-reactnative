import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal'

import Resume from '../../../assets/svg/refresh.svg';
import Completed from '../../../assets/svg/next.svg';
import themeStyle from '../../../assets/styles/theme.style';
import Input from '../../Input';
import { Button } from '../..';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../lib/utils/constants';


const HipSizeModal = (props) => {
    console.log(props)
    return (
        <Modal isVisible={props.visible}
            animationInTiming={400}
            animationOutTiming={1000} >
            <View style={styles.modalContainer} >

                {
                    props.frontImage ?
                        <>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>FRONT PICTIRE</Text>
                            <View style={{ marginVertical: "5%" }}>
                                <Image source={require('../../../assets/images/Front.jpg')} style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.6 }} />
                            </View>
                        </>
                        :
                        props.backImage ?
                            <>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>BACK PICTIRE</Text>
                                <View style={{ marginVertical: "5%" }}>
                                    <Image source={require('../../../assets/images/back.jpg')} style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.6 }} />
                                </View>
                            </>
                            :
                            props.rightImage ?
                                <>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>RIGHT SIDE PICTIRE</Text>
                                    <View style={{ marginVertical: "5%" }}>
                                        <Image source={require('../../../assets/images/right.jpg')} style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.6 }} />
                                    </View>
                                </>
                                :
                                props.leftImage ?
                                    <>
                                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>LEFT SIDE PICTIRE</Text>
                                        <View style={{ marginVertical: "5%" }}>
                                            <Image source={require('../../../assets/images/left.jpg')} style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.6 }} />
                                        </View>
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