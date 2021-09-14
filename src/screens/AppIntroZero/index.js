import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Linking, ImageBackground } from 'react-native';

import { Button, Container, ClearButton } from '../../components';
import { route, screen, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';

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


    render() {

        const { navigate,replace } = this.props.navigation;
        const { timer } = this.state;

        return (
            <Container>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={"light-content"} />
                <ImageBackground
                    style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
                    resizeMode={"cover"}
                    source={require('../../assets/images/Splash.gif')}>
                    {timer ?
                        <View style={styles.buttonContainer}>
                            <ClearButton title={'GET STARTED'} onPress={() => replace(route.APPINTRO)} />
                            <View style={styles.buttonContainer1}>
                                <ClearButton title={'LOG IN'} onPress={() => replace(route.LOGIN)} />
                            </View>
                        </View>
                        : null
                    }</ImageBackground>

            </Container>

        )
    }
}
export default AppIntro;