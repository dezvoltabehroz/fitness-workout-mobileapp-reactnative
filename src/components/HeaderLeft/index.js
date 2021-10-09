import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Icon } from '../index';
import Edit from '../../assets/svg/Edit-profile.svg'
import { route } from '../../lib/utils/constants';

export const NavigationHeaderLeftButton = (props) => {
    return (
        <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => props?.navigation?.goBack()}>
            <Icon.AntDesign name={props.cross ? "close" : "arrowleft"} size={25} color={props?.color ? "white" : "black"} />
        </TouchableOpacity>
    );
};

export const NavigationHeaderRightButton = (props) => {
    return (
        <TouchableOpacity
            style={{ marginRight: 15, height: 50, width: 60 ,justifyContent:"center",alignItems:"flex-end"}}
            onPress={() => {
                props?.edit ?
                    props?.navigation?.navigate(route.EDITPROFILE)
                    :
                    props?.navigation?.goBack()
            }}>
            {
                props?.edit ?
                    <Edit />
                    :
                    <Icon.AntDesign name={props.cross ? "close" : "arrowleft"} size={25} color={props?.color ? "white" : "black"} />

            }
        </TouchableOpacity>
    );
};