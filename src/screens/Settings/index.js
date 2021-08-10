import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

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

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>


                    <View style={styles.upperContainer}>
                        <Text style={styles.heading} >Account</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(route.PROFILE)} style={styles.rowContainer}>
                            <Profile />
                            <View style={styles.itemContainer}>
                                <Text style={styles.text}>My Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.rowContainer}>
                            <Workout />
                            <View style={styles.itemContainer}>
                                <Text style={styles.text}>Workout Settings</Text>
                            </View>
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
                        <View style={styles.rowContainer}>
                            <Logout />
                            <View style={styles.itemContainer}>
                                <Text style={styles.text}>Logout</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}