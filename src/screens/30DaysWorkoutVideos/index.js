import React, { Component } from "react";
import { View, StatusBar, ScrollView, FlatList, ImageBackground, Text, ActivityIndicator } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

import { Container, Icon } from "../../components";
import { route } from "../../lib/utils/constants";
import { VerticalSpacer } from "../../lib/utils/global";
import Youtube from '../../assets/svg/description.svg';

import styles from './style'
import { connect } from "react-redux";
import { PlanServices } from "../../services";

class DaysWorkoutVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

            loading: true,
            videos: []
        }
    }

    componentDidMount = () => {
        const { user_id, token, fitness_goal, fitness_level, fitness_equipment } = this.props.user.userData;
        console.log(this.props.user.userData)
        let data = {
            "fitness_goal": fitness_goal,
            "fitness_level": 'Normal Fit',
            "video_tags": fitness_equipment,
            "video_day": "Friday"//this.props?.route?.params?.data?.day
        }
        console.log(data)
        PlanServices.getWorkoutPlanVideos(data, token)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data)
                    this.setState({ videos: response.data.data, loading: false })
                }
            })
            .catch((err) => { console.log(err.response); this.setState({ videos: [], loading: false }) })
        // var tabBarVisible = true;
        // if (typeof this.props.route.state == route.DAYSWORKOUTVIDEOS) {
        //     const { routes } = route.state;
        //     if (routes.length > 1) {
        //         tabBarVisible = false;
        //     }
        // }
        // this.props.navigation.setOptions({ tabBarVisible });
    }

    _renderItems = (item, index) => {
        return (
            <ImageBackground resizeMode={"contain"} source={{ uri: item.video_thumbnail }} style={styles.imageStyle}>
                <View >
                    <Text style={styles.headingText}>{item.video_title}</Text>
                    <Text style={styles.headingText2}>30S <Text style={styles.timeText}>Total Time</Text> </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Icon.AntDesign onPress={() => this.props.navigation.navigate(route.DAYSWORKOUTVIDEOPLAYER, { data: item })} name='play' size={50} color={themeStyle.BAR_COLOR} />
                </View>
                <View style={styles.rowContentContainer} >
                    <Text style={styles.headingText2}>00:25</Text>
                    <Youtube fill={'#000000'} />
                </View>
            </ImageBackground>
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
                        <ScrollView>
                            <View>
                                <FlatList data={this.state.videos}
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
export default connect(mapStateToProps)(DaysWorkoutVideos);