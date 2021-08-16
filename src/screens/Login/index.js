import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Container } from '../../components';

import OutLine from '../../assets/svg/out-line.svg';
import Apple from '../../assets/svg/apple (1).svg';
import Facebook from '../../assets/svg/facebook.svg';
import Gmail from '../../assets/svg/gmail.svg';
import Google from '../../assets/svg/google.svg';

import styles from './style'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.outLineContainer}>

                        <OutLine />
                        <Text style={styles.heading}>Log In</Text>
                    </View>
                    <View style={{ flex: 0.8, marginTop: "10%" }}>
                        <TouchableOpacity style={styles.whiteBtnContainer}>
                            <View style={styles.alignItems}>
                                <Google />
                            </View>
                            <View style={styles.flex}>
                                <Text style={styles.blackText}>Continue with Google</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.facebookBtnContainer}>
                            <View style={styles.alignItems}>
                                <Facebook />
                            </View>
                            <View style={styles.flex}>
                                <Text style={styles.whiteText}>Continue with Facebook</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.appleBtnContainer}>
                            <View style={styles.alignItems}>
                                <Apple />
                            </View>
                            <View style={styles.flex}>
                                <Text style={styles.whiteText}>Continue with Apple</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.whiteBtnContainer}>
                            <View style={styles.alignItems}>
                                <Gmail />
                            </View>
                            <View style={styles.flex}>
                                <Text style={styles.blackText}>Continue with gmail</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        )
    }

}