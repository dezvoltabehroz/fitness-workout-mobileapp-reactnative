import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Container, Input, Button, Icon, EmailModal, VerifyOtpModal } from '../../components';

import OutLine from '../../assets/svg/out-line.svg';

import styles from './style'
import { AuthServices } from '../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../redux/actions/auth';
import { isEmailValid, isPasswordValid } from '../../lib/utils/global';

import themeStyle1 from '../../assets/styles/common.style';
import { LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailReset: "",
            code: "",
            password: "",
            newPassword: "",
            confirmPassword: "",
            error: "",
            confirmOtpModal: false,
            passwordModal: false,
            emailModal: false,
            submit: false,
            loading: false,
            btnLoading: false,
            submit1: false,
            emailModal: false
        }
    }

    handleLoginFunction = () => {
        const { email, password, submit } = this.state;
        if (email && password && submit && isEmailValid(email)) {
            let userData = {
                "email": email,
                "password": password,
            }
            AuthServices.userLogin(userData)
                .then(async (res) => {
                    if (res.data.success) {
                        storeLocalData(LOCAL_STORAGE_KEYS.user_id, JSON.stringify(res.data.data.id))
                        await this.props.authActions.userLogin(this.props.navigation.replace)
                        this.setState({ loading: false })
                    }
                })
                .catch((err) => {
                    console.log(err.response)
                })

        } else {
            this.setState({ submit: true, loading: false })
        }
    }


    setPassword = async () => {
        const { newPassword, submit1, confirmPassword } = this.state;
        if (newPassword && isPasswordValid(newPassword) && submit1 && confirmPassword && confirmPassword == newPassword) {
            let userData = {
                "user_id": this.state.user_id,
                "new_password": newPassword
            }
            AuthServices.updatePassword(userData)
                .then((res) => {
                    this.setState({
                        btnLoading: false, submit: false, submit1: false, confirmOtpModal: false, emailModal: false,
                        passwordModal: false
                    })
                })
                .catch((err) => console.log(err.response))
        } else {
            this.setState({ submit: true, btnLoading: false })
        }

    }

    sendCodeOnEmail = () => {
        const { emailReset, submit1 } = this.state;
        if (emailReset && submit1 && isEmailValid(emailReset)) {
            let userData = {
                "email": emailReset,
            }
            AuthServices.forgetPassword(userData)
                .then((res) => {
                    if (res.data.success) {
                        this.setState({ emailModal: false, btnLoading: false, submit1: false, })
                        setTimeout(() => { this.setState({ confirmOtpModal: true, }) }, 350);
                    }
                    else {
                        Alert.alert(`${res.data.message}!`)
                        this.setState({ btnLoading: false, submit1: false, })
                    }
                })
                .catch((err) => {
                    this.setState({ btnLoading: false, submit1: false, })
                    console.log(err.response)
                })
            // this.props.authActions.userLogin(userData, this.props.navigation.replace)
        } else {
            this.setState({ submit1: true, btnLoading: false })
        }
    }

    verifyCode = () => {
        const { code, submit1, sendedCode } = this.state;
        if (code && code.length == 6 && submit1) {
            let userData = {
                "code": `${code}`
            }
            AuthServices.verifyCodeForReset(userData)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        this.setState({
                            confirmOtpModal: false,
                            emailModal: false, btnLoading: false, code: "", submit1: false,
                            user_id: res.data.data[0].id
                        })
                        setTimeout(() => { this.setState({ passwordModal: true, }) }, 350);
                    } else {
                        Alert.alert("Code is incorrect!", 'Please enter a valid code ')
                    }
                })
                .catch((error) => console.log(error.response))
        } else {
            this.setState({ submit1: true, btnLoading: false })
        }
    }

    render() {
        const { email, password, submit, submit1, btnLoading, emailReset, code, loading, error, emailModal, confirmOtpModal, newPassword, confirmPassword } = this.state
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.outLineContainer}>

                        <OutLine />
                        <Text style={styles.heading}>Log In</Text>
                    </View>
                    <View style={{ flex: 0.8, marginTop: "10%" }}>
                        <View style={{ marginHorizontal: "5%" }}>
                            <Input value={email} label="Enter your email" onChangeText={(e) => this.setState({ email: e })} />
                            {
                                submit && !email ? <Text style={[themeStyle1.errorText, { marginBottom: 10 }]}>Please fill this field</Text> : null
                            }
                            {
                                submit && email.length && !isEmailValid(email) ? <Text style={[themeStyle1.errorText, { marginBottom: 10 }]}>Email is invalid</Text> : null
                            }
                        </View>
                        <View style={{ marginHorizontal: "5%", marginTop: "5%" }}>
                            <Input value={password} secureTextEntry={true} label="Enter your password" onChangeText={(e) => this.setState({ password: e })} />
                            {
                                submit && !password ? <Text style={[themeStyle1.errorText, { marginBottom: 10 }]}>Please fill this field</Text> : null
                            }
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ emailModal: true })} style={{ marginVertical: "5%", alignItems: "center" }}>
                            <Text style={{ textAlign: "center" }}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <View style={{ marginHorizontal: "15%", }}>
                            <Button loading={this.props.user.loading || loading} title="Login " onPress={() => this.setState({ submit: true, loading: true }, () => this.handleLoginFunction())} />
                        </View>
                    </View>
                </View>
                {/* <Modal isVisible={this.state.emailModal}>
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop: "5%", }}>
                            <View style={{ alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={() => this.setState({ emailModal: false, })}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                            </View>
                            <Text style={styles.headingText}>Enter your email to reset password</Text>
                            <View style={{ marginTop: "10%", }}>
                                <Input editable={!btnLoading} bottomMargin={true} value={emailReset} placeholder="" onChangeText={(emailReset) => this.setState({ emailReset: emailReset })} />
                                {
                                    submit1 && !email ? <Text style={[themeStyle.errorText,]}>Please fill this field</Text> : null
                                }
                                {
                                    submit1 && email.length && !isEmailValid(email) ? <Text style={[themeStyle.errorText,]}>Email is invalid</Text> : null
                                }
                            </View>

                        </View>

                        <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                            <Button loading={btnLoading} title={'Continue'} onPress={() => this.sendCodeOnEmail()} />
                        </View>
                    </View>

                </Modal> */}
                <EmailModal isVisible={emailModal}
                    reset={true}
                    email={emailReset}
                    submit={submit1}
                    btnLoading={btnLoading}
                    setEmail={(email) => this.setState({ emailReset: email })}
                    sendCodeOnEmail={() => this.setState({ submit1: true, btnLoading: true }, () => this.sendCodeOnEmail())}
                    onClose={() => this.setState({ emailModal: false,emailReset:"" })}
                />
                <VerifyOtpModal
                    isVisible={this.state.confirmOtpModal}
                    code={code}
                    submit={submit1}
                    error={error}
                    email={emailReset}
                    btnLoading={btnLoading}
                    setError={(e) => this.setState({ error: e })}
                    setCode={(code) => this.setState({ code: code })}
                    onClose={() => this.setState({ confirmOtpModal: false })}
                    verifyCode={() => this.setState({ submit1: true, btnLoading: true }, () => this.verifyCode())} />
                <Modal isVisible={this.state.passwordModal} animationInTiming={400}
                    animationOutTiming={200} >
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop: "5%", }}>
                            <View style={{ alignItems: "flex-end" }}>
                                <TouchableOpacity disabled={!btnLoading} onPress={() => this.setState({ passwordModal: false, })}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                            </View>
                            <Text style={styles.headingText}>Enter Your Password</Text>
                            <View style={{ marginTop: "10%", }}>
                                <Input editable={!btnLoading} secureTextEntry={true} bottomMargin={true} value={newPassword} placeholder="" onChangeText={(email) => this.setState({ newPassword: email })} />
                                {
                                    submit1 && !newPassword ? <Text style={[themeStyle1.errorText,]}>Please fill this field</Text> : null
                                }
                                {
                                    submit1 && newPassword.length && !isPasswordValid(newPassword) ? <Text style={[themeStyle1.errorText,]}>At lease 8 characters with 1 upper case letter, 1 digit, and 1 special character (Admin12$)</Text> : null
                                }
                            </View>
                            <Text style={styles.headingText}>Re-type your password</Text>
                            <View style={{ marginTop: "10%", }}>
                                <Input editable={!btnLoading} secureTextEntry={true} bottomMargin={true} value={confirmPassword} placeholder="" onChangeText={(email) => this.setState({ confirmPassword: email })} />
                                {
                                    submit1 && !confirmPassword ? <Text style={[themeStyle1.errorText,]}>Please fill this field</Text> :
                                        submit1 && newPassword != confirmPassword ? <Text style={[themeStyle1.errorText,]}>Password Mismatch</Text> : null
                                }
                            </View>


                        </View>

                        <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                            <Button loading={btnLoading} disabled={newPassword == confirmPassword ? false : true} title={'Continue'} onPress={() => this.setState({ btnLoading: true, submit1: true }, () => this.setPassword())} />
                        </View>
                    </View>

                </Modal>
            </Container>
        )
    }

}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };

const mapDispatchToProps = dispatch => { return { authActions: bindActionCreators(authActions, dispatch) }; };

export default connect(mapStateToProps, mapDispatchToProps)(Login);