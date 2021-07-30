import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Button, Container } from '../../components';
import { route, screen } from '../../lib/utils/constants';

import HeaderView from './components/headerView';
import Target from '../../assets/svg/706.svg';
import Fit from '../../assets/svg/1029.svg';
import Muscles from '../../assets/svg/dumbell-weight.svg';
import Weight from '../../assets/svg/gym-equipment.svg';
import Band from '../../assets/svg/band.svg';

import styles from './style';

const SVG_HEIGHT = 36;
const SVG_WIDTH = 36;

class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
        };
    }

    style_Func_1 = () => {
        let style = {};
        switch (this.state.value) {
            case 0:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    style_Func_2 = () => {
        let style = {};
        switch (this.state.value) {
            case 1:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    style_Func_3 = () => {
        let style = {};
        switch (this.state.value) {
            case 2:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    style_Func_4 = () => {
        let style = {};
        switch (this.state.value) {
            case 3:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    setValue = (value) => { this.setState({ value }) }

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <Container>
                <HeaderView goBack={() => goBack()} />

                <View style={styles.container}>
                    <View style={styles.targetContainer}>
                        <Target />
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_5}</Text>
                    </View>
                   
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={'DONE'} onPress={() => navigate(route.APPINTRO2nd)} />
                </View>
            </Container>

        )
    }
}
export default AppIntro;