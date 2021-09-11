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

class DietPlanDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            diet: [],
            loading: false
        }
    }

    componentDidMount = async () => {
        this.setState({ loading: true })
        let data = {
            "category_name": JSON.parse(await getLocalData(LOCAL_STORAGE_KEYS.DietPreference)),
            "fitness_goal": this.props.user.userData.fitness_goal,
            "week_name": this.props.route.params.dietData.weekName
        }
        PlanServices.getMealPlan(data, this.props.user.userData.token)
            .then((res) => { if (res.data.success) { this.setState({ diet: res.data.data[0].diet, loading: false }) } })
            .catch((err) => { console.log(err.response) })
    }

    handleFinishedModal = () => {
        const { user_id, token, diet_user_id } = this.props.user.userData;
        let week = this.props.route.params.dietData.weekName.split(' ')
        let data = {
            "diet_date": moment().format('YYYY-MM-DD'),
            "diet_week": week[1],
            "diet_day": moment().format('dddd'),
            "feedback": "Satisfied",
            "diet_user_id": diet_user_id
        }
        ProfileServices.updateDailyDiet(data, token)
            .then((res) => { if (res.data.success) { this.props.navigation.goBack(); } })
            .catch((err) => { console.log(err.response) })
    }

    render() {
        const { diet, loading } = this.state;
        return (
            <Container >
                {
                    loading ?
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator color={themeStyle.BAR_COLOR} size={"small"} />
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
                                                {
                                                    item?.description.map((element, i) => {
                                                        return (
                                                            <View style={styles.rowContainer}>
                                                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                                                <Text style={styles.textStyle}>{element}</Text>
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>

                }

                <TouchableOpacity onPress={() => this.setState({ finished: true })} style={{ position: "absolute", top: '85%', left: "78%" }}>
                    <Tick />
                </TouchableOpacity>
                <Modal isVisible={this.state.finished} style={{ marginTop: "5%", alignItems: "center" }}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => this.handleFinishedModal()} >
                            <Tick />
                        </TouchableOpacity>
                        <Text style={styles.headingText}>Finished!</Text>
                    </View>

                </Modal>
            </Container>

        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(DietPlanDetails);