import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Resume from '../../../assets/svg/refresh.svg';
import Completed from '../../../assets/svg/next.svg';
import themeStyle1 from '../../../assets/styles/common.style';
import themeStyle from '../../../assets/styles/theme.style';
import Input from '../../Input';
import { Button, Icon, OtpInputs } from '../..';


const UpgradeModal = (props) => {
    return (
        <Modal isVisible={props.isVisible} >
            <View style={styles.modalContainer} >

                <View style={{ marginTop: "5%", }}>
                    <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={() => props.onClose()}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.grayText}>Enter code we sent you at {props.email}</Text>
                        <View style={styles.inputContainer}>
                            <OtpInputs
                                length={6}
                                editable={!props.btnLoading}
                                otpValue={props.code}
                                setOtpValue={(code) => props.setCode(code)}
                                error={props.error != '' ? props.error : ""}
                                onFocus={() => {
                                    props.setError('')
                                }}
                            />
                            {
                                props.submit && !props.code ? <Text style={[themeStyle1.errorText, { marginBottom: 10, marginTop: 10, textAlign: "center" }]}>Please fill all the fields</Text> :
                                props.submit && props.code.length < 6 ? <Text style={[themeStyle1.errorText, { marginBottom: 10, marginTop: 10, textAlign: "center" }]}>Please fill all the fields</Text> : null
                            }
                        </View>
                    </View>

                </View>
                <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                    <Button loading={props.btnLoading} disabled={props.code && !props.submit ? false : true} title={'Continue'} onPress={() => props.verifyCode()} />
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

export default UpgradeModal;