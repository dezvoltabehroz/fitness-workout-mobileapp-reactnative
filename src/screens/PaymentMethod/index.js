
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { initStripe, useStripe, CardField, createToken } from '@stripe/stripe-react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Button, ColorButton, Container, Icon, Input } from '../../components';
import Run from '../../assets/svg/run.svg'
import { route, SCREEN_WIDTH } from '../../lib/utils/constants';

import styles from './style';
import { isEmailValid } from '../../lib/utils/global';
import themeStyle from '../../assets/styles/common.style';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';
import { AuthServices, ProfileServices } from '../../services';

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        initStripe({
            publishableKey: 'pk_test_51IVaauJYCYbx3gzyXHFSWqkzjQourDKiOCqDybwCgC1DxjXf7ilt5jEeyoHDJWo9SkdD6uIGasM9SomiSTl2HRPQ002trNTCop'
        });
        this.state = {
            modal: false,
            emailModal: false,
            submit: false,
            btnLoading: false,
            loading: false,
            email: "",
            cardDetails: {}
        }
    }

    componentDidMount = async () => {
        this.setState({ loading: true })
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
        let data = {
            "user_id": user_id
        }
        ProfileServices.isEmailExist(data, JSON.parse(userToken))
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.data[0].email)
                    if (res.data.data[0].email) {
                        this.setState({ loading: false, emailModal: false, email: res.data.data[0].email })
                    } else {
                        this.setState({ loading: false, emailModal: true })
                    }
                }
            })
            .catch((error) => console.log(error.response))
    }

    handleEmail = (email) => {
        if (isEmailValid(email)) {
            this.setState({ email: email, submit: false })
        } else {
            this.setState({ email: email, submit: true })
        }
    }

    updateUserEmail = async () => {
        this.setState({ btnLoading: true })
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
        let data = {
            "email": this.state.email,
            "user_id": user_id
        }
        console.log(data)
        ProfileServices.updateUserEmail(data, JSON.parse(userToken))
            .then((res) => {
                console.log(res.data)
                this.setState({ btnLoading: false, emailModal: false })
            })
            .catch((error) => console.log(error.response))
    }

    handleStripeCheckout = async () => {
        console.log(this.state.cardDetails)
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
        const { token, error } = await createToken({
            type: "Card",
            currency: "USD"
        });
        if (token) {

            let data = {
                "name": "Subscription for Pro",
                "price": "500",
                "token": {
                    "id": token.id,
                    "email": "behrozahmed@outlook.com"//this.state.email
                }
            }
            console.log(data)
            ProfileServices.stripeCheckOut(data, JSON.parse(userToken))
                .then((res) => {
                    console.log(res.data)
                    this.setState({ btnLoading: false, modal: true })
                })
                .catch((error) => console.log(error.response))
        } else {
            console.log("Error : ", error)
            this.setState({ btnLoading: false, })
        }

    }

    render() {
        const { cardDetails, email, submit, btnLoading, loading } = this.state;
        return (
            <Container>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={'#44BDE8'} />
                        </View>
                        :
                        <View style={styles.container}>
                            <View style={{ flex: 0.4, alignItems: "center" }}>
                                <Image resizeMode={"contain"} source={require('../../assets/images/download.jpg')} style={{ justifyContent: "center", height: 200, width: SCREEN_WIDTH * 0.8 }} />
                            </View>

                            <View style={{ marginTop: "10%", borderWidth: 0.5, marginHorizontal: 20, }}>
                                <CardField
                                    postalCodeEnabled={false}
                                    placeholder={{
                                        number: 'Enter Card Number', expiration: "Exp.Date", cvc: "CVC"
                                    }}
                                    cardStyle={{
                                        backgroundColor: '#FFFFFF',
                                        textColor: '#000000',
                                    }}
                                    style={{
                                        // width: '100%',
                                        height: 50,
                                    }}
                                    onCardChange={(e) => {
                                        this.setState({ cardDetails: e })
                                    }}
                                    onFocus={(focusedField) => {
                                        console.log('focusField', focusedField);
                                    }}
                                />
                            </View>
                            <View style={{ flex: 0.5, justifyContent: "flex-end", marginHorizontal: "10%" }}>
                                {
                                    this.props.user.userData.is_pro == 0 ?
                                        <Button loading={btnLoading} title={'PAY NOW'} onPress={() => this.setState({ btnLoading: true }, () => this.handleStripeCheckout())} />
                                        :
                                        <ColorButton title={'CANCEL SUBSCRIPTION'} />
                                }

                            </View>
                        </View>}
                <Modal isVisible={this.state.modal}>
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop: "5%", alignItems: "center" }}>
                            <Run />
                            <Text style={styles.headingText}>Complete Profile</Text>
                            <Text style={styles.textStyle}>Lorem ipsum dolor</Text>
                        </View>

                        <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                            <Button title={'Continue'} onPress={() => this.setState({ modal: false, }, () => this.props.navigation.navigate(route.COMPLETEPROFILE))} />
                        </View>
                    </View>

                </Modal>
                <Modal isVisible={this.state.emailModal}>
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop: "5%", }}>
                            <View style={{ alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={() => this.setState({ emailModal: false, })}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                            </View>
                            <Text style={styles.headingText}>Enter Your Email</Text>
                            <View style={{ marginTop: "10%", }}>
                                <Input editable={!btnLoading} bottomMargin={true} value={email} placeholder="" onChangeText={(email) => this.handleEmail(email)} />
                                {
                                    submit && !email ? <Text style={[themeStyle.errorText,]}>Please fill this field</Text> : null
                                }
                                {
                                    submit && email.length && !isEmailValid(email) ? <Text style={[themeStyle.errorText,]}>Email is invalid</Text> : null
                                }
                            </View>

                        </View>

                        <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                            <Button loading={btnLoading} disabled={email && !submit ? false : true} title={'Continue'} onPress={() => this.updateUserEmail()} />
                        </View>
                    </View>

                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(PaymentMethod);