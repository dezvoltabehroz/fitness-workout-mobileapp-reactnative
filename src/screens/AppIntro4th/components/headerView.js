import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Icon } from '../../../components';

import THEME from '../../../assets/styles/theme.style';
import styles from '../style';

class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View onPress={this.props.goBack} style={styles.rowContainer}>
                <TouchableOpacity onPress={this.props.goBack} style={styles.backButton} >
                    <Icon.AntDesign name="arrowleft" size={35} color={'#1F2729'} />
                </TouchableOpacity>
                <View style={styles.dashContainer}>
                    <Icon.AntDesign name="minus" size={55} color={THEME.DASH_DARK} />
                    <Icon.AntDesign name="minus" size={55} color={THEME.DASH_DARK} />
                    <Icon.AntDesign name="minus" size={55} color={THEME.DASH_DARK} />
                    <Icon.AntDesign name="minus" size={55} color={THEME.DASH_DARK} />
                    <Icon.AntDesign name="minus" size={55} color={THEME.DASH_LIGHT} />
                </View>
                <View style={styles.backButton}></View>
            </View>


        )
    }
}
export default AppIntro;