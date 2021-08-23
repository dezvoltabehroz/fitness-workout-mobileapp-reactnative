import React from 'react';
import { View } from 'react-native';
import THEME from '../../assets/styles/theme.style'
const Container = ({ children, color }) => {
    let colors = [
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#373542',
        '#414c40',
        '#414c40',
        '#414c40',
    ];
    return (
        <View style={{ flex: 1, backgroundColor: color ? '#f3f3f3' : THEME.PRIMARY_BACKGROUND_COLOR }}>
            {children}
        </View>
    )
};

export default Container;