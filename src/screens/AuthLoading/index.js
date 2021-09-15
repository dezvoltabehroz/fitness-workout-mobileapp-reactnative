import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import messaging from '@react-native-firebase/messaging';
import { LOGO, route } from '../../lib/utils/constants';
import { authActions } from '../../redux/actions/auth';

import THEME from '../../assets/styles/theme.style';
import styles from './style';
import { getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import { AuthServices, ProfileServices } from '../../services';


class AuthLoading extends Component {
    constructor(props) {
        super(props);
        // this._bootstrapAsync();
    }

    componentDidMount = async () => {
        let { navigation } = this?.props;
        const watched = await getLocalData(LOCAL_STORAGE_KEYS.appIntro);
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id);
        let check = JSON.parse(watched)
        if (JSON.parse(user_id)) {
            setTimeout(async () => {
                // storeLocalData(LOCAL_STORAGE_KEYS.user_id,JSON.stringify(5))
                await this.props.authActions.userLogin(this.props.navigation.replace)
            }, 5000);
        } else {
            setTimeout(async () => {
                await navigation.replace(route.APPINTROZERO)
            }, 5000);
        }
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