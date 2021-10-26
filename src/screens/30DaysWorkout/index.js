import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, ImageBackground, TouchableOpacity, UIManager, Platform, LayoutAnimation, ActivityIndicator } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import CircularProgress from 'react-native-circular-progress-indicator';

import { Container, HorizontalList, Icon, UpgradeModal } from '../../components';
import { route, SCREEN_WIDTH } from '../../lib/utils/constants';
import { VerticalSpacer } from '../../lib/utils/global';
import WFire from '../../assets/svg/white-fire.svg';
import Fire from '../../assets/svg/stopwatch.svg';
import Stopwatch from '../../assets/svg/stopwatchColor.svg';
import Mark from '../../assets/svg/mark.svg';

import Calender from '../../assets/svg/calendarColor.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import moment from 'moment';
import Button from '../../components/Button';
import { PlanServices } from '../../services';
import { connect } from 'react-redux';
const progressCustomStyles = {
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: "center",
    backgroundColor: themeStyle.BAR_COLOR
};
class PowerOfMind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutLoading: true,
            workoutPlan: this.props.plan.workoutPlan,
            upgradeModal: false,
        }
        this.days = [
            {
                day: 'Mon',
                completed: true
            },
            {
                day: 'Tue',
                completed: true
            },
            {
                day: 'Wed',
                completed: true
            },
            {
                day: 'Thu',
                completed: true
            },
            {
                day: 'Fri',
                completed: true
            },
            {
                day: 'Sat',
                completed: true
            },
            {
                day: 'Sun',
                completed: true
            }]
        this.days1 = [
            {
                day: 'Mon',
                completed: true
            },
            {
                day: 'Tue',
                completed: true
            },
        ];
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => { this.getWorkOutDays(); })
        this.getWorkOutDays();
    }
    getWorkOutDays = () => {
        this.setState({ workoutPlan: this.props.plan.workoutPlan,workoutLoading:false })
    }

    changeLayout = (index) => {
        let array = [...this.state.workoutPlan];
        if (array[index].expanded) {
            array[index] = { ...array[index], expanded: false }
        } else {
            array[index] = { ...array[index], expanded: true }
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ workoutPlan: array });
    }

    truncateString = (str, num) => {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num)
    }

    _renderItem = ({ item, index }) => {
        const { is_pro, } = this.props.user.userData
        let week = item.weekName.split(" ");
        let workoutWeekDate = [];
        let progressCount = []
        item.workoutDays.map((dayObj, i) => {
            if (dayObj.completed) { progressCount.push(1) }
            if (dayObj.date == moment().format('YYYY-MM-DD')) { workoutWeekDate[index] = 1; }
        });
        return (
            <View style={styles.itemContainer} >
                <TouchableOpacity onPress={() => {
                    if (index == 0) {
                        this.changeLayout(index)
                    } else if (is_pro == 0) {
                        this.setState({ upgradeModal: true })
                    } else {
                        this.changeLayout(index)
                    }
                }} style={[styles.textContainer, { paddingBottom: item.expanded ? 0 : "5%" }]}>
                    <Text style={styles.greyText}>{'Week'}</Text>
                    <View style={styles.rowContainer}>
                        <View style={[styles.row, { flex: 1 }]}>
                            <Text style={styles.dayText}>0{week[1]}</Text>
                            <View style={{ flex: 1 }}>
                                <View style={[styles.row, { marginLeft: 10 }]}>
                                    <Calender />
                                    <Text style={[styles.greyText, { marginLeft: 5 }]}>{item.workoutDays.length} Days</Text>
                                </View>
                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <View style={{ backgroundColor: "lightgray", width: SCREEN_WIDTH * 0.15, borderRadius: 5 }}>
                                        <ProgressBarAnimated
                                            width={SCREEN_WIDTH * 0.15}
                                            height={5}
                                            value={progressCount.length / item.workoutDays.length * 100 == 0 ? 1 : progressCount.length / item.workoutDays.length * 100}
                                            {...progressCustomStyles}
                                            onComplete={() => { }}
                                        />
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.2, alignItems: "center" }} >
                            {
                                is_pro == 0 && index != 0 ?
                                    <View style={{ top: -42 }}>
                                        <Mark />
                                    </View>
                                    :
                                    null
                            }
                            {is_pro == 1 //&& workoutWeekDate && workoutWeekDate[index] == 1
                                || index == 0 ?
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", right: 15 }}>
                                    <CircularProgress
                                        value={progressCount.length / item.workoutDays.length * 100 == 0 ? 0 : progressCount.length / item.workoutDays.length * 100}
                                        duration={50}
                                        radius={30}
                                        textColor={'#1F2729'}
                                        textStyle={styles.textStyle}
                                        activeStrokeWidth={1}
                                        inActiveStrokeWidth={1}
                                        activeStrokeColor={themeStyle.BAR_COLOR}
                                        inActiveStrokeColor={'lightgray'}
                                        inActiveStrokeOpacity={1}
                                        valueSuffix={'%'}
                                        onAnimationComplete={() => { this.setState({ value: true }) }}
                                    />
                                    <View style={{ width: 15 }}></View>
                                    <View style={{}}>
                                        {item.expanded ?
                                            <Icon.FontAwesome name="angle-down" size={30} color={'gray'} />
                                            :
                                            <Icon.FontAwesome name="angle-right" size={30} color={'gray'} />}
                                    </View>
                                </View>
                                :
                                <View style={{ top: is_pro == 1 ? -15 : 0 }}>
                                    <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                </View>}
                        </View>
                    </View>

                </TouchableOpacity>
                {item.expanded ?
                    item.workoutDays.map((element, inde) => {
                        return (
                            <TouchableOpacity disabled={moment().format('YYYY-MM-DD') >= moment(element.date).format("YYYY-MM-DD") ? false : true} onPress={() => {
                                this.props.navigation.navigate(route.DAYSWORKOUTVIDEOS, { data: element, workout_week: week[1] })
                            }} style={styles.itemContainer} >
                                <View style={styles.textContainer1}>
                                    <Text style={styles.greyText}>{'Day'}</Text>
                                    <View style={styles.rowContainer1}>
                                        <View style={[styles.row, { flex: 1 }]}>
                                            <Text style={styles.dayText1}>{this.truncateString(element.day, 3)}</Text>
                                            <View style={{ flex: 1 }}>
                                                <View style={[styles.row, { marginLeft: 10 }]}>
                                                    <Stopwatch />
                                                    <Text style={[styles.greyText, { marginLeft: 5 }]}>9 Min</Text>
                                                </View>
                                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                                    <View style={{ backgroundColor: "lightgray", width: SCREEN_WIDTH * 0.15, borderRadius: 5 }}>
                                                        <ProgressBarAnimated
                                                            width={SCREEN_WIDTH * 0.15}
                                                            height={5}
                                                            value={element?.completed ? 100 : 1}
                                                            {...progressCustomStyles}
                                                            onComplete={() => { }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: "center" }} >
                                            {
                                                moment().format('YYYY-MM-DD') >= moment(element.date).format("YYYY-MM-DD") ?
                                                    <CircularProgress
                                                        value={element?.completed ? 100 : 0}
                                                        duration={50}
                                                        radius={30}
                                                        textColor={'#1F2729'}
                                                        textStyle={styles.textStyle}
                                                        activeStrokeWidth={1}
                                                        inActiveStrokeWidth={1}
                                                        activeStrokeColor={themeStyle.BAR_COLOR}
                                                        inActiveStrokeColor={'lightgray'}
                                                        inActiveStrokeOpacity={1}
                                                        valueSuffix={'%'}
                                                        onAnimationComplete={() => { this.setState({ value: true }) }}
                                                    />
                                                    :
                                                    <View style={{ top: -5 }}>
                                                        <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                                    </View>
                                            }

                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })

                    :
                    null
                }
            </View>
        )
    }

    render() {
        const { navigation } = this.props;
        const { bmi, daily_diet_count, daily_workout_count, is_pro } = this.props.user.userData;
        return (
            <Container color>
                <View style={styles.container}>
                    {
                        this.state.workoutLoading ?
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>

                                <ActivityIndicator size={"small"} color={themeStyle.BAR_COLOR} />
                            </View> :
                            <ScrollView>
                                <View style={styles.upperContainer}>
                                    <ImageBackground imageStyle={styles.stylingImage} style={styles.imageStyle} source={require('../../assets/images/chest-work.jpg')}>
                                        <Text style={styles.headingText1} >30 DAY'S WORKOUT</Text>
                                        <View style={styles.rowContainer}>
                                            <Text style={styles.headingText}>Day {daily_workout_count == 0 ? 1 : daily_workout_count}</Text>
                                            {/* <View style={styles.row}>
                                                <WFire />
                                                <Text style={[styles.whiteText, { marginHorizontal: 5 }]}>10 Workouts</Text>
                                            </View> */}
                                        </View>
                                        <View style={styles.rowContainer}>
                                            <Text style={styles.whiteText}>{30 - daily_workout_count} Days Left</Text>
                                            <Text style={styles.whiteText} >{daily_workout_count ? Math.floor(daily_workout_count / 30 * 100) : 0}%</Text>
                                        </View>
                                        <ProgressBarAnimated
                                            width={SCREEN_WIDTH * 0.9}
                                            height={10}
                                            value={daily_workout_count ? Math.floor(daily_workout_count / 30 * 100) : 0}
                                            {...progressCustomStyles}
                                            onComplete={() => { }}
                                        />
                                    </ImageBackground>
                                </View>
                                <FlatList
                                    data={this.state.workoutPlan}
                                    contentContainerStyle={{ paddingTop: "5%", paddingBottom: "10%" }}
                                    renderItem={this._renderItem}
                                    keyExtractor={item => item.route}
                                    ItemSeparatorComponent={VerticalSpacer}
                                />
                            </ScrollView>
                    }

                </View>
                <UpgradeModal visible={this.state.upgradeModal} onUpgrade={() => this.setState({ upgradeModal: false }, () => navigation.navigate(route.PAYMENTMETHOD, {}))} onSkip={() => this.setState({ upgradeModal: false })} />
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
export default connect(mapStateToProps)(PowerOfMind);