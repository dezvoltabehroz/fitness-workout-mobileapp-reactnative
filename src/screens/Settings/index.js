import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity,ActivityIndicator } from "react-native";

import { Container } from "../../components";
import Profile from '../../assets/svg/Profile.svg'
import Workout from '../../assets/svg/workout-setting.svg'
import Edit from '../../assets/svg/edit-plan.svg';
import Help from '../../assets/svg/Help.svg'
import Email from '../../assets/svg/email.svg'
import Terms from '../../assets/svg/term-of-Service.svg'
import Policy from '../../assets/svg/policy.svg'
import Developer from '../../assets/svg/Developers.svg'
import Logout from '../../assets/svg/Logout.svg'

import styles from './style'
import { route } from "../../lib/utils/constants";
import { authActions } from "../../redux/actions/auth";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Login from "../Login";
import { ProfileServices } from "../../services";
import { getLocalData, LOCAL_STORAGE_KEYS } from "../../lib/utils/localstorage";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            loading: true,
        }
    }

    componentDidMount = () => {
        this.handleIsEmailExist()
    }

    handleIsEmailExist = async () => {
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
        let data = {
            "user_id": user_id
        }
        ProfileServices.isEmailExist(data, JSON.parse(userToken))
            .then((res) => {
                if (res.data.success) {
                    if (res.data.data[0].email) {
                        this.setState({ loading: false, modal: false, email: res.data.data[0].email })
                    } else {
                        this.setState({ loading: false, modal: true })
                    }
                }
            })
            .catch((error) => console.log(error.response))
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                {
                    this.state.loading ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={'#44BDE8'} />
                        </View>
                        :
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>


                            <View style={styles.upperContainer}>
                                <Text style={styles.heading} >Account</Text>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.email) {
                                        navigation.navigate(route.PROFILE)
                                    }
                                    else {
                                        navigation.navigate(route.COMPLETEPROFILE)
                                    }
                                }} style={styles.rowContainer}>
                                    <Profile />
                                    <View style={styles.itemContainer}>
                                        <Text style={styles.text}>My Profile</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.rowContainer}>
                                    <Workout />
                                    <TouchableOpacity onPress={() => navigation.navigate(route.FITNESSGOAL)} style={styles.itemContainer}>
                                        <Text style={styles.text}>Workout Settings</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate(route.PAYMENTMETHOD)} style={styles.rowContainer}>
                                    <Edit />
                                    <View style={styles.itemContainer}>
                                        <Text style={styles.text}>Edit Plan</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.upperContainer}>
                                <Text style={styles.heading} >Others</Text>
                                <View style={styles.rowContainer}>
                                    <Help />
                                    <View style={styles.itemContainer}>
                                        <Text style={styles.text}>Help Center</Text>
                                    </View>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Email />
                                    <View style={styles.itemContainer}>
                                        <Text style={styles.text}>Email Us</Text>
                                    </View>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Terms />
                                    <View style={styles.itemContainer}>
                                        <Text style={styles.text}>Terms Of Service</Text>
                                    </View>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Policy />
                                    <View style={styles.itemContainer}>
                                        <Text style={styles.text}>Privacy policy</Text>
                                    </View>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Developer />
                                    <View style={styles.itemContainer}>
                                        <Text style={styles.text}>About Developers</Text>
                                    </View>
                                </View>
                                {
                                    this.state.email ?
                                        <TouchableOpacity onPress={() => this.props.authActions.removeUser(this.props.navigation.replace)} style={styles.rowContainer}>
                                            <Logout />
                                            <View style={styles.itemContainer}>
                                                <Text style={styles.text}>Logout</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate(route.LOGIN)} style={styles.rowContainer}>
                                            <Logout />
                                            <View style={styles.itemContainer}>
                                                <Text style={styles.text}>Login</Text>
                                            </View>
                                        </TouchableOpacity>}

                            </View>
                        </ScrollView>
                }
            </Container>
        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch)

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);