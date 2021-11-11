import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, ImageBackground } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { Button, Container, HorizontalList, UpgradeModal } from '../../components';
import { route, screen, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
import GFire from '../../assets/svg/gray-fire.svg';
import WFire from '../../assets/svg/white-fire.svg';
import Fire from '../../assets/svg/fire.svg';
import BMI from '../../assets/svg/bmi.svg';
import Apple from '../../assets/svg/apple.svg';
import Target from '../../assets/svg/pro-btn.svg';
import Blue from '../../assets/svg/blue-bg-star.svg';

import THEME from '../../assets/styles/theme.style';

import styles from './style';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';
import { PlanServices, ProfileServices } from '../../services';
import moment from 'moment';
import { planActions } from '../../redux/actions/plan';

const SVG_HEIGHT = 15;
const SVG_WIDTH = 15;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
            fitnessLevel: "Very Fit",
            challenges: [],
            dietLoading: false,
            workoutLoading: false,
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
    componentDidMount = async () => {
        const { user_id, token } = this.props.user.userData;
        let data = { category: "daily challenges" }
        PlanServices.getFreeVideos(data, token)
            .then(async (res) => {
                let fitnessLevel = await getLocalData(LOCAL_STORAGE_KEYS.fitnessLevel);
                this.setState({ fitnessLevel: JSON.parse(fitnessLevel), challenges: res.data.data })
            })
            .catch((err) => { console.log(err.response) })
    }

    fitnessLevelFunction = () => {
        switch (this.state.fitnessLevel) {
            case 'Very Fit':
                return (
                    <View style={styles.row}>
                        < WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <Text style={[styles.whiteTextStyle2, { marginHorizontal: 5 }]}>{this.state.fitnessLevel}</Text>
                    </View>
                )
            case 'Good Fit':
                return (
                    <View style={styles.row}>
                        < WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <Text style={[styles.whiteTextStyle2, { marginHorizontal: 5 }]}>{this.state.fitnessLevel}</Text>
                    </View>
                )
            case 'Average Fit':
                return (
                    <View style={styles.row}>
                        < WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <Text style={[styles.whiteTextStyle2, { marginHorizontal: 5 }]}>{this.state.fitnessLevel}</Text>
                    </View>
                )
            case 'Not Fit':
                return (
                    <View style={styles.row}>
                        < WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <Text style={[styles.whiteTextStyle2, { marginHorizontal: 5 }]}>{this.state.fitnessLevel}</Text>
                    </View>
                )
            default:
                return (
                    <View style={styles.row}>
                        < WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <Text style={[styles.whiteTextStyle2, { marginHorizontal: 5 }]}>{this.state.fitnessLevel}</Text>
                    </View>
                )
        }
    }

    handleStartWorkout = () => {
        this.setState({ workoutLoading: true })
        const { navigate } = this.props.navigation;
        const { user_id, token } = this.props.user.userData;
        console.log(token)
        let data = {
            current_date: moment().format('YYYY-MM-DD'),
            user_id: user_id
        }
        ProfileServices.updateStartDateUserWorkout(data, token)
            .then(async (res) => {
                let userData = {
                    token: token,
                    user_id: user_id
                }
                await this.props.authActions.getUserProfile(userData)
                await this.props.planActions.getWorkoutPlan();
                setTimeout(() => {
                    this.setState({ workoutLoading: false })
                    navigate(route.DAYS_WORLOUT)
                }, 2000)
            })
            .catch((err) => console.log(err.response))
    }

    handleStartDietPlan = () => {
        this.setState({ dietLoading: true })
        const { navigate } = this.props.navigation;
        const { user_id, token } = this.props.user.userData;
        let data = {
            current_date: moment().format('YYYY-MM-DD'),
            user_id: user_id
        }
        ProfileServices.updateStartDateUserDiet(data, token)
            .then(async (res) => {
                let userData = {
                    token: token,
                    user_id: user_id
                }
                await this.props.authActions.getUserProfile(userData);
                await this.props.planActions.getDietPlan();
                setTimeout(() => {
                    this.setState({ dietLoading: false })
                    navigate(route.DIET)
                }, 2000);
            })
            .catch((err) => console.log(err.response))
    }

    render() {

        const { navigate } = this.props.navigation;
        const { value, data, challenges } = this.state;
        const progressCustomStyles = {
            borderRadius: 10,
            borderWidth: 0,
            justifyContent: "center",
            backgroundColor: THEME.BAR_COLOR
        };
        return (
            <Container>
                <StatusBar backgroundColor={THEME.BAR_COLOR} barStyle={"light-content"} />
                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        <View style={{ ...styles.rowContainer, marginBottom: '2.5%' }}>
                            <Text style={styles.whiteTextStyle}>YOUR PERSONALIZED PLAN</Text>
                            {this.props?.user?.userData?.is_pro == 0 ?
                                <TouchableOpacity onPress={() => this.setState({ modal: true })}>
                                    <Target />
                                </TouchableOpacity> : null}
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ marginBottom: 0 }}>
                        <View style={styles.headingContainer1}>
                            <View style={styles.planContainer}>
                                <View style={styles.alignItems}>
                                    <View style={styles.row}>
                                        <Fire height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        <Text style={styles.barTextStyle}>{this.props?.user?.userData?.daily_workout_count != undefined && this.props?.user?.userData?.daily_workout_count ? this.props?.user?.userData?.daily_workout_count : 0}</Text>
                                    </View>
                                    <Text style={styles.decsTextStyle}>WORKOUT DAYS</Text>
                                </View>
                                <View style={styles.verticalLine} ></View>
                                <View style={styles.alignItems}>
                                    <View style={styles.row}>
                                        <Apple height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        <Text style={styles.barTextStyle}>{this.props?.user?.userData?.daily_diet_count != undefined && this.props?.user?.userData?.daily_diet_count ? this.props?.user?.userData?.daily_diet_count : 0}</Text>
                                    </View>
                                    <Text style={styles.decsTextStyle}>DIET DAYS</Text>
                                </View>
                                <View style={styles.verticalLine} ></View>
                                <View style={styles.alignItems}>
                                    <View style={styles.row}>
                                        <BMI height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        <Text style={styles.barTextStyle}>{this.props?.user?.userData?.bmi != undefined && this.props?.user?.userData?.bmi ? parseFloat(this.props?.user?.userData?.bmi).toFixed(2) : 0}</Text>
                                    </View>
                                    <Text style={styles.decsTextStyle}>BMI</Text>
                                </View>
                            </View>
                        </View>
                        <ImageBackground source={require('../../assets/images/rob.jpg')} style={styles.workoutDayContainer}>
                            <Text style={styles.whiteTextStyle}>30 DAY'S WORKOUT</Text>
                            <View style={styles.rowStyle}>
                                {this.fitnessLevelFunction()}
                                <Text style={styles.whiteTextStyle1}>{this.props?.user?.userData?.daily_workout_count != undefined && this.props?.user?.userData?.daily_workout_count ? Math.floor(this.props?.user?.userData?.daily_workout_count / 30 * 100) : 0}%</Text>
                            </View>
                            <ProgressBarAnimated
                                width={SCREEN_WIDTH * 0.6}
                                height={10}
                                value={this.props?.user?.userData?.daily_workout_count != undefined ? this.props?.user?.userData?.daily_workout_count / 30 * 100 : 1}
                                {...progressCustomStyles}
                                onComplete={() => { }}
                            />
                            <View style={styles.goButtonContainer}>
                                <Button loading={this.state.workoutLoading} title={'GO!'} onPress={() => this.handleStartWorkout()} />
                            </View>
                        </ImageBackground>
                        <View style={{ bottom: '3%' }}>
                            <Text style={[styles.whiteTextStyle, { color: THEME.COLOR_BLACK, margin: '5%' }]}>CHALLENGES</Text>
                            <HorizontalList video data={challenges} onPress={(item) => navigate(route.VIDEO, { uri: item.media_path })} />
                        </View>
                        <ImageBackground source={require('../../assets/images/diet.png')} style={styles.cardContainer} >
                            <Text style={styles.whiteTextStyle1}>DIET PLAN IS READY!</Text>
                            <View style={styles.goButtonContainer}>
                                <Button loading={this.state.dietLoading} title={'GO!'} onPress={() => this.handleStartDietPlan()} />
                            </View>
                        </ImageBackground>
                        <TouchableOpacity style={{}} onPress={() => navigate(route.POWER_OF_MIND)} >
                            <ImageBackground source={require('../../assets/images/Power-of-Mind.png')} imageStyle={{ borderRadius: 25, }} style={styles.cardContainer1}>
                                <View>
                                    <Text style={styles.whiteTextStyle1}>POWER OF THE MIND</Text>
                                    {/* <Text style={{ color: THEME.COLOR_WHITE }}>Lorem ipsum dolor sir</Text> */}
                                </View>
                                <View style={styles.starContainer}>
                                    <Blue />
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <UpgradeModal visible={this.state.modal} onUpgrade={() => this.setState({ modal: false }, () => this.props.navigation.navigate(route.PAYMENTMETHOD, {}))} onSkip={() => this.setState({ modal: false })} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};
const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        planActions: bindActionCreators(planActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);