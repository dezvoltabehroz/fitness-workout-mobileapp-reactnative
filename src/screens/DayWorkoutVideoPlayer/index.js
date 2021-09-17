
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import
MediaControls, { PLAYER_STATES }
    from 'react-native-media-controls';

import { CompletedModal, CompleteModal, Container, Icon, QuitModal } from '../../components';
import Volume from '../../assets/svg/audio'

import styles from './style'
import themeStyle from '../../assets/styles/theme.style';
import { ProfileServices } from '../../services';
import moment from 'moment';
import { connect } from 'react-redux';

class DayWorkoutVideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
            volume: 10,
            quitModal: false,
            completeModal: false,
            isFullScreen: false,
            mute: false,
            isLoading: true,
            paused: false,
            completedModal: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'cotain',
            desc: [1, 2, 3, 4, 5],
            feedback: ""
        }
        this.videoPlayer = null
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerRight: () => this.headerRight(),
            headerLeft: () => this.headerLeft(),
            tabBarVisible: false
        });
    }

    headerRight = () => {
        return (
            <TouchableOpacity onPress={() => this.setState({ mute: !this.state.mute }, () => this.componentDidMount())
            } style={{ marginRight: 20 }} >
                {
                    this.state.mute ?
                        <Icon.Ionicons name="volume-off" size={25} color="#797B7B" />
                        :
                        <Icon.Ionicons name="volume-high" size={25} color="#797B7B" />
                }
            </TouchableOpacity >
        )
    }

    headerLeft = () => {
        return (
            <TouchableOpacity onPress={() => { this.setState({ paused: !this.state.paused, playerState: this.state.playerState, quitModal: true }) }
            } style={{ marginLeft: 20 }} >
                <Icon.AntDesign name="close" size={25} color="#797B7B" />
            </TouchableOpacity >
        )
    }



    onSeek = (seek) => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
    };

    onPaused = (playerState) => {
        //Handler for Video Pause
        this.setState({ paused: !this.state.paused, playerState: this.state.playerState });

    };

    onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });

        this.videoPlayer.seek(0);
    };

    onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!this.state.isLoading && this.state.playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };

    onLoad = (data) => {
        this.setState({ duration: data.duration, isLoading: false });
    };

    onLoadStart = (data) => this.setState({ isLoading: true });

    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED, completeModal: true });

    onError = () => alert('Oh! ', error);

    exitFullScreen = () => {
        alert('Exit full screen');
    };

    enterFullScreen = () => { };

    onFullScreen = () => {
        this.setState({ isFullScreen: !this.state.isFullScreen });
        if (this.state.screenType == 'content') this.setState({ screenType: 'cover' });
        else this.setState({ screenType: 'content' });
    };

    renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );

    onSeeking = (currentTime) => this.setState({ currentTime });

    handleUpdateDailyWorkout = (index) => {
        this.setState({ completedModal: false, })
        this.props.navigation.goBack()
        const { feedback } = this.state;
        // const { user_id, token, fitness_goal, fitness_level, fitness_equipment } = this.props.user.userData;
        // if (this.props.route.params.dayCompleted) {

        //     let data = {
        //         "workout_date":moment().format('YYYY-MM-DD'),
        //         "workout_week":this.props.route.params.workout_week,
        //         "workout_day":moment().format('dddd'),
        //         "feedback":feedback,
        //         "workout_user_id":this.props.route.params.data.workout_plan_id
        //     }
        //     ProfileServices.updateDailyWorkout(data, token)
        //         .then((response) => {
        //             if (response.data.success) {
        //                 this.setState({ videos: response.data.data, loading: false })
        //             }
        //         })
        //         .catch((err) => { console.log(err.response); this.setState({ videos: [], loading: false }) })
        // }

    }

    render() {
        const { video_path, video_title, video_description } = this.props?.route?.params?.data;
        return (
            <Container>
                <View style={styles.container}>
                    <View style={this.state.isFullScreen ? styles.mediaPlayer1 : styles.mediaPlayer}>
                        <Video
                            onEnd={this.onEnd}
                            onLoad={this.onLoad}
                            onLoadStart={this.onLoadStart}
                            onProgress={this.onProgress}
                            useNativeControls={true}
                            paused={this.state.paused}
                            ref={(e) => this.videoPlayer = e}
                            resizeMode={this.state.screenType}
                            onFullScreen={this.state.isFullScreen}
                            source={{
                                uri: video_path,
                            }}
                            style={this.state.isFullScreen ? styles.videoContainer1 : styles.videoContainer}
                            volume={this.state.volume}
                            muted={this.state.mute}
                        />
                        <MediaControls
                            duration={this.state.duration}
                            isLoading={this.state.isLoading}
                            mainColor="#333"
                            onFullScreen={this.onFullScreen}
                            sliderStyle={{
                                //     containerStyle:{
                                //     backgroundColor:themeStyle.BAR_COLOR
                                // },
                                trackStyle: {
                                    backgroundColor: themeStyle.BAR_COLOR,

                                }
                            }}
                            onPaused={this.onPaused}
                            onReplay={this.onReplay}
                            onSeek={this.onSeek}
                            onSeeking={this.onSeeking}
                            playerState={this.state.playerState}
                            progress={this.state.currentTime}
                            toolbar={this.renderToolbar()}
                        />
                    </View>

                    {!this.state.isFullScreen ?
                        <View style={styles.lowerContainer}>
                            <Text style={styles.headingStyle}>{video_title}</Text>
                            {
                                this.state.desc.map((item, index) => {
                                    return (
                                        <View style={styles.rowContainer}>
                                            <Icon.Octicons name="primitive-dot" size={20} color={'lightgray'} />
                                            <Text style={styles.textStyle} >{video_description}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        : null}
                </View>
                <QuitModal visible={this.state.quitModal}
                    onQuit={() => { this.videoPlayer.seek(0); this.props.navigation.goBack() }}
                    onResume={() => { this.setState({ quitModal: false, paused: !this.state.paused, playerState: this.state.playerState }) }}
                    onRestart={() => { this.setState({ quitModal: false, playerState: PLAYER_STATES.PLAYING }, () => this.videoPlayer.seek(0)) }}
                />
                <CompleteModal visible={this.state.completeModal}
                    onReplay={() => this.setState({ completeModal: false, playerState: PLAYER_STATES.PLAYING }, () => this.videoPlayer.seek(0))}
                    onComplete={() => {
                        this.setState({ completeModal: false, }, () => setTimeout(() => {
                            this.setState({ completedModal: true, })
                        }, 350));
                    }} />
                <CompletedModal visible={this.state.completedModal}
                    onSelect={(value) => this.setState({ feedback: value }, () => this.handleUpdateDailyWorkout())}
                    onComplete={() => this.setState({ completedModal: false })} />
            </Container >
        )
    }
}

const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(DayWorkoutVideoPlayer);