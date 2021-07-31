import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { Button, Container, HorizontalList } from '../../components';
import { route, screen, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
import Target from '../../assets/svg/target.svg';

import THEME from '../../assets/styles/theme.style';

import styles from './style';
const SVG_HEIGHT = 15;
const SVG_WIDTH = 15;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
            data: [
                {
                    title: "Morning Workouts",
                    rating: 1
                },
                {
                    title: "Workouts Before Sleep",
                    rating: 1
                }
            ]
        };
    }

    render() {

        const { navigate } = this.props.navigation;
        const { value, data } = this.state;
        const progressCustomStyles = {
            borderRadius: 10,
            borderWidth: 0.5,
            justifyContent: "center",
            borderColor: 'gray',
        };
        return (
            <Container>
                <StatusBar backgroundColor={THEME.BAR_COLOR} barStyle={"light-content"} />
                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.whiteTextStyle}>YOUR PERSONALIZED PLAN</Text>
                            <View>
                                <Target />
                            </View>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>

                        <View style={styles.headingContainer1}>
                            <View style={styles.planContainer}>
                                <View style={styles.alignItems}>
                                    <View style={styles.row}>
                                        <Target height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        <Text style={styles.barTextStyle}>30</Text>
                                    </View>
                                    <Text style={styles.decsTextStyle}>WORKOUT DAYS</Text>
                                </View>
                                <View style={styles.verticalLine} ></View>
                                <View style={styles.alignItems}>
                                    <View style={styles.row}>
                                        <Target height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        <Text style={styles.barTextStyle}>30</Text>
                                    </View>
                                    <Text style={styles.decsTextStyle}>DIET DAYS</Text>
                                </View>
                                <View style={styles.verticalLine} ></View>
                                <View style={styles.alignItems}>
                                    <View style={styles.row}>
                                        <Target height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        <Text style={styles.barTextStyle}>23.44</Text>
                                    </View>
                                    <Text style={styles.decsTextStyle}>BMI</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.workoutDayContainer}>
                            <Text style={styles.whiteTextStyle}>30 DAY'S WORKOUT</Text>
                            <View style={styles.rowStyle}>
                                <View style={styles.row}>
                                    <Target height={SVG_HEIGHT} width={SVG_WIDTH} />
                                    <Target height={SVG_HEIGHT} width={SVG_WIDTH} />
                                    <Target height={SVG_HEIGHT} width={SVG_WIDTH} />
                                    <Target height={SVG_HEIGHT} width={SVG_WIDTH} />
                                    <Text style={[styles.whiteTextStyle1, { marginHorizontal: 5 }]}>Unit</Text>
                                </View>
                                <Text style={styles.whiteTextStyle1}>10%</Text>
                            </View>
                            <ProgressBarAnimated
                                width={SCREEN_WIDTH * 0.6}
                                value={20}
                                {...progressCustomStyles}
                                onComplete={() => { Alert.alert('Hey!', 'onComplete event fired!'); }}
                            />
                            <View style={styles.goButtonContainer}>
                                <Button title={'GO'} />
                            </View>
                        </View>
                        <View style={{bottom:"5%"}}>
                            <Text style={[styles.whiteTextStyle, { color: THEME.COLOR_BLACK, margin: '5%' }]}>CHALLENGES</Text>
                            <HorizontalList data={data} />
                        </View>
                        <View style={styles.cardContainer} >
                            <Text style={styles.whiteTextStyle1}>DIET PLAN IS READY!</Text>
                            <View style={styles.goButtonContainer}>
                                <Button title={'GO'} />
                            </View>
                        </View>
                        <View style={styles.cardContainer1} >
                            <View>
                                <Text style={styles.whiteTextStyle1}>POWER OF THE MIND</Text>
                                <Text style={{ color: THEME.COLOR_WHITE }}>Lorem ipsum dolor sir</Text>
                            </View>
                            <View style={styles.starContainer}>
                                <Target />
                            </View>

                        </View>
                    </ScrollView>



                </View>


            </Container>

        )
    }
}
export default Home;