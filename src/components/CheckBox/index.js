import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from "..";
import themeStyle from '../../assets/styles/theme.style';


const CheckedBox = ({ label, isChecked, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={.5} onPress={onPress} style={{ flexDirection: 'row', marginVertical: 5, flex: 1, borderWidth: 1, padding: 5, borderRadius: 20, borderColor: themeStyle.DASH_DARK }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {isChecked ? <Icon.Ionicons name='ios-radio-button-on-outline' color={themeStyle.DASH_DARK} size={20} /> : <Icon.Ionicons name='ios-radio-button-off-outline' color={themeStyle.DASH_DARK} size={20} />}
            </View>
            <View style={{ marginHorizontal: 5 }}>
                <Text style={{ color: themeStyle.DASH_DARK }} >{label}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default CheckedBox;
