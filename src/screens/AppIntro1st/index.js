import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Button, Container } from '../../components';
import HeaderView from './components/headerView';
import { route, screen } from '../../lib/utils/constants';
import Target from '../../assets/svg/target.svg';
import Fit from '../../assets/svg/Fit.svg';
import Muscles from '../../assets/svg/muscles.svg';
import Weight from '../../assets/svg/lose-weight.svg';

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

    setValue = (value) => { this.setState({ value }) }

    render() {

        const { navigate } = this.props.navigation;
        const { value } = this.state;

        return (
            <Container>
                <HeaderView navigation={this.props.navigation} />
                <View style={styles.container}>
                    <View style={styles.targetContainer}>
                        <Target />
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_1}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setValue(0)} style={this.style_Func_1()}>
                        <View style={styles.marginHorizontal1}>
                            <Fit height={SVG_HEIGHT} width={SVG_WIDTH} />
                        </View>
                        <View style={styles.marginHorizontal}>
                            <Text style={styles.decsHeading}>{screen.APP_INTRO_Button_1}</Text>
                            <Text style={styles.decsTextStyle}>{screen.APP_INTRO_Button_DESCRIPTION_1}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setValue(1)} style={this.style_Func_2()}>
                        <View style={styles.marginHorizontal1}>
                            <Muscles height={SVG_HEIGHT} width={SVG_WIDTH} />
                        </View>
                        <View style={styles.marginHorizontal}>
                            <Text style={styles.decsHeading}>{screen.APP_INTRO_Button_2}</Text>
                            <Text style={styles.decsTextStyle}>{screen.APP_INTRO_Button_DESCRIPTION_2}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setValue(2)} style={this.style_Func_3()}>
                        <View style={styles.marginHorizontal1}>
                            <Weight height={SVG_HEIGHT} width={SVG_WIDTH} />
                        </View>
                        <View style={styles.marginHorizontal}>
                            <Text style={styles.decsHeading}>{screen.APP_INTRO_Button_3}</Text>
                            <Text style={styles.decsTextStyle}>{screen.APP_INTRO_Button_DESCRIPTION_3}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={screen.NEXT} onPress={() => navigate(route.APPINTRO2nd)} />
                </View>
            </Container>

        )
    }
}
export default AppIntro;