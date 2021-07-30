import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Button, Container } from '../../components';
import { route, screen } from '../../lib/utils/constants';

import HeaderView from './components/headerView';
import Target from '../../assets/svg/symbol.svg';
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
                        <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_4}</Text>
                        <Text style={[styles.decsTextStyle, { textAlign: "center" }]}>{screen.APP_INTRO_DESCRIPTION_4}</Text>
                    </View>
                    <View style={styles.rowContainer1}>
                        <TouchableOpacity onPress={() => this.setValue(0)} >
                            <View style={this.style_Func_1()}>
                                <Muscles height={SVG_HEIGHT} width={SVG_WIDTH} />
                            </View>
                            <Text style={{textAlign:"center"}}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setValue(1)}>
                            <View style={this.style_Func_2()}>
                                <Band height={SVG_HEIGHT} width={SVG_WIDTH} />
                            </View>
                            <Text style={{textAlign:"center"}}>Female</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <Button title={screen.NEXT} onPress={() => navigate(route.APPINTRO5th)} />
                </View>
            </Container>

        )
    }
}
export default AppIntro;