import React, { Component } from "react";
import { Image, View, Text, TouchableOpacity, ScrollView } from "react-native";
import Sound from 'react-native-sound';
import SoundCloudWaveform from 'react-native-soundcloud-waveform';

import { Container, Icon } from "../../components";

import Play from '../../assets/svg/Play-btn.svg'
import Pause from '../../assets/svg/Pause.svg'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../lib/utils/constants";

import themeStyle from "../../assets/styles/theme.style";
import styles from './style';

let data = 0;
class PowerOfMindAudio extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.route?.params?.data?.media_path;
        this.state = {
            playAudio: true,
            paused: true,
            progress: 0,
            duration: 0,
            isLoading: true,

        };
       
    }

    componentDidMount=()=>{
        console.log(this.props.route?.params?.data?.media_path)
        this.sound = new Sound(this.props.route?.params?.data?.media_path, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            } else {
                console.log(this.sound.getDuration());
            }
        });
    }

    componentWillUnmount() {
        
        this.sound.stop()
        this.url = this.props.route?.params?.data?.media_path
        this.sound = this.props.route?.params?.data?.media_path
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
                    <ScrollView contentContainerStyle={{ paddingBottom: "15%" }}>
                        <View style={styles.boxView}>
                            <Text> </Text>
                        </View>
                        <Image resizeMode="contain" source={{ uri: this.props.route?.params?.data?.media_thumbnail }} style={styles.imageStyle} />
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle1}>Weight Loss</Text>
                            <Text style={styles.textStyle}>{this.props.route?.params?.data?.media_title}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.timerContainer} >
                                {/* <Text>{this.state.progress}</Text> */}
                            </View>
                            <SoundCloudWaveform
                                waveformUrl={"https://w1.sndcdn.com/PP3Eb34ToNki_m.png"}
                                percentPlayed={this.state.progress}
                                setTime={(time) => { }}
                                active={themeStyle.BAR_COLOR}
                                activeInverse={themeStyle.BAR_COLOR}
                                inactive={'lightgray'}
                                inactiveInverse={'lightgray'}
                                height={55}
                                width={SCREEN_WIDTH * 0.8}
                            />
                            <View style={styles.timerContainer} >
                                {/* <Text>{this.state.duration}</Text> */}
                            </View>
                        </View>
                        <TouchableOpacity onPress={this.changestate} style={styles.buttonContainer}>
                            {
                                this.state.playAudio ?
                                    <Play />
                                    :
                                    <Pause />
                            }
                        </TouchableOpacity>
                    </ScrollView>
                </View>

            </Container>
        )
    }
}
export default PowerOfMindAudio;