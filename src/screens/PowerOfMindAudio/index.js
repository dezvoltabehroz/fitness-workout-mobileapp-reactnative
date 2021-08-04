import React, { Component } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import Sound from 'react-native-sound';
import SoundCloudWaveform from 'react-native-soundcloud-waveform';

import { Container, Icon } from "../../components";

import themeStyle from "../../assets/styles/theme.style";
import styles from './style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../lib/utils/constants";

let data = 0;
class PowerOfMindAudio extends Component {
    constructor(props) {
        super(props);
        this.url = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3';
        this.state = {
            playAudio: true,
            paused: true,
            progress: 0,
            duration: 0,
            isLoading: true,

        };
        this.sound = new Sound('https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3', '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            } else {
                console.log(this.sound.getDuration());
            }
        });
    }

    componentWillUnmount() {
        this.sound.stop()
        this.url = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3'
        this.sound = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3'
        this.setState({
            playAudio: true,
            paused: true,
            progress: 0,
            duration: 0,
            isLoading: true,

        })
    }

    changestate = () => {
        this.setState({ playAudio: !this.state.playAudio });
        if (!this.state.playAudio) {
            this.sound.stop()
        } else {
            this.sound.play((success) => {
                if (success) {
                    this.setState({
                        progress: 0,
                        playAudio: true
                    })
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            })
            setTimeout(() => this.getProgress(), 1000)
        }
    }

    getProgress = () => {

        if (this.sound != null) {
            // console.log("Sound Progress: ", this.state.progress)
            if (this.sound.isPlaying()) {
                this.sound.getCurrentTime((seconds) => {
                    this.setState({
                        duration: seconds,
                        progress: this.sound.getDuration() - seconds
                    })
                })
                setTimeout(() => this.getProgress(), 500)
            }
        }
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={{ backgroundColor: themeStyle.BAR_COLOR, height: SCREEN_HEIGHT * 0.1 }}>

                    </View>
                    <Image source={require('../../assets/images/rob.jpg')} style={styles.imageStyle} />

                    <View style={styles.rowContainer}>
                        <View style={styles.timerContainer} >
                            <Text>{this.state.duration}</Text>
                        </View>
                        <SoundCloudWaveform
                            waveformUrl={"https://w1.sndcdn.com/PP3Eb34ToNki_m.png"}
                            percentPlayed={this.state.progress}
                            setTime={(time) => {

                            }}
                            active={themeStyle.BAR_COLOR}
                            activeInverse={themeStyle.BAR_COLOR}
                            inactive={'lightgray'}
                            inactiveInverse={'lightgray'}
                            height={55}
                            width={SCREEN_WIDTH * 0.8}
                        />
                        <View style={styles.timerContainer} >
                            <Text>{this.state.progress}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.changestate} style={{ alignItems: 'center', marginTop: '5%' }}>
                        {
                            this.state.playAudio ?
                                <Icon.AntDesign name={'play'} size={80} color={themeStyle.BAR_COLOR} />
                                :
                                <Icon.AntDesign name={'pausecircle'} size={80} color={themeStyle.BAR_COLOR} />
                        }
                    </TouchableOpacity>
                </View>

            </Container>
        )
    }
}
export default PowerOfMindAudio;