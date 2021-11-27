import React, { Component } from 'react';
import { View, StatusBar, Linking, Alert, } from 'react-native';

import { Container, ClearButton } from '../../components';
import { route, SCREEN_HEIGHT, } from '../../lib/utils/constants';

import styles from './style';
import { AuthServices } from '../../services';
import { LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import messaging from '@react-native-firebase/messaging';
import AppIcon from '../../assets/svg/AppIcon.svg'
import Brain from '../../assets/svg/GraphicElements.svg'
import Modal from '../../assets/svg/modal.svg'
import Text from '../../assets/svg/text.svg'
class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
        };
    }

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => { this.showModal() })
        this.showModal()
    }

    showModal = () => {
        setTimeout(() => {
            this.setState({ timer: true })
        }, 2000);
    }

    requestUserPermission = async function () {
        this.setState({ btnLoading: true })
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
        const { navigate, replace } = this.props.navigation;
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            AuthServices.generateUserId(fcmToken)
                .then((res) => {
                    if (res.data.success) {
                        this.setState({ btnLoading: false })
                        replace(route.APPINTRO)
                        console.log(fcmToken)
                        storeLocalData(LOCAL_STORAGE_KEYS.fcmToken, JSON.stringify(fcmToken))
                        storeLocalData(LOCAL_STORAGE_KEYS.user_id, JSON.stringify(res.data.data.user_id))
                        storeLocalData(LOCAL_STORAGE_KEYS.userToken, JSON.stringify(res.data.data.token))
                    }
                    else {

                        this.setState({ btnLoading: false })
                        Alert.alert("Error", `This device is already registered`, [{
                            text: "Cancel",
                            onPress: () => { },
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => { this.props.navigation.replace(route.GENERATEUSERWITHEMAILPASSWORD, { newUser: true }) } }]
                        )
                    }

                })
                .catch((err) => {
                    console.log(err)
                    this.setState({ btnLoading: false })
                })
        } else {
            this.setState({ btnLoading: false })
            console.log("Failed", "No token received");
        }
    }
    render() {

        const { navigate, replace } = this.props.navigation;
        const { timer } = this.state;

        return (
            <Container>
                <StatusBar translucent={true} backgroundColor={"transparent"} barStyle={"light-content"} />
                <View style={{ flex: 1, backgroundColor: '#15bceb' }}>
                    <View style={{ marginTop: "5%", justifyContent: "center", alignItems: "center" }}>
                        <AppIcon height={SCREEN_HEIGHT * 0.25} />
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Brain height={SCREEN_HEIGHT * 0.15} />
                    </View>
                    <View style={{marginTop: "2.5%", justifyContent: "center", alignItems: "center" }}>
                        <Text height={SCREEN_HEIGHT * 0.1} />
                        {/* <Image source={require("../../assets/images/login.png")} resizeMode="contain" style={{ height: SCREEN_HEIGHT * 0.3 }} /> */}
                    </View>
                    <View style={{ marginTop: "2.5%", justifyContent: "center", alignItems: "center" }}>
                        <Modal height={SCREEN_HEIGHT * 0.275} />
                        {/* <Image source={require("../../assets/images/login.png")} resizeMode="contain" style={{ height: SCREEN_HEIGHT * 0.3 }} /> */}
                    </View>

                    <View style={styles.buttonContainer}>
                        <ClearButton loading={this.state.btnLoading} title={'GET STARTED'} onPress={() => this.requestUserPermission()} />
                        <View style={styles.buttonContainer1}>
                            <ClearButton title={'LOG IN'} onPress={() => replace(route.LOGIN)} />
                        </View>
                    </View>
                    {/* <ImageBackground
                        style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
                        resizeMode={"contain"}
                        source={require('../../assets/images/Splash.gif')}>
                        {timer ?
                           
                            : null
                        }</ImageBackground> */}
                </View>


            </Container>

        )
    }
}
export default AppIntro;