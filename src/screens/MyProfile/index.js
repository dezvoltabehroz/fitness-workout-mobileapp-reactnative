import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button, Container, UploadingModal } from '../../components';
import Workout from '../../assets/svg/DOB1.svg'
import Height from '../../assets/svg/Height1.svg'
import Weight from '../../assets/svg/Weight.svg'
import AddProfile from '../../assets/svg/AddProfile.svg'
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import styles from './style';
import { Avatar } from 'react-native-elements';
import themeStyle from '../../assets/styles/theme.style';
import { connect } from 'react-redux';
import moment from 'moment';
import { route } from '../../lib/utils/constants';
import { AuthServices, ProfileServices } from '../../services';
import { ScrollView } from 'react-native-gesture-handler';
class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: ""
        }
    }

    chooseFile = () => {
        var options = {
            title: 'Select Profile Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
            } else {
                this.setState({ uploading: true, avatar: response.assets[0].uri });
                let source = response;
                let formData = new FormData();
                formData.append('user_id', this.props.user.userData.user_id);
                formData.append('image', {
                    uri: response.assets[0].uri,
                    name: `${new Date().getTime().toString()}.jpg`,
                    filename: new Date().getTime().toString() + '.jpg',
                    type: 'image/jpg'
                });
                ProfileServices.uploadProfilePicture(formData, this.props.user.userData.token)
                    .then((response) => {
                        if (response.data.success) {
                            this.setState({ uploading: false });
                            this.props.authActions.getUserProfile({ user_id: this.props.user.userData.user_id, token: this.props.user.userData.token })
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
        const { full_name, email, dob, height_feet, height_inches, weight, profile_pic } = this.props.user.userData;
        return (
            <Container>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ paddingBottom: "10%" }}>
                        <View style={styles.itemContainer}>
                            <View style={styles.avatarContainer}>
                                <Avatar
                                    source={this.state.avatar ? { uri: this.state.avatar } : profile_pic ? { uri: profile_pic } : { uri: 'https://icon2.cleanpng.com/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg' }}
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
                                <Height />
                                <View style={styles.itemStyle}>
                                    <Text style={styles.text}>Height</Text>
                                    <Text style={styles.colortext}>{height_feet ? height_feet : "0"} FT {height_inches ? height_inches : "0"} IN</Text>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <Weight />
                                <View style={styles.itemStyle}>
                                    <Text style={styles.text}>Weight</Text>
                                    <Text style={styles.colortext}>{weight}</Text>
                                </View>
                            </View>
                        </View>
                        {
                            this.props.user.isUserLogedIn && this.props.user.userData.email ?
                                <View style={{ marginTop: "5%", marginHorizontal: "10%" }}>
                                    <Button title={"Change Password"} onPress={() => { this.props.navigation.navigate(route.CHANGEPASSWORD) }} />
                                </View>
                                :
                                null

                        }
                    </ScrollView>
                </View>
                <UploadingModal visible={this.state.uploading} />
            </Container>
        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
const mapDispatchToProps = dispatch => { return { authActions: bindActionCreators(authActions, dispatch) }; };
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);