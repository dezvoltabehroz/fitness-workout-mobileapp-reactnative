import React, { Component } from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import { Container } from "../../components";
import Style from "./style";
import { connect } from "react-redux";
import { WebView } from "react-native-webview";

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUri: '',
            data: null
        }
    }

    componentDidMount = async () => {
        const videoUri = await this.props.route.params.uri;
        console.log("videoUri:", videoUri)
        if (videoUri.startsWith('https')) {
            this.setState({ videoUri });
        }
        else {
            this.setState({ data: videoUri });
        }
    }

    render() {
        const { videoUri, data } = this.state;

        return (
            <Container>
                <View style={Style.mainContainer}>
                    {videoUri != '' && videoUri ?
                        <View style={Style.videoContainer}>
                            <WebView
                                style={{ marginTop: (Platform.OS == 'ios') ? 20 : 0, borderRadius: 5 }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: videoUri }}
                                allowFileAccess={true}
                            />
                            {/* <Video
                                            source={TestVideo}
                                            // source={{ uri: "https://dev1.youcricketer.com/api/videos/1581940780_d00daf6e-5337-4b02-ada2-f9c2bfee34de.mp4" }}
                                            resizeMode='cover'
                                            paused={false}
                                            style={StyleSheet.absoluteFill} /> */}
                        </View>
                        :
                        <View style={Style.videoContainer}>
                            <WebView
                                style={{ marginTop: (Platform.OS == 'ios') ? 20 : 0, borderRadius: 5 }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                allowFileAccess={true}
                                source={{ uri: data }}
                                allowUniversalAccessFromFileURLs={true}
                                allowFileAccessFromFileURLs={true}
                            />

                            {/* <Video
                                            source={TestVideo}
                                            // source={{ uri: "https://dev1.youcricketer.com/api/videos/1581940780_d00daf6e-5337-4b02-ada2-f9c2bfee34de.mp4" }}
                                            resizeMode='cover'
                                            paused={false}
                                            style={StyleSheet.absoluteFill} /> */}
                        </View>}
                </View>
            </Container >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(Video);