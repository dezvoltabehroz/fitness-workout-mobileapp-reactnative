import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import { Container, Button, UploadingModal } from '../../components';
import { route, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';
import { ProfileServices } from '../../services';
import styles from './style';

class DietPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false
        }
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
                            this.props.navigation.navigate(route.PROGRESSPICS)
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
                <UploadingModal visible={this.state.uploading} />
            </Container>

        )
    }
}

export default DietPlan;