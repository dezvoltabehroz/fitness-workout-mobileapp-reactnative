import React, { useEffect, useState } from 'react';
import { View, TextInput, Clipboard, Keyboard } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import themeStyle from '../../assets/styles/theme.style';
const OtpInput = ({ length, onFocus, ...props }) => {
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (props.otpValue.length == 0 || props.error) {
            setOtp('')
        }
    }, [props.error])

    return <SmoothPinCodeInput
        value={props.otpValue}
        onTextChange={code => {
            props.setOtpValue(code);
            setOtp(code)
        }}
        editable={props.editable}
        cellSpacing={5}
        cellStyleFocused={{
            borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
            width: 40,
            height: 49,
            borderWidth: 1,
            borderRadius: 10
        }}
        cellStyle={{
            width: 40,
            height: 49,
            borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
            borderWidth: 1,
            borderRadius: 10
        }}
        codeLength={6}
        textStyle={{
            color: '#000',
            fontSize: 24
        }}
        animated={false}
        restrictToNumbers={true}
        onFocus={() => onFocus && props.error && onFocus()}
        onFulfill={(code) => {
            props.setOtpValue(code);
            Keyboard.dismiss()
        }}
    />
};

export default OtpInput;