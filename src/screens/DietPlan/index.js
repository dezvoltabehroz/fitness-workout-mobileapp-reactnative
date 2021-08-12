import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import { Container, Button } from '../../components';
import { route, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
import styles from './style';

class DietPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    chooseFile = () => {
        var options = {
            title: 'Select Avatar',
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, response => {
            if (response.didCancel) {
            } else {
                let source = response;
                console.log(source.assets[0].uri)
                this.setState({
                    avatar: source.assets[0].uri,
                    profile_Url: response
                });
            }
        });
    };

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <ImageBackground
                        style={styles.imageContainer}
                        source={require('../../assets/images/rob.jpg')}>


                        <Text style={styles.heading}>Keep track of your Progress</Text>
                        <Text style={styles.desc}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="TAKE FIRST PIC" onPress={this.chooseFile} />
                        </View>
                    </ImageBackground>

                </View>
            </Container>

        )
    }
}

export default DietPlan;