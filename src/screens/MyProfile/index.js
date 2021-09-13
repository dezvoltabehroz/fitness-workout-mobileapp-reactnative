import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button, Container } from '../../components';
import Workout from '../../assets/svg/workout-setting.svg'
import AddProfile from '../../assets/svg/AddProfile.svg'

import styles from './style';
import { Avatar } from 'react-native-elements';
import themeStyle from '../../assets/styles/theme.style';
import { connect } from 'react-redux';
import moment from 'moment';
import { route } from '../../lib/utils/constants';

class MyProfile extends Component {
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
                this.setState({
                    avatar: source.assets[0].uri,
                    profile_Url: response
                });
            }
        });
    };

    render() {
        const { full_name, email, dob, height_feet, height_inches, weight } = this.props.user.userData;
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
                            <Text style={styles.heading}>{full_name ? full_name : "Full Name"}</Text>
                            <Text style={styles.graytext}>{email ? email : "Email"}</Text>
                        </View>

                        <Text style={styles.heading} >My Account</Text>
                        <View style={styles.rowContainer}>
                            <Workout />
                            <View style={styles.itemStyle}>
                                <Text style={styles.text}>Date of Birth</Text>
                                <Text style={styles.colortext}>{dob ? moment(dob).format('YYYY-MM-DD') : "Full Name"}</Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <Workout />
                            <View style={styles.itemStyle}>
                                <Text style={styles.text}>Height</Text>
                                <Text style={styles.colortext}>{height_feet ? height_feet : "0"} FT {height_inches ? height_inches : "0"} IN</Text>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <Workout />
                            <View style={styles.itemStyle}>
                                <Text style={styles.text}>Weight</Text>
                                <Text style={styles.colortext}>{weight}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        this.props.user.isUserLogedIn ?
                            <View style={{ marginTop: "5%", marginHorizontal: "10%" }}>
                                <Button title={"Change Password"} onPress={() => { this.props.navigation.navigate(route.CHANGEPASSWORD) }} />
                            </View>
                            :
                            null

                    }

                </View>

            </Container>
        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };

export default connect(mapStateToProps)(MyProfile);