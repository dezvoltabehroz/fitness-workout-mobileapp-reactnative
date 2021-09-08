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
import { ProfileServices } from '../../services';


class AuthLoading extends Component {
    constructor(props) {
        super(props);
        // this._bootstrapAsync();
    }

    componentDidMount = async () => {
        let { navigation } = this?.props;
        const watched = await getLocalData(LOCAL_STORAGE_KEYS.appIntro);
        let check = JSON.parse(watched)
        console.log(check)
        if (check) {
            setTimeout(async () => {
                await this.requestUserPermission()
            }, 5000);
        } else {
            setTimeout(async () => {
                await navigation.replace(route.APPINTRO)
            }, 5000);
        }
    };


    requestUserPermission = async function () {
        const authorizationStatus = await messaging().requestPermission({
            alert: true,
            announcement: false,
            badge: true,
            carPlay: true,
            provisional: true,
            sound: true,
        });
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            console.log('User has notification permissions enabled.');
        } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
            console.log('User has provisional notification permissions.');
        } else {
            Alert.alert("Attension", "You need to allow push notification from settings",
                [
                    { text: "OK", onPress: () => Linking.openSettings() }
                ])
            console.log('User has notification permissions disabled');
        }

        const authStatus = await messaging().hasPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            this.getFcmToken();
        } else {
            console.log('Authorization status:', authStatus);
        }

    }

    getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            const localFcm = await getLocalData(LOCAL_STORAGE_KEYS.fcmToken)
            if (fcmToken == JSON.parse(localFcm)) {
                this.props.navigation.replace(route.MAIN);
            } else {
                const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
                const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
                let data = {
                    "user_id": JSON.parse(user_id),
                    "fcm_token": fcmToken
                }
                ProfileServices.updateFcmToken(data, JSON.parse(userToken))
                    .then((response) => {
                        if (response.data.success) {
                            storeLocalData(LOCAL_STORAGE_KEYS.fcmToken, JSON.stringify(fcmToken))
                            this.props.navigation.replace(route.MAIN);
                        }
                    })
                    .catch((err) => {
                        console.log(err.response)
                    })
            }

        } else {
            console.log("Failed", "No token received");
        }
    }


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