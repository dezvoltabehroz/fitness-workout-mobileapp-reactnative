import React from 'react';
import { Input as ElementInput } from 'react-native-elements';
import themeStyle from '../../assets/styles/theme.style';
import inputStyles from './style';

const Input = (props) => {
    return (
        <ElementInput
            {...props}
            ref={props.inputRef}
            labelStyle={{
                color: 'black',
                fontWeight: 'normal'
            }}
            containerStyle={(props.bottomMargin ? { ...inputStyles.containerStyle, height: 55 } : props.width ? { ...inputStyles.containerStyle, width: props.width } : inputStyles.containerStyle)}
            placeholderTextColor={'#9AA1B1'}
            inputContainerStyle={inputStyles.inputContainerStyle}
            inputStyle={inputStyles.inputStyle}
        />
    );
}
export default Input;