import React, { Component } from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Container } from '../../components';

import styles from './style';

export default class ProgressPics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                image: require('../../assets/images/crossover.jpg'),
                date: '08 Jun, 2021'
            },
            {
                image: require('../../assets/images/work.jpg'),
                date: '08 Jun, 2021'
            },
            {
                image: require('../../assets/images/Gym.jpg'),
                date: '08 Jun, 2021'
            },
            {
                image: require('../../assets/images/motivation.jpg'),
                date: '08 Jun, 2021'
            },
            {
                image: require('../../assets/images/rob.jpg'),
                date: '08 Jun, 2021'
            }]
        }
    }

    _renderItem = (item, index) => {
        return (
            <ImageBackground source={item.image} style={styles.imageStyle} >
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
            </ImageBackground>
        )
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
        launchCamera(options, (response) => {
            if (response.didCancel) {
            } else {
                let source = response;
                this.setState({
                    avatar: Platform.OS == 'ios' ? source : source.assets[0].uri,
                    profile_Url: response
                });
            }
        });
    };

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <FlatList data={this.state.data} renderItem={({ item, index }) => this._renderItem(item, index)} />
                    <TouchableOpacity onPress={this.chooseFile} style={styles.buttonContainer}>
                        <Text style={styles.btnText}>TAKE PIC</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }

}