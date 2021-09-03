import React, { Component } from "react";
import { View, StatusBar, ScrollView, FlatList, ImageBackground, Text } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

import { Container, Icon } from "../../components";
import { route } from "../../lib/utils/constants";
import { VerticalSpacer } from "../../lib/utils/global";
import Youtube from '../../assets/svg/description.svg';

import styles from './style'

export default class DaysWorkoutVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            data: [1, 2, 3, 4, 5]
        }
    }

    componentDidMount = () => {
        var tabBarVisible = true;
        if (typeof this.props.route.state == route.DAYSWORKOUTVIDEOS) {
            const { routes } = route.state;
            if (routes.length > 1) {
                tabBarVisible = false;
            }
        }
        this.props.navigation.setOptions({ tabBarVisible });
    }

    _renderItems = (item, index) => {
        return (
            <ImageBackground resizeMode={"contain"} source={require('../../assets/images/push.jpg')} style={styles.imageStyle}>
                <View >
                    <Text style={styles.headingText}>Push Up's</Text>
                    <Text style={styles.headingText2}>30S <Text style={styles.timeText}>Total Time</Text> </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Icon.AntDesign onPress={() => this.props.navigation.navigate(route.DAYSWORKOUTVIDEOPLAYER)} name='play' size={50} color={themeStyle.BAR_COLOR} />
                </View>
                <View style={styles.rowContentContainer} >
                    <Text style={styles.headingText2}>00:25</Text>
                    {/* <Icon.SimpleLineIcons name='social-youtube' size={30} /> */}
                    <Youtube fill={'#000000'} />
                </View>
            </ImageBackground>
        )
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                <View style={styles.container}>
                    {/* <View style={styles.row}>
                        {
                            this.state.array.map((item, index) => {
                                return (
                                    <Icon.AntDesign name="minus" size={21} color={
                                        index == 0 ?
                                            themeStyle.DASH_DARK
                                            :
                                            themeStyle.DASH_LIGHT
                                    } />
                                )
                            })
                        }
                    </View> */}

                    <ScrollView>
                        <View>
                            <FlatList data={this.state.data}
                                ItemSeparatorComponent={(VerticalSpacer)}
                                renderItem={({ item, index }) => this._renderItems(item, index)} />
                        </View>
                    </ScrollView>

                </View>
            </Container>
        )
    }
}
