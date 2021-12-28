import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, ImageBackground, Linking } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { Button, Container, FocusAreaModal, HorizontalList, UpgradeModal, Icon } from '../../components';
import { route, screen, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
import GFire from '../../assets/svg/Gfire.svg';
import WFire from '../../assets/svg/Bfire.svg';
import Fire from '../../assets/svg/fire.svg';
import BMI from '../../assets/svg/bmi.svg';
import Apple from '../../assets/svg/apple.svg';
import Target from '../../assets/svg/pro-btn.svg';
import Target1 from '../../assets/svg/help-1.svg';
import Blue from '../../assets/svg/blue-bg-star.svg';

import THEME from '../../assets/styles/theme.style';

import styles from './style';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';
import { PlanServices, ProfileServices } from '../../services';
import moment from 'moment';
import { planActions } from '../../redux/actions/plan';
// import { Icon } from 'react-native-elements/dist/icons/Icon';

const SVG_HEIGHT = 15;
const SVG_WIDTH = 15;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
            focusModal: false,
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
                this.setState({ challenges: res.data.data })
            })
            .catch((err) => { console.log(err.response) })
    }

    fitnessLevelFunction = () => {
        switch (this.props.user.userData.fitness_level) {
            case 'Very Fit':
                return (
                    <View style={styles.row}>
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <Text style={[styles.whiteTextStyle2, { marginHorizontal: 5 }]}>{this.state.fitnessLevel}</Text>
                    </View>
                )
            case 'Fit':
                return (
                    <View style={styles.row}>
                        < WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <Text style={[styles.whiteTextStyle2, { marginHorizontal: 5 }]}>{this.state.fitnessLevel}</Text>
                    </View>
                )
            case 'Somewhat Fit':
                return (
                    <View style={styles.row}>
                        < WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <WFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <GFire height={SVG_HEIGHT} width={SVG_WIDTH} />
                        <Text style={[styles.whiteTextStyle2, { marginHorizontal: 5 }]}>{this.state.fitnessLevel}</Text>
                    </View>
                )
            case 'Unfit':
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

    handleStartWorkout = async () => {

        this.setState({ workoutLoading: true })
        const { navigate } = this.props.navigation;
        const { user_id, token, workout_user_id } = this.props.user.userData;
        if (workout_user_id != null) {
            if (this.props.plan.workoutPlan.length != 0) {
                this.setState({ workoutLoading: false })
                navigate(route.DAYS_WORLOUT)
            } else {
                this.props.planActions.getWorkoutPlan();
                setTimeout(() => {
                    this.setState({ workoutLoading: false })
                    navigate(route.DAYS_WORLOUT)
                }, 2000)
            }
        }
        else {
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

    }

    handleStartDietPlan = () => {
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
                navigate(route.DIET)
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
            backgroundColor: THEME.COLOR_BLACK
        };
        return (
            <Container>
                <StatusBar backgroundColor={THEME.BAR_COLOR} barStyle={"light-content"} />
                <View style={styles.container}>
                    <View style={{ width: SCREEN_WIDTH, ...styles.headingContainer }}>
                        {
                            this.props?.user?.userData?.is_pro == 0 ?
                                <View style={{ ...styles.rowContainer, marginBottom: '2.5%', }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                        <Text style={styles.whiteTextStyle}>YOUR PERSONALIZED PLAN</Text>
                                        <View style={{ width: 10 }} />
                                        <TouchableOpacity style={{ paddingTop: 3 }} onPress={() =>{Linking.openURL("https://sites.google.com/educogym.com/tony-quinn-health-centres/home")}}>
                                            <Icon.MaterialCommunityIcons name="clipboard-text-outline" size={35} color={"white"} />
                                        </TouchableOpacity>
                                        <View style={{ width: 10 }} />
                                        <TouchableOpacity onPress={() => this.setState({ focusModal: true })}>
                                            <Target1 />
                                        </TouchableOpacity>
                                    </View>
                                    {this.props?.user?.userData?.is_pro == 0 ?
                                        <TouchableOpacity onPress={() => this.setState({ modal: true })}>
                                            <Target />
                                        </TouchableOpacity> : null}

                                </View>
                                :
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={styles.whiteTextStyle}>YOUR PERSONALIZED PLAN</Text>
                                    <View style={{ width: 50 }} />
                                    <TouchableOpacity style={{ paddingTop: 3 }} onPress={() =>{Linking.openURL("https://sites.google.com/educogym.com/tony-quinn-health-centres/home")}}>
                                        <Icon.MaterialCommunityIcons name="clipboard-text-outline" size={35} color={"white"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ focusModal: true })}>
                                        <Target1 width={40} />
                                    </TouchableOpacity>
                                    {/* <View style={{ width: 10 }} /> */}

                                </View>
                        }
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
                                {/* <View style={styles.verticalLine} ></View>
                                <View style={styles.alignItems}>
                                    <View style={styles.row}>
                                        <BMI height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        <Text style={styles.barTextStyle}>{this.props?.user?.userData?.bmi != undefined && this.props?.user?.userData?.bmi ? parseFloat(this.props?.user?.userData?.bmi).toFixed(2) : 0}</Text>
                                    </View>
                                    <Text style={styles.decsTextStyle}>BMI</Text>
                                </View> */}
                            </View>
                        </View>
                        <ImageBackground source={require('../../assets/images/1/Cover.jpeg')} style={styles.workoutDayContainer}>
                            <Text style={styles.whiteTextStyle1}>30 DAYS WORKOUT</Text>
                            <View style={styles.rowStyle}>
                                {this.fitnessLevelFunction()}

                            </View>
                            <Text style={styles.whiteTextStyle1}>{this.props?.user?.userData?.daily_workout_count != undefined && this.props?.user?.userData?.daily_workout_count ? Math.floor(this.props?.user?.userData?.daily_workout_count / 30 * 100) : 0}%</Text>
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
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ImageBackground source={require('../../assets/images/Diet-min.jpeg')} imageStyle={{ borderRadius: 25, }} style={styles.cardContainer1} >
                                <Text style={styles.whiteTextStyle1}>YOUR DIET PLAN IS READY!</Text>
                                <View style={styles.goButtonContainer}>
                                    <Button loading={this.state.dietLoading} title={'GO!'} onPress={() => this.handleStartDietPlan()} />
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ImageBackground resizeMode="contain" source={require('../../assets/images/card-power-of-mind.png')} style={styles.cardContainer1} >
                                {/* <Text style={styles.whiteTextStyle1}>MIND POWER</Text> */}
                                <View style={styles.goButtonContainer1}>
                                    <Button title={'GO!'} onPress={() => navigate(route.POWER_OF_MIND)} />
                                </View>
                            </ImageBackground>
                        </View>
                        {/* <TouchableOpacity style={{}} onPress={() => navigate(route.POWER_OF_MIND)} style={{ alignItems: "center", justifyContent: "center" }} >
                            <ImageBackground source={require('../../assets/images/1/Power-of-Mind.png')} imageStyle={{ borderRadius: 25, }} style={styles.cardContainer1}>

                                <Text style={styles.whiteTextStyle1}>MIND POWER</Text>

                                <View style={styles.starContainer}>
                                    <Blue />
                                </View>
                            </ImageBackground>
                        </TouchableOpacity> */}
                    </ScrollView>
                </View>
                <UpgradeModal visible={this.state.modal} onUpgrade={() => this.setState({ modal: false }, () => this.props.navigation.navigate(route.PAYMENTMETHOD, {}))} onSkip={() => this.setState({ modal: false })} />
                <FocusAreaModal visible={this.state.focusModal} onGo={() => this.setState({ focusModal: false }, () => this.props.navigation.navigate(route.IMPORTANTNOTE, { newUser: null }))} onSkip={() => this.setState({ focusModal: false })} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        plan: state.planReducer || {}
    };
};
const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        planActions: bindActionCreators(planActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);