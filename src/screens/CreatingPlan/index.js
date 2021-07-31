import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import { Button, Container } from '../../components';
import { route, screen } from '../../lib/utils/constants';
import Target from '../../assets/svg/target.svg';

import THEME from '../../assets/styles/theme.style';

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

    render() {

        const { navigate } = this.props.navigation;
        const { value } = this.state;

        return (
            <Container>

                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingTextStyle}>{screen.CREATINGPLAN_HEADING}</Text>
                        <Text style={styles.decsTextStyle}>{screen.CREATINGPLAN_DESCRIPTION}</Text>
                    </View>

                    <View style={styles.progressContainer}>
                        <CircularProgress
                            value={100}
                            duration={4000}
                            radius={120}
                            textColor={'#1F2729'}
                            textStyle={styles.textStyle}
                            activeStrokeWidth={20}
                            inActiveStrokeWidth={15}
                            activeStrokeColor={'#1F2729'}
                            inActiveStrokeColor={'#0000ffff'}
                            inActiveStrokeOpacity={0}
                            valueSuffix={'%'}
                            onAnimationComplete={() => { this.setState({ value: true }) }}
                        />
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <Button title={value ? 'FINISHED' : 'PLEASE WAIT...'} onPress={() => navigate(route.HOME)} />
                </View>
            </Container>

        )
    }
}
export default AppIntro;