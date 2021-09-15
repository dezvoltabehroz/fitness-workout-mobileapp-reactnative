import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import themeStyle from '../../assets/styles/theme.style';
import { Container, HorizontalList } from '../../components';
import { route } from '../../lib/utils/constants';
import { VerticalSpacer } from '../../lib/utils/global';
import { PlanServices } from '../../services';
import styles from './style';

class PowerOfMind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: "Audio title",
                    rating: 1
                },
                {
                    title: "Audio title",
                    rating: 1
                },
                {
                    title: "Body Fitness",
                    rating: 1
                },
                {
                    title: "Body Warmups",
                    rating: 1
                }
            ],
            mindBodyAudio: [],
            mindBodyVideo:[],
            laoding: true
        }
    }

    componentDidMount = () => {
        const { user_id, token } = this.props.user.userData;
        let data = { category: "mind body" }
        PlanServices.getFreeVideos(data, token)
            .then((res) => {
                this.setState({ mindBodyAudio: res.data.data.audio, mindBodyVideo: res.data.data.video, laoding: false })
            })
            .catch((err) => { console.log(err.response) })
    }

    _renderMenuItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate(route.POWEROFMINDAUDIO) }} style={styles.itemContainer} >
                <ImageBackground source={require('../../assets/images/you.png')} style={styles.contentContainer1}>
                    <View style={styles.opacity}>

                    </View>
                </ImageBackground>
                <View style={styles.textContainer}>
                    <Text style={styles.greyText}>{'5min'}</Text>
                    <Text style={styles.headingText}>{item.title}</Text>
                </View>

            </TouchableOpacity >
        )
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    {
                        this.state.laoding ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator size={'small'} color={themeStyle.BAR_COLOR} />
                            </View>
                            :
                            <ScrollView>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.headingText}>Videos</Text>
                                </View>
                                <HorizontalList data={this.state.mindBodyVideo} video />
                                <View style={styles.headingContainer}>
                                    <Text style={styles.headingText}>Audios</Text>
                                </View>
                                <FlatList
                                    data={this.state.mindBodyAudio.slice(0, 99)}
                                    numColumns={2}
                                    renderItem={this._renderMenuItem}
                                    contentContainerStyle={styles.contentContainer}
                                    keyExtractor={item => item.route}
                                    ItemSeparatorComponent={VerticalSpacer}
                                />
                            </ScrollView>
                    }
                </View>
            </Container>

        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(PowerOfMind);