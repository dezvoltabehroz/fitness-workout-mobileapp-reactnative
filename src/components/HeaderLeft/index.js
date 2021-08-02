import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Icon } from '../index';

export const NavigationHeaderLeftButton = (props) => {
    return (
        <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => props?.navigation?.goBack()}>
            <Icon.AntDesign name="arrowleft" size={25} color={"black"} />
        </TouchableOpacity>
    );
};