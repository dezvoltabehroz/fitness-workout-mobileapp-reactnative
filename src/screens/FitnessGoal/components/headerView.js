import React, { Component } from 'react';
import { View } from 'react-native';

import { Icon } from '../../../components';

import THEME from '../../../assets/styles/theme.style';
import styles from '../style';

class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.dashContainer}>
                <Icon.AntDesign name="minus" size={60} color={THEME.DASH_DARK} />
                <Icon.AntDesign name="minus" size={60} color={THEME.DASH_LIGHT} />
                <Icon.AntDesign name="minus" size={60} color={THEME.DASH_LIGHT} />
                <Icon.AntDesign name="minus" size={60} color={THEME.DASH_LIGHT} />
                <Icon.AntDesign name="minus" size={60} color={THEME.DASH_LIGHT} />
                <Icon.AntDesign name="minus" size={60} color={THEME.DASH_LIGHT} />
            </View>
        )
    }
}
export default AppIntro;