import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Resume from '../../../assets/svg/refresh.svg';
import Completed from '../../../assets/svg/next.svg';
import themeStyle1 from '../../../assets/styles/common.style';
import themeStyle from '../../../assets/styles/theme.style';
import { Button, Icon, Input } from '../..';
import { isEmailValid } from '../../../lib/utils/global';


const UpgradeModal = (props) => {
    return (
        <Modal isVisible={props.isVisible}
            animationInTiming={400}
            animationOutTiming={200}  >
            <View style={styles.modalContainer} >

                <View style={{ marginTop: "5%", }}>
                    <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={props.onClose}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                    </View>
                    <Text style={styles.headingText}>{props.reset ? "Enter your email to reset password" : "Enter Your Email"}</Text>
                    <View style={{ marginTop: "10%", }}>
                        <Input editable={!props.btnLoading} bottomMargin={true} value={props.email} placeholder="" onChangeText={(email) => props.setEmail(email)} />
                        {
                            props.submit && !props.email ? <Text style={[themeStyle1.errorText,]}>Please fill this field</Text> : null
                        }
                        {
                            props.submit && props.email.length && !isEmailValid(props.email) ? <Text style={[themeStyle1.errorText,]}>Email is invalid</Text> : null
                        }
                    </View>

                </View>

                <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                    <Button loading={props.btnLoading} disabled={props.email && !props.submit ? false : true} title={'Continue'} onPress={() => props.sendCodeOnEmail()} />
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