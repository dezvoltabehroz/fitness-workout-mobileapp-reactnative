import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Resume from '../../../assets/svg/refresh.svg';
import Completed from '../../../assets/svg/next.svg';
import themeStyle from '../../../assets/styles/theme.style';
import Input from '../../Input';
import { SCREEN_WIDTH } from '../../../lib/utils/constants';
import { Icon } from '../..';


const WeightModal = (props) => {
    return (
        <Modal isVisible={props.visible} animationInTiming={400}
            animationOutTiming={200} >
            <View style={styles.modalContainer} >


                <View style={{ marginBottom: "10%" }}>
                    <Text style={styles.headingText}>Weight</Text>
                </View>
                <View style={{ marginBottom: "10%" }}>
                    <View style={{ width: SCREEN_WIDTH * 0.8, flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: "10%" }}>
                        <Input
                            keyboardType={"number-pad"}
                            maxLength={3}
                            value={`${props.kg?props.kg:""}`}
                            width={SCREEN_WIDTH * 0.25}
                            placeholder='Pounds' onChangeText={(e) => {
                                props.onChangeKilo(e)
                            }} />
                        <View style={{ width: 10 }}></View>
                        <Text style={{ color: themeStyle.BAR_COLOR, marginBottom: 15 }}>Lbs</Text>
                        <View style={{ width: 10 }}></View>
                        <Icon.Octicons name="primitive-dot" size={20} color={themeStyle.BAR_COLOR} />
                        <View style={{ width: 10 }}></View>
                        <Input
                            keyboardType={"number-pad"}
                            width={SCREEN_WIDTH * 0.25}
                            maxLength={3}
                            value={`${props.gram?props.gram:""}`}
                            placeholder='Ounces'
                            onChangeText={(e) => props.onChangeGram(e)}
                        />
                        <Text style={{ color: themeStyle.BAR_COLOR, marginBottom: 15 }}>Oz</Text>
                        <View style={{ width: 10 }}></View>
                    </View>
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

export default WeightModal;