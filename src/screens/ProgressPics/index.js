import React, { Component } from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Container, UploadingModal } from '../../components';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';
import { ProfileServices } from '../../services';

import styles from './style';

export default class ProgressPics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
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

    chooseFile = async () => {
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id);
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken);
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {
            } else {
                this.setState({ uploading: true });
                let source = response;
                console.log(response)
                let formData = new FormData();
                formData.append('user_id', JSON.parse(user_id));
                formData.append('image', {
                    uri: Platform.OS === 'android' ? response.assets[0].uri : response.uri,
                    name: `${new Date().getTime().toString()}.jpg`,
                    filename: new Date().getTime().toString() + '.jpg',
                    type: 'image/jpg'
                });
                console.log("formData : ", formData)

                ProfileServices.updateProgressPhoto1(formData, JSON.parse(userToken))
                    .then((response) => {
                        console.log(response.data)
                        if (response.data.success) {
                            this.setState({ uploading: false });
                        }
                    })
                    .catch((err) => {
                        this.setState({ uploading: false });
                        console.log(err.response)
                    })
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
                <UploadingModal visible={this.state.uploading} />
            </Container>
        )
    }

}