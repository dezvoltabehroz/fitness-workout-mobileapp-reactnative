import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Linking, ImageBackground, Alert, Platform } from 'react-native';

import { Button, Container, ClearButton } from '../../components';
import { route, screen, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import { AuthServices } from '../../services';
import { getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import messaging from '@react-native-firebase/messaging';
class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
        };
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.replace(route.APPINTROZERO)
        }, Platform.OS == 'ios' ? 4000 : 3000);
    }
 
    render() {

        const { navigate, replace } = this.props.navigation;
        const { timer } = this.state;

        return (
            <Container>
                <StatusBar translucent={true} backgroundColor={"transparent"} barStyle={"light-content"} />
                <View style={{ flex: 1, backgroundColor: '#15bceb' }}>
                    <ImageBackground
                        style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
                        resizeMode={"contain"}
                        source={require('../../assets/images/gif.gif')}>
                    </ImageBackground>
                </View>


            </Container>

        )
    }
}
export default AppIntro;