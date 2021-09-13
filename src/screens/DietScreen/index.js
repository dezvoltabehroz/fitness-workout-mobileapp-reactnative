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
import { PlanServices } from "../../services";
import { connect } from "react-redux";
import { getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from "../../lib/utils/localstorage";

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
            dietPlans: [],
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
            dietVideos: []
        }
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => { this.handleDietDays(); })
        this.props.navigation.setOptions({ headerRight: () => this.headerRight() });
        this.handleDietDays()
    }

    handleDietDays = async () => {
        const { user_id, token } = this.props.user.userData;
        console.log(user_id)
        let data = {
            user_id: user_id
        }
        this.setState({ value: JSON.parse(await getLocalData(LOCAL_STORAGE_KEYS.DietPreference)), dietModal: true });
        PlanServices.getDietPlans(data, token)
            .then(async (res) => {
                if (res.data.success) {
                    let arr = [...res.data.data];
                    arr.forEach((item, index) => { arr[index] = { ...arr[index], expanded: false } })
                    this.setState({ dietPlans: arr })
                    let videoTag = { category: "diet videos" }
                    PlanServices.getFreeVideos(videoTag, token)
                        .then((response) => { this.setState({ dietVideos: response.data.data, loading: false }) })
                        .catch((err) => { console.log(err.response); this.setState({ dietPlans: [], loading: false }) })
                }
            })
            .catch((err) => { console.log(err.response); this.setState({ dietPlans: [], loading: false }) })
    }

    headerRight = () => {
        return (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { this.setState({ dietModal: !this.state.dietModal }) }} ><More /></TouchableOpacity>
        )
    }

    truncateString = (str, num) => {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num)
    }

    changeWeek = (index) => {
        if (this.props.user.userData.is_pro == 1) {
            let array = [...this.state.dietPlans];
            if (array[index].expanded) { array[index] = { ...array[index], expanded: false } }
            else { array[index] = { ...array[index], expanded: true } }
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ dietPlans: array });
        } else { this.setState({ upgradeModal: true }); }
    }

    render() {
        const { is_pro } = this.props.user.userData
        return (
            <Container color>
                {
                    this.state.loading ?
                        <View style={{ marginTop: "10%" }}>
                            <ActivityIndicator color={themeStyle.BAR_COLOR} size={"small"} />
                        </View>
                        :
                        <ScrollView contentContainerStyle={{ paddingVertical: "5%" }}>
                            <HorizontalList data={this.state.dietVideos} video />
                            <View>
                                {this.state.dietPlans.map((element, index) => {
                                    let week = element.weekName.split(" ");
                                    let dietWeekDate = [];
                                    let progressCount = []
                                    element.dietDays.forEach((dayObj, i) => {
                                        if (dayObj.completed) { progressCount.push(1) }
                                        if (dayObj.date == moment().format('YYYY-MM-DD')) { dietWeekDate[index] = 1; }
                                    });
                                    return (
                                        <View style={styles.week1Style}>
                                            <View style={styles.itemContainer} >
                                                <>
                                                    <TouchableOpacity disabled={dietWeekDate && dietWeekDate[index] == 1 ? false : true} onPress={() => this.changeWeek(index)} style={[styles.textContainer, { paddingBottom: this.state.weekOneexpanded ? 0 : '5%' }]}>
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
                                                                                onComplete={() => { Alert.alert('Hey!', 'onComplete event fired!'); }}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={{ alignItems: "center" }} >
                                                                {is_pro == 0 ?
                                                                    <View style={{ top: -42 }}>
                                                                        <Mark />
                                                                    </View>
                                                                    : null}
                                                                {is_pro == 1 && dietWeekDate && dietWeekDate[index] == 1 ?
                                                                    <View style={{ top: is_pro == 1 ? -15 : 0 }}>
                                                                        {element.expanded ?
                                                                            <Icon.FontAwesome name="angle-down" size={30} color={'gray'} />
                                                                            :
                                                                            <Icon.FontAwesome name="angle-right" size={30} color={'gray'} />}
                                                                    </View>
                                                                    :
                                                                    <View style={{ top: is_pro == 1 ? -15 : 0 }}>
                                                                        <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                                                    </View>}
                                                            </View>
                                                        </View>
                                                        {element.expanded ? <View style={{ borderWidth: 0.5, marginVertical: "2.5%" }}></View> : null}
                                                    </TouchableOpacity>
                                                    {element.expanded ?
                                                        <View style={styles.descriptionContainer}>
                                                            {element.dietDays.map((item, index) => {
                                                                return (
                                                                    <View style={styles.itemContainer1}>
                                                                        <TouchableOpacity disabled={item.date == moment().format('YYYY-MM-DD') ? false : true} onPress={() => this.props.navigation.navigate(route.DIETPLANDETAILS, { dietData: element, category: this.state.value == "1" ? "standard" : "vegetarian" })} style={[styles.dayStyle, { borderColor: item.completed ? themeStyle.BAR_COLOR : '#9B9B9B', backgroundColor: "transparent" }]}>
                                                                            <Text style={[styles.textDescription, { color: item.completed ? themeStyle.BAR_COLOR : '#9B9B9B' }]}>{this.truncateString(item.day, 3)}</Text>
                                                                        </TouchableOpacity>
                                                                        {index == 3 ? null :
                                                                            <View style={{ marginLeft: 10, }}>
                                                                                <Icon.AntDesign name={"right"} size={20} color={"#9B9B9B"} />
                                                                            </View>}
                                                                    </View>)
                                                            })}
                                                            <TouchableOpacity onPress={() => this.setState({ modal: true })} style={{ marginLeft: 12.5, }}>
                                                                {this.state.completed ? <Trophy /> : <Cup />}
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

                <Modal isVisible={this.state.modal}>
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop: "5%", alignItems: "center" }}>
                            <BigCup />
                            <Text style={styles.headingText}>Congrats!</Text>
                            <Text style={styles.textStyle}>You just completed your 1st week</Text>
                        </View>

                        <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                            <Button title={'Continue'} onPress={() => this.setState({ modal: false, completed: true })} />
                        </View>
                    </View>
                </Modal>
                <DietModal visible={this.state.dietModal} loading={this.state.dietLoading} onValue={(e) => {
                    this.setState({ value: e })
                    storeLocalData(LOCAL_STORAGE_KEYS.DietPreference, JSON.stringify(e))
                }}
                    value={this.state.value} onSkip={() => this.setState({ dietModal: false })} />
                <UpgradeModal visible={this.state.upgradeModal}
                    onUpgrade={() => this.props.navigation.navigate(route.PAYMENTMETHOD, {})}
                    onSkip={() => this.setState({ upgradeModal: false })} />
            </Container>
        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(DietScreen);