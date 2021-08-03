import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Button, Container, CustomSlider } from '../../components';
import { route, screen, SCREEN_WIDTH } from '../../lib/utils/constants';

import HeaderView from './components/headerView';
import Volume from '../../assets/svg/volume.svg';
import Bar from '../../assets/svg/Progress-bar.svg';

import styles from './style';

class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 5,
            currentPage: 0
        };
    }

    multiSliderValueCallback = (values) => {
        console.log(values)

    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { currentPage } = this.state;
        return (
            <Container>
                <HeaderView goBack={() => goBack()} />

                <View style={styles.container}>
                    <View style={styles.networkContainer}>
                        <Volume />
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_2}</Text>
                        <Text style={styles.decsTextStyle}>{screen.APP_INTRO_DESCRIPTION_2}</Text>
                    </View>
                    <View style={styles.secondHeadingContainer} >
                        <Text style={styles.secondHeadingStyle}>
                            OH, trust me, I'm really fit
                        </Text>
                    </View>
                    <View >
                        <View style={{ position: "absolute", top: 18 }}>
                            <Bar />
                        </View>

                        <CustomSlider
                            min={0}
                            max={3}
                            resetValue={(reset) => this.resetSlider = reset}
                            LRpadding={40}
                            callback={this.multiSliderValueCallback}
                            single={true}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={screen.NEXT} onPress={() => navigate(route.APPINTRO3rd)} />
                </View>
            </Container>

        )
    }
}
export default AppIntro;