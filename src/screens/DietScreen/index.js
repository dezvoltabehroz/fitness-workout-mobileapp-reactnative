import React, { Component } from "react";
import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, Platform, UIManager, LayoutAnimation, ActivityIndicator } from "react-native";
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Calender from '../../assets/svg/calendarColor.svg';
import moment from 'moment';
import Modal from 'react-native-modal'
import { Button, Container, DietModal, HorizontalList, Icon, UpgradeModal } from '../../components';
import More from '../../assets/svg/more.svg';

import Active from '../../assets/svg/Diet-active-icon.svg';
import Inactive from '../../assets/svg/Diet-Deactive-icon.svg';
import Cup from '../../assets/svg/cup.svg';
import Trophy from '../../assets/svg/trophy.svg';
import BigCup from '../../assets/svg/img.svg';
import Mark from '../../assets/svg/mark.svg';

import styles from './style';
import { route, SCREEN_WIDTH } from "../../lib/utils/constants";
import themeStyle from "../../assets/styles/theme.style";
import { PlanServices, ProfileServices, SurveysServices } from "../../services";
import { connect } from "react-redux";
import { getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from "../../lib/utils/localstorage";
import { authActions } from "../../redux/actions/auth";
import { bindActionCreators } from "redux";
import { planActions } from "../../redux/actions/plan";

const progressCustomStyles = {
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: "center",
    backgroundColor: themeStyle.BAR_COLOR
};

class DietScreen extends Component {
    constructor(props) {
        super(props);
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        this.days1 = [
            {
                day: 'Monday',
                completed: false
            },
            {
                day: 'Tuesday',
                completed: false
            },
        ]
        this.state = {
            upgradeModal: false,
            dietPlans: this.props.plan.dietPlan,
            like: false,
            dietLoading: false,
            noOfPurchased: 28,
            selected: null,
            isRefreshing: false,
            waiting: false,
            loading: true,
            dietModal: false,
            modal: false,
            completed: false,
            loading: true,
            dietVideos: [],
            value: "",
            isServey: "",
        }
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentDidMount = async () => {
        let dietValue = await getLocalData(LOCAL_STORAGE_KEYS.DietPreference);

        if (dietValue != null) {
            this.setState({ value: JSON.parse(dietValue) });
        } else {
            this.setState({ dietModal: true });
        }
        this.focusListener = this.props.navigation.addListener('focus', () => { this.handleDietDays(); })
        this.props.navigation.setOptions({ headerRight: () => this.headerRight() });
        this.handleDietDays();
    }

    handleDietDays = async () => {
        let dietValue = await getLocalData(LOCAL_STORAGE_KEYS.DietPreference);
        if (dietValue != null) {
            this.setState({ value: JSON.parse(dietValue) });
        } else {
            this.setState({ dietModal: true });
        }
        if (this.props.plan.dietPlan.length > 0) {
            this.setState({ dietPlans: this.props.plan.dietPlan })
            const { user_id, token } = this.props.user.userData;
            let videoTag = { category: "diet videos" }
            PlanServices.getFreeVideos(videoTag, token)
                .then((response) => {
                    if (response.data.success) {
                        this.setState({ dietVideos: response.data.data, })
                        let serveyData = {
                            user_id: user_id,
                            submitted_date: moment().format('YYYY-MM-DD')
                        }
                        SurveysServices.isSurveySubmitted(serveyData, token)
                            .then((res) => {
                                if (res.data.success) {
                                    this.setState({ isServey: res.data.message, loading: false })
                                } else {
                                    this.setState({ isServey: res.data.message, loading: false })
                                }
                            })
                            .catch((err) => { console.log(err); this.setState({ loading: false }) })
                    }
                })
                .catch((err) => { console.log(err.response); this.setState({ dietPlans: [], loading: false }) })
        } else {
            await this.props.planActions.getDietPlan();
            setTimeout(() => {
                this.setState({ dietPlans: this.props.plan.dietPlan })
                const { user_id, token } = this.props.user.userData;
                let videoTag = { category: "diet videos" }
                PlanServices.getFreeVideos(videoTag, token)
                    .then((response) => {
                        if (response.data.success) {
                            this.setState({ dietVideos: response.data.data, })
                            let serveyData = {
                                user_id: user_id,
                                submitted_date: moment().format('YYYY-MM-DD')
                            }
                            SurveysServices.isSurveySubmitted(serveyData, token)
                                .then((res) => {
                                    if (res.data.success) {
                                        this.setState({ isServey: res.data.message, loading: false })
                                    } else {
                                        this.setState({ isServey: res.data.message, loading: false })
                                    }
                                })
                                .catch((err) => { console.log(err); this.setState({ loading: false }) })
                        }
                    })
                    .catch((err) => { console.log(err.response); this.setState({ dietPlans: [], loading: false }) })
            }, 2000);
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
                this.handleDietDays();

            })
            .catch((err) => console.log(err.response))
    }

    headerRight = () => {
        return (
            <TouchableOpacity style={{ paddingRight: 25, width: 100, alignItems: "flex-end" }} onPress={() => { this.setState({ dietModal: !this.state.dietModal }) }} ><More /></TouchableOpacity>
        )
    }

    truncateString = (str, num) => {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num)
    }

    changeWeek = (index) => {
        if (this.props.user.userData.is_pro == 1 || index == 0) {
            let array = [...this.state.dietPlans];
            if (array[index].expanded) { array[index] = { ...array[index], expanded: false } }
            else { array[index] = { ...array[index], expanded: true } }
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ dietPlans: array });
        } else { this.setState({ upgradeModal: true }); }
    }

    getWeekTitle = (week) => {
        let weekName;
        switch (week) {
            case 1:
                weekName = "1st"
                return weekName
            case 2:
                weekName = "2nd"
                return weekName
            case 3:
                weekName = "3rd"
                return weekName
            case 4:
                weekName = "4th"
                return weekName
            case 5:
                weekName = "5th"
                return weekName
        }

    }

    render() {
        const { is_pro } = this.props.user.userData
        const { isServey, loading, dietVideos, dietPlans, dietModal,
            dietLoading,
            value,
            upgradeModal } = this.state;
        const { navigate } = this.props.navigation;
        return (
            <Container color>
                {
                    loading ?
                        <View style={{ marginTop: "10%" }}>
                            <ActivityIndicator color={themeStyle.BAR_COLOR} size={"small"} />
                        </View>
                        :
                        <ScrollView contentContainerStyle={{ paddingVertical: "5%" }}>
                            <HorizontalList data={dietVideos} video onPress={(item) => navigate(route.VIDEO, { uri: item.media_path })} />
                            <View>
                                {dietPlans?.map((element, index) => {
                                    let week = element?.weekName?.split(" ");
                                    let dietWeekDate = [];
                                    let progressCount = []
                                    element?.dietDays?.forEach((dayObj, i) => {
                                        if (dayObj.completed) { progressCount.push(1) }
                                        if (dayObj.date == moment().format('YYYY-MM-DD')) { dietWeekDate[index] = 1; }
                                    });
                                    return (
                                        <View style={styles.week1Style}>
                                            <View style={styles.itemContainer} >
                                                <>
                                                    <TouchableOpacity onPress={() => this.changeWeek(index)} style={[styles.textContainer, { paddingBottom: element.expanded ? 0 : '5%' }]}>
                                                        <Text style={styles.greyText}>{'Week'}</Text>
                                                        <View style={styles.rowContainer}>
                                                            <View style={[styles.row, { flex: 1 }]}>
                                                                <Text style={styles.dayText}>0{week[1]}</Text>
                                                                <View style={{ flex: 1 }}>
                                                                    <View style={[styles.row, { marginLeft: 10 }]}>
                                                                        <Calender />
                                                                        <Text style={[styles.greyText, { marginLeft: 5 }]}>{element.dietDays.length} Days</Text>
                                                                    </View>
                                                                    <View style={{ marginLeft: 10, marginTop: 5 }}>
                                                                        <View style={{ backgroundColor: "lightgray", width: SCREEN_WIDTH * 0.15, borderRadius: 5 }}>
                                                                            <ProgressBarAnimated
                                                                                width={SCREEN_WIDTH * 0.15}
                                                                                height={5}
                                                                                value={progressCount.length / element.dietDays.length * 100 == 0 ? 1 : progressCount.length / element.dietDays.length * 100}
                                                                                {...progressCustomStyles}
                                                                                onComplete={() => { }}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={{ alignItems: "center" }} >
                                                                {is_pro == 0 && index != 0 ?
                                                                    <View style={{ top: -43 }}>
                                                                        <Mark />
                                                                    </View>
                                                                    : null}
                                                                {is_pro == 1 || index == 0 ?
                                                                    <View style={{ top: is_pro == 1 ? -15 : 0 }}>
                                                                        {element.expanded ?
                                                                            <Icon.FontAwesome name="angle-down" size={30} color={'gray'} />
                                                                            :
                                                                            <Icon.FontAwesome name="angle-right" size={30} color={'gray'} />}
                                                                    </View>
                                                                    :
                                                                    <View style={{ top: -15 }}>
                                                                        <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                                                    </View>}
                                                            </View>
                                                        </View>
                                                        {element.expanded ? <View style={{ borderWidth: 0.5, marginVertical: "2.5%" }}></View> : null}
                                                    </TouchableOpacity>
                                                    {element.expanded ?
                                                        <View style={styles.descriptionContainer}>
                                                            {element.dietDays.map((item, i) => {
                                                                return (
                                                                    <>
                                                                        <View style={styles.itemContainer1}>
                                                                            <TouchableOpacity disabled={moment().format('YYYY-MM-DD') >= moment(item.date).format("YYYY-MM-DD") ? false : true} onPress={() => this.props.navigation.navigate(route.DIETPLANDETAILS, { dietData: element, dietDate: item.date, category: value == "1" ? "standard" : "vegetarian" })} style={[styles.dayStyle, { borderColor: item.completed ? themeStyle.BAR_COLOR : '#9B9B9B', backgroundColor: "transparent" }]}>
                                                                                <Text style={[styles.textDescription, { color: item.completed ? themeStyle.BAR_COLOR : '#9B9B9B' }]}>{this.truncateString(item.day, 3)}</Text>
                                                                            </TouchableOpacity>
                                                                            {i == 3 ? null :
                                                                                <View style={{ marginLeft: '2%', }}>
                                                                                    <Icon.AntDesign name={"right"} size={20} color={"#9B9B9B"} />
                                                                                </View>}
                                                                        </View>
                                                                        <Modal isVisible={progressCount.length == 7 && moment(item.date).format("YYYY-MM-DD") == moment().format('YYYY-MM-DD') && isServey && isServey == "Survey has not attempted" ? true : false}>
                                                                            <View style={styles.cardContainer}>
                                                                                <View style={{ marginTop: "5%", alignItems: "center" }}>
                                                                                    <BigCup />
                                                                                    <Text style={styles.headingText}>Congrats!</Text>
                                                                                    <Text style={styles.textStyle}>You just completed your {this.getWeekTitle(index + 1)} week</Text>
                                                                                </View>

                                                                                <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                                                                                    <Button title={'Continue'} onPress={() => this.setState({ modal: false, completed: true }, () => this.props.navigation.navigate(route.FEEDBACK))} />
                                                                                </View>
                                                                            </View>
                                                                        </Modal>
                                                                    </>
                                                                )
                                                            })}
                                                            <TouchableOpacity onPress={() => this.setState({ modal: true })} style={{ marginLeft: '2%', }}>
                                                                {progressCount.length == 7 ? <Trophy /> : <Cup />}
                                                            </TouchableOpacity>
                                                        </View> : null
                                                    }
                                                </>
                                            </View>
                                        </View>)
                                })}
                            </View>
                        </ScrollView>
                }
                <DietModal visible={dietModal}
                    loading={dietLoading}
                    onValue={(e) => {
                        this.setState({ value: e })
                    }}
                    value={value}
                    onClose={async () => { let dietValue = await getLocalData(LOCAL_STORAGE_KEYS.DietPreference); if (dietValue != null) { this.setState({ dietModal: false }); } else if (value) { this.setState({ dietModal: false, value: "" }); this.props.navigation.goBack() } else { this.setState({ dietModal: false }); this.props.navigation.goBack() } }}
                    onSkip={() => { storeLocalData(LOCAL_STORAGE_KEYS.DietPreference, JSON.stringify(value)); this.setState({ dietModal: false }) }} />
                <UpgradeModal visible={upgradeModal}
                    onUpgrade={() => this.setState({ upgradeModal: false }, () => this.props.navigation.navigate(route.PAYMENTMETHOD, {}))}
                    onSkip={() => this.setState({ upgradeModal: false })} />
            </Container>
        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {}, plan: state.planReducer || {} }; };
const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        planActions: bindActionCreators(planActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DietScreen);