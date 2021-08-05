
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Video from 'react-native-video';
import
MediaControls, { PLAYER_STATES }
    from 'react-native-media-controls';

import { Container } from '../../components';
import Volume from '../../assets/svg/audio'

import styles from './style'

export default class DayWorkoutVideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'cotain'
        }
        this.videoPlayer = null
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerRight: () => this.headerRight(),
        });
    }

    headerRight = () => {
        return (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {  this.videoPlayer.mute() }} ><Volume /></TouchableOpacity>
        )
    }



    onSeek = (seek) => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
    };

    onPaused = (playerState) => {
        //Handler for Video Pause
        this.setState({ paused: !this.state.paused, playerState: playerState });

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

    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

    onError = () => alert('Oh! ', error);

    exitFullScreen = () => {
        alert('Exit full screen');
    };

    enterFullScreen = () => { };

    onFullScreen = () => {
        this.setState({ isFullScreen: this.state.isFullScreen });
        if (this.state.screenType == 'content') this.setState({ screenType: 'cover' });
        else this.setState({ screenType: 'content' });
    };

    renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );

    onSeeking = (currentTime) => this.setState({ currentTime });


    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.mediaPlayer}>
                    <Video
                        onEnd={this.onEnd}
                        onLoad={this.onLoad}
                        onLoadStart={this.onLoadStart}
                        onProgress={this.onProgress}
                        paused={this.state.paused}
                        ref={(e) => this.videoPlayer = e}
                        resizeMode={this.state.screenType}
                        onFullScreen={this.state.isFullScreen}
                        source={{
                            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                        }}
                        style={styles.videoContainer}
                        volume={10}
                    />
                    <MediaControls
                        duration={this.state.duration}
                        isLoading={this.state.isLoading}
                        mainColor="#333"
                        onFullScreen={this.onFullScreen}
                        onPaused={this.onPaused}
                        onReplay={this.onReplay}
                        onSeek={this.onSeek}
                        onSeeking={this.onSeeking}
                        playerState={this.state.playerState}
                        progress={this.state.currentTime}
                        // toolbar={this.renderToolbar()}
                    />
                    </View>
                    
                </View>
            </Container>
        )
    }
}