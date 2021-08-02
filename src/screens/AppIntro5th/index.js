import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';

import { Button, CheckBox, Container } from '../../components';
import { route, screen } from '../../lib/utils/constants';

import HeaderView from './components/headerView';
import Target from '../../assets/svg/706.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';

class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
            shoulder: false,
            chest: false,
            arm: false,
            back: false,
            glute: false,
            leg: false
        };
    }


    render() {
        const { navigate, goBack } = this.props.navigation;
        const { shoulder, chest, glute, back, arm, leg } = this.state;
        return (
            <Container>
                <StatusBar backgroundColor={themeStyle.DASH_DARK}/>
                <ImageBackground resizeMode={"cover"} source={require('../../assets/images/bg.png')} style={styles.bgStyle}>
                    <HeaderView goBack={() => goBack()} />

                    <View style={styles.container}>
                        <View style={styles.targetContainer}>
                            <Target />
                        </View>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_5}</Text>
                        </View>

                        <ImageBackground style={styles.imageStyle} resizeMode="cover" source={require('../../assets/images/girl.png')}>
                            <View style={styles.shoulderContainer}>
                                <View style={styles.shoulderStyle}>
                                    <CheckBox isChecked={shoulder} label="Shoulders" onPress={() => this.setState({ shoulder: !shoulder })} />
                                </View>
                            </View>
                            <View style={styles.chestContainer}>
                                <View style={styles.chestStyle}>
                                    <CheckBox isChecked={chest} label="Chests" onPress={() => this.setState({ chest: !chest })} />
                                </View>
                            </View>
                            <View style={styles.armContainer}>
                                <View style={styles.armStyle}>
                                    <CheckBox isChecked={arm} label="Arms" onPress={() => this.setState({ arm: !arm })} />
                                </View>
                            </View>
                            <View style={styles.gluteContainer}>
                                <View style={styles.gluteStyle}>
                                    <CheckBox isChecked={glute} label="Glutes" onPress={() => this.setState({ glute: !glute })} />
                                </View>
                            </View>
                            <View style={styles.backContainer}>
                                <View style={styles.backStyle}>
                                    <CheckBox
                                        isChecked={back}
                                        label="Back"
                                        onPress={() => this.setState({ back: !back })} />
                                </View>
                            </View>
                            <View style={styles.legContainer}>
                                <View style={styles.legStyle}>
                                    <CheckBox
                                        isChecked={leg}
                                        label="Legs"
                                        onPress={() => this.setState({ leg: !leg })} />
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={styles.buttonContainer}>
                            <Button title={'DONE'} onPress={() => navigate(route.CREATINGPLAN)} />
                        </View>
                    </View>
                </ImageBackground>
            </Container>

        )
    }
}
export default AppIntro;