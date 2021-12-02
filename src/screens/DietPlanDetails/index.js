import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

import { Container, Icon } from '../../components';

import EarlyRise from '../../assets/svg/EarlyRise.svg'
import Breakfast from '../../assets/svg/Breakfast.svg'
import Lunch from '../../assets/svg/Lunch.svg'
import Snacks from '../../assets/svg/snacks.svg'
import Dinner from '../../assets/svg/Dinner.svg'
import Tick from '../../assets/svg/Tick-btn.svg'


import styles from './style';
import moment from 'moment';
import { connect } from 'react-redux';
import { PlanServices, ProfileServices } from '../../services';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';
import themeStyle from '../../assets/styles/theme.style';
import RenderHTML from 'react-native-render-html';
import { SCREEN_WIDTH } from '../../lib/utils/constants';
import { planActions } from '../../redux/actions/plan';
import { bindActionCreators } from 'redux';
import { authActions } from '../../redux/actions/auth';

class DietPlanDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            diet: [],
            loading: false,
            finishLoading: false
        }
    }

    componentDidMount = async () => {
        this.setState({ loading: true })
        console.log("this.props.route.params.dietData.weekName : ", this.props.route.params.dietData)
        console.log(JSON.parse(await getLocalData(LOCAL_STORAGE_KEYS.DietPreference)));
        let data = {
            "category_name": JSON.parse(await getLocalData(LOCAL_STORAGE_KEYS.DietPreference)),
            "fitness_goal": this.props.user.userData.fitness_goal.toLowerCase(),
            "week_name": this.props.route.params.dietData.weekName
        }
        console.log(data);
        PlanServices.getMealPlan(data, this.props.user.userData.token)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) { this.setState({ diet: res.data.data[0].diet, loading: false }) }
                else { this.setState({ diet: [], loading: false }) }
            })
            .catch((err) => { console.log(err); this.setState({ diet: [], loading: false }) })
    }

    handleFinishedModal = () => {
        this.setState({ finishLoading: true })
        const { user_id, token, diet_user_id } = this.props.user.userData;
        let week = this.props.route.params.dietData.weekName.split(' ')
        let data = {
            "diet_date": moment(this.props.route.params.dietDate).format('YYYY-MM-DD'),
            "diet_week": week[1],
            "diet_day": moment(this.props.route.params.dietDate).format('dddd'),
            "feedback": "Satisfied",
            "diet_user_id": diet_user_id
        }
        console.log(data)
        ProfileServices.updateDailyDiet(data, token)
            .then(async (res) => {
                if (res.data.success) {
                    await this.props.planActions.getDietPlan();
                    await this.props.authActions.getUserProfile({ user_id: user_id, token: token });
                    setTimeout(() => {
                        this.setState({ finished: false, finishLoading: true }); this.props.navigation.goBack();
                    }, 2000);
                }
            })
            .catch((err) => { console.log(err.response) })
    }

    render() {
        const { diet, loading, finishLoading } = this.state;
        return (
            <Container >
                {
                    loading ?
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator color={themeStyle.BAR_COLOR} size={"small"} />
                        </View>
                        :
                        diet.length == 0 ?
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text>No record found!</Text>
                            </View>
                            :
                            <ScrollView contentContainerStyle={{ paddingBottom: '10%' }}>
                                <View style={styles.container}>
                                    {

                                        diet.map((item, index) => {
                                            return (
                                                <View style={styles.cardContainer}>
                                                    <View style={styles.rowContainer}>
                                                        {index == 4 ?
                                                            <Dinner />
                                                            :
                                                            index == 3 ?
                                                                <Snacks />
                                                                :
                                                                index == 2 ?
                                                                    <Lunch />
                                                                    :
                                                                    index == 1 ?
                                                                        <Breakfast />
                                                                        :
                                                                        <EarlyRise />}
                                                        <Text style={styles.headingText}>{item.dietName}</Text>
                                                    </View>
                                                    <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: item.description }} />
                                                    {/* {
                                                    item?.description.map((element, i) => {
                                                        return (
                                                            <View style={styles.rowContainer}>
                                                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                                                <Text style={styles.textStyle}>{element}</Text>
                                                            </View>
                                                        )
                                                    })
                                                } */}
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>

                }
                {diet.length == 0 ?
                    null :
                    <TouchableOpacity onPress={() => this.setState({ finished: true })} style={{ position: "absolute", top: '85%', left: "78%" }}>
                        <Tick />
                    </TouchableOpacity>}
                <Modal isVisible={this.state.finished} style={{ marginTop: "5%", alignItems: "center" }} animationInTiming={400}
                    animationOutTiming={200}>
                    {
                        finishLoading ?
                            <View style={styles.cardContainer}>
                                <ActivityIndicator color={themeStyle.BAR_COLOR} size={"small"} />
                            </View>
                            :
                            <View style={styles.cardContainer}>
                                <TouchableOpacity onPress={() => this.handleFinishedModal()} >
                                    <Tick />
                                </TouchableOpacity>
                                <Text style={styles.headingText}>Finished!</Text>
                            </View>
                    }

                </Modal>
            </Container>

        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
const mapDispatchToProps = dispatch => {
    return {
        planActions: bindActionCreators(planActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DietPlanDetails);