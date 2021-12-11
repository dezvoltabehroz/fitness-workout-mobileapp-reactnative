
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Button, ColorButton, Container, Icon, Input, UploadingModal } from '../../components';
import Run from '../../assets/svg/run.svg'
import { route, SCREEN_WIDTH } from '../../lib/utils/constants';

import styles from './style';
import { isEmailValid } from '../../lib/utils/global';
import themeStyle from '../../assets/styles/common.style';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';
import { AuthServices, ProfileServices } from '../../services';
import { authActions } from '../../redux/actions/auth';
import { bindActionCreators } from 'redux';
import WebView from 'react-native-webview';

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
            modal: false,
            emailModal: false,
            submit: false,
            btnLoading: false,
            sourceHtml: ``,
            loading: false,
            uploading: false,
            email: "",
            backLoading: false,
            cardDetails: {}
        }
    }

    componentDidMount = () => {
        const { userData } = this.props.user;
        if (this.props.route.params.cancelSubscription) {
            Alert.alert("Are you sure you want to cancel your subscription?", "", [{
                onPress: () => this.props.navigation.goBack(),
                style: "cancel",
                text: "NO"
            }, {
                text: "Yes",
                onPress: () => {
                    this.cancelSubscription();
                }
            }])
        } else {
            this.props.navigation.setOptions({ headerLeft: () => this.headerLeft() });
            this.focusListener = this.props.navigation.addListener('focus', () => { this.handleIsEmailExist(); })
            this.handleIsEmailExist();
        }


    }

    cancelSubscription = () => {
        this.setState({ uploading: true })
        const { user_id, token } = this.props.user.userData;
        ProfileServices.deactiveUser({ user_id: user_id }, token)
            .then((res) => {
                console.log(res.data)
                let data = {
                    user_id: user_id,
                    token: token
                }
                this.props.authActions.getUserProfile(data);
                setTimeout(() => {
                    this.setState({ uploading: false }, () => this.props.navigation.goBack())
                }, 3000);
            })
            .catch((err) => console.log(err.response))
    }

    headerLeft = () => {
        const { user_id, token, full_name, email } = this.props.user.userData
        const { backLoading } = this.state;
        return (
            <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                    let data = {
                        user_id: user_id,
                        token: token
                    }
                    this.setState({ backLoading: true })
                    this.props.navigation.setOptions({
                        headerLeft: () => this.headerLeft(),
                    });
                    this.props.authActions.getUserProfile(data);
                    setTimeout(() => {
                        this.setState({ backLoading: false })
                        this.props.navigation.goBack();
                    }, 3000);


                }}>
                {this.state.backLoading ? <ActivityIndicator size={"small"} color={"white"} /> : <Icon.AntDesign name={"arrowleft"} size={25} color={"white"} />}
            </TouchableOpacity>
        );
    };

    handleIsEmailExist = async () => {
        this.setState({ loading: true })
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
        let data = {
            "user_id": user_id
        }
        ProfileServices.isEmailExist(data, JSON.parse(userToken))
            .then((res) => {
                const { full_name } = this.props.user.userData;
                console.log(res.data);
                if (res.data.success) {
                    if (res.data.data[0].email) {
                        this.setState({ modal: false, email: res.data.data[0].email }, () => {
                            if (res.data.data[0].email && full_name != null && full_name != undefined)
                                this.getPaymentMethod(user_id, userToken)
                            else
                                this.setState({ loading: false, modal: true })
                        })
                    } else {
                        console.log("false");
                        this.setState({ loading: false, modal: true })
                    }
                }
            })
            .catch((error) => console.log(error.response))
    }

    getPaymentMethod = () => {

        const { user_id, token, full_name, email } = this.props.user.userData

        let paymentdata = {
            "user_id": user_id,
            "email": email,
            "description": JSON.stringify(this.props.user.userData),
            "cardholderName": full_name
        }
        // console.log(paymentdata);
        ProfileServices.getPaymentMethod(paymentdata, token)
            .then((res) => {
                console.log("res.data : ", res.data)
                this.setState({ loading: false })
                this.setState({ sourceHtml: res.data, loading: false })
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
        ProfileServices.updateUserEmail(data, JSON.parse(userToken))
            .then((res) => {
                this.setState({ btnLoading: false, emailModal: false })
            })
            .catch((error) => console.log(error.response))
    }

    render() {
        const { cardDetails, email, submit, btnLoading, loading, sourceHtml } = this.state;

        const source = {
            html: `${sourceHtml}`
        };
        return (
            <Container>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={'#44BDE8'} />
                        </View>
                        :
                        email ?
                            <WebView
                                style={{ flex: 1 }}
                                originWhitelist={['*']}
                                source={source}
                                style={{ marginTop: 0 }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />
                            :
                            <View style={styles.container}>
                                {/* <View style={{ flex: 0.4, alignItems: "center" }}>
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

                                </View> */}
                            </View>}
                <Modal isVisible={this.state.modal}
                    animationInTiming={400}
                    animationOutTiming={200}
                    backdropColor="#000"
                >
                    <View style={styles.cardContainer}>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.setState({ modal: false, }, () => this.props.navigation.goBack())}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                        </View>
                        <View style={{ marginTop: "5%", alignItems: "center" }}>
                            <Run />
                            <Text style={styles.headingText}>Complete Profile</Text>
                            {/* <Text style={styles.textStyle}>Lorem ipsum dolor</Text> */}
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
                                <TouchableOpacity onPress={() => this.setState({ emailModal: false, }, () => this.props.navigation.goBack())}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
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
                <UploadingModal visible={this.state.uploading} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
const mapDispatchToProps = dispatch => { return { authActions: bindActionCreators(authActions, dispatch) }; };
export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);