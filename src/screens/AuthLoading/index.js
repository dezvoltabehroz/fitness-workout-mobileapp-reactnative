import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { LOGO, route } from '../../lib/utils/constants';
import { authActions } from '../../redux/actions/auth';

import THEME from '../../assets/styles/theme.style';
import styles from './style';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';


class AuthLoading extends Component {
    constructor(props) {
        super(props);
        // this._bootstrapAsync();
    }

    componentDidMount = async () => {
        let { navigation } = this?.props;
        const check = await getLocalData(LOCAL_STORAGE_KEYS.appIntro);
        // if (check == null) {
        //     setTimeout(async () => {
        //         await navigation.replace(route.APPINTRO)
        //     }, 5000);
        // } else {
            setTimeout(async () => {
                await navigation.replace(route.APPINTRO)
            }, 5000);
        // }
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={LOGO} style={styles.imageStyle} resizeMode="contain" />
                <ActivityIndicator color={THEME.COLOR_WHITE} size={"small"} />
                <Text style={styles.textStyle}>Loading...</Text>
            </View>
        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch)

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);