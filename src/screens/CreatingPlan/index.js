import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import {  ClearButton, ColorContainer } from '../../components';
import { route, screen } from '../../lib/utils/constants';
import Tick from '../../assets/svg/Tick.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';

class CreatingPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
        };
    }

    render() {

        const { navigate, replace } = this.props.navigation;
        const { value } = this.state;

        return (
            <ColorContainer>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        {value ? <Tick /> : null}
                        <Text style={styles.headingTextStyle}>{screen.CREATINGPLAN_HEADING}</Text>
                        <Text style={styles.decsTextStyle}>{screen.CREATINGPLAN_DESCRIPTION}</Text>
                    </View>

                    <View style={styles.progressContainer}>
                        <CircularProgress
                            value={100}
                            duration={5000}
                            radius={120}
                            textColor={themeStyle.BAR_COLOR}
                            textStyle={styles.textStyle}
                            activeStrokeWidth={20}
                            inActiveStrokeWidth={15}
                            activeStrokeColor={themeStyle.BAR_COLOR}
                            inActiveStrokeColor={'#0000ffff'}
                            inActiveStrokeOpacity={0}
                            valueSuffix={'%'}
                            onAnimationComplete={() => { this.setState({ value: true }) }}
                        />
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <ClearButton disabled={!value} title={value ? 'FINISHED' : 'PLEASE WAIT...'} onPress={() => replace(route.MAIN)} />
                </View>
            </ColorContainer>

        )
    }
}
export default CreatingPlan;