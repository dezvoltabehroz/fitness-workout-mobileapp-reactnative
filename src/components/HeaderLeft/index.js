import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Icon } from '../index';

export const NavigationHeaderLeftButton = (props) => {
    return (
        <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => props?.navigation?.goBack()}>
            <Icon.AntDesign name={props.cross?"close":"arrowleft"} size={25} color={props?.color ? "white" : "black"} />
        </TouchableOpacity>
    );
};

export const NavigationHeaderRightButton = (props) => {
    return (
        <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => props?.navigation?.goBack()}>
            <Icon.AntDesign name={props.cross?"close":"arrowleft"} size={25} color={props?.color ? "white" : "black"} />
        </TouchableOpacity>
    );
};