import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Container } from '../../components';
import Workout from '../../assets/svg/workout-setting.svg'
import AddProfile from '../../assets/svg/AddProfile.svg'

import styles from './style';
import { Avatar } from 'react-native-elements';
import themeStyle from '../../assets/styles/theme.style';

export default class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: ""
        }
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
        launchImageLibrary(options, response => {
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
                    <View style={styles.itemContainer}>
                        <View style={styles.avatarContainer}>
                            <Avatar
                                source={this.state.avatar ? { uri: this.state.avatar } : { uri: 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg' }}
                                rounded
                                size={120}>
                                <Avatar.Accessory onPress={this.chooseFile} size={30}
                                    style={{ backgroundColor: themeStyle.BAR_COLOR, }} >
                                    <AddProfile fill={themeStyle.BAR_COLOR} />
                                </Avatar.Accessory>
                            </Avatar>

                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.heading}>John Doe</Text>
                            <Text style={styles.graytext}>johndoe@gmail.com</Text>
                        </View>

                        <Text style={styles.heading} >My Account</Text>
                        <View style={styles.rowContainer}>
                            <Workout />
                            <View style={styles.itemStyle}>
                                <Text style={styles.text}>Date of Birth</Text>
                                <Text style={styles.colortext}>1996-15-07</Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <Workout />
                            <View style={styles.itemStyle}>
                                <Text style={styles.text}>Height</Text>
                                <Text style={styles.colortext}>4 FT 4 IN</Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <Workout />
                            <View style={styles.itemStyle}>
                                <Text style={styles.text}>Weight</Text>
                                <Text style={styles.colortext}>65.5</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </Container>
        )
    }
}