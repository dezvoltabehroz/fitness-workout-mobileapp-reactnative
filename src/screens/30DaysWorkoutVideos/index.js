import React, { Component } from "react";
import { View, StatusBar, ScrollView, FlatList, ImageBackground, Text, ActivityIndicator } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

import { Container, Icon } from "../../components";
import { route } from "../../lib/utils/constants";
import { VerticalSpacer } from "../../lib/utils/global";
import Youtube from '../../assets/svg/description.svg';

import styles from './style'
import { connect } from "react-redux";
import { PlanServices, ProfileServices } from "../../services";
import { getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import moment from "moment";
import { planActions } from "../../redux/actions/plan";
import { bindActionCreators } from "redux";
class DaysWorkoutVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            loading: true,
            videos: []
        }
    }

    componentDidMount = async () => {

        const { user_id, token, fitness_goal, fitness_level, fitness_equipment } = this.props.user.userData;
        let data = {
            "fitness_goal": fitness_goal,
            "fitness_level": fitness_level,
            "video_tags": fitness_equipment,
            "video_day": this.props?.route?.params?.data?.day
        }
        PlanServices.getWorkoutPlanVideos(data, token)
            .then((response) => {
                if (response.data.success) {
                    this.setState({ videos: response.data.data, loading: false })
                }
            })
            .catch((err) => { console.log(err.response); this.setState({ videos: [], loading: false }) })
    }

    handleUpdateDailyWorkout = (index, item) => {
        const { token, workout_user_id } = this.props.user.userData;
        if ((index + 1) == this.state.videos.length) {
            let data = {
                "workout_date": moment(this.props?.route?.params?.workoutDate).format('YYYY-MM-DD'),
                "workout_week": this.props?.route?.params?.workout_week,
                "workout_day": moment(this.props?.route?.params?.workoutDate).format('dddd'),
                "feedback": "Satisfied",
                "workout_user_id": workout_user_id
            }
            ProfileServices.updateDailyWorkout(data, token)
                .then(async (response) => {
                    if (response.data.success) {
                        await this.props.planActions.getWorkoutPlan();
                    }
                })
                .catch((err) => { console.log(err.response); this.setState({ loading: false }) })
        }

    }


    _renderItems = (item, index) => {
        return (
            <View style={styles.container1}>
                <ImageBackground resizeMode={"contain"} source={{ uri: item.video_thumbnail }} style={styles.imageStyle}>
                    <View style={styles.overlay} />

                    <View >
                        <Text style={styles.headingText}>{item.video_title}</Text>
                        {/* <Text style={styles.headingText3}>30S <Text style={styles.timeText}>Total Time</Text> </Text> */}
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Icon.AntDesign onPress={() => { this.props.navigation.navigate(route.DAYSWORKOUTVIDEOPLAYER, { data: item, dayCompleted: index + 1 == this.state.videos ? true : false, workout_week: this.props.route.params.workout_week }); this.handleUpdateDailyWorkout(index, item) }} name='play' size={50} color={themeStyle.BAR_COLOR} />
                    </View>
                    <View style={styles.rowContentContainer} >
                        {/* <Text style={styles.headingText2}>00: 25</Text> */}
                        <Text style={styles.headingText2}> </Text>
                        <Youtube fill={'#fff'} />
                    </View>
                </ImageBackground>
            </View>

        )
    }

    render() {
        const { videos, loading } = this.state;
        return (
            <Container>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                <View style={styles.container}>
                    {loading ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={themeStyle.BAR_COLOR} size={"small"} />
                        </View>
                        :
                        videos?.length == 0 ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.headingText}>No record found!</Text>
                            </View>
                            :
                            <ScrollView>
                                <View>
                                    <FlatList data={videos}
                                        ItemSeparatorComponent={(VerticalSpacer)}
                                        renderItem={({ item, index }) => this._renderItems(item, index)} />
                                </View>
                            </ScrollView>}
                </View>
            </Container>
        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
const mapDispatchToProps = dispatch => {
    return {
        planActions: bindActionCreators(planActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DaysWorkoutVideos);