import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Container, Input, Button, Icon, EmailModal, VerifyOtpModal, HeaderLeft } from '../../components';

import OutLine from '../../assets/svg/out-line.svg';

import styles from './style'
import { AuthServices } from '../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../redux/actions/auth';
import { isEmailValid, isPasswordValid } from '../../lib/utils/global';

import themeStyle1 from '../../assets/styles/common.style';
import { LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import themeStyle from '../../assets/styles/theme.style';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailReset: "",
            code: "",
            sendedCode: "",
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
            secureTextEntry: true,
            secureTextEntryConfirmPassword: true,
            submit1: false,
            emailModal: false
        }
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({
             headerLeft: () => (<HeaderLeft navigation={this.props.navigation} login={true} />) });

    }

    handleLoginFunction = () => {
        const { email, password, submit, confirmPassword } = this.state;
        if (email && password && submit && isEmailValid(email.trim())) {
            let userData = {
                "email": email.trim(),
                "password": password,
            }
            AuthServices.userLogin(userData)
                .then(async (res) => {
                    if (res.data.success) {
                        await storeLocalData(LOCAL_STORAGE_KEYS.user_id, JSON.stringify(res.data.data.id))
                        await this.props.authActions.userLogin('intro', this.props.navigation.replace)
                        this.setState({ loading: false })
                    } else {
                        Alert.alert(`${res.data.message}!`)
                        this.setState({ submit: true, loading: false })
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
        const { email, submit1 } = this.state;
        if (email && submit1 && isEmailValid(email.trim())) {
            let userData = {
                "email": email.trim(),
            }
            AuthServices.sendCodeOnEmail(userData)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        this.setState({ emailModal: false, btnLoading: false, submit1: false, sendedCode: res.data.data })
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
            console.log("code : ", code)
            console.log("sendedCode : ", sendedCode)
            if (code == sendedCode) {
                this.setState({ btnLoading: false, confirmOtpModal: false, submit1: false, })
            } else {
                Alert.alert("Code is incorrect!", 'Please enter a valid code ');
                this.setState({ btnLoading: false, code: "", submit1: false, })
            }
        } else {
            this.setState({ submit1: true, btnLoading: false })
        }
    }

    handleCreateUserFunction = () => {
        const { email, password, submit, confirmPassword } = this.state;
        if (email && password && submit && isEmailValid(email.trim()) && isPasswordValid(password) && confirmPassword == password) {
            let userData = {
                "email": email.trim(),
                "password": password,
            }
            AuthServices.createUserWithEmailPassword(userData)
                .then(async (res) => {
                    if (res.data.success) {
                        this.handleLoginFunction()
                    } else {
                        Alert.alert(`${res.data.message}!`)
                        this.setState({ submit: true, loading: false })
                    }
                })
                .catch((err) => {
                    console.log(err.response)
                })

        } else {
            this.setState({ submit: true, loading: false })
        }
    }

    securePasswordEntry(value) {
        return value && value.replace(/./g, '*')
    }

    render() {
        const { email, password, submit, submit1, btnLoading, emailReset, code, loading, error, emailModal, confirmOtpModal, newPassword, confirmPassword } = this.state
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.outLineContainer}>

                        <OutLine />
                        <Text style={styles.heading}>Create User</Text>
                    </View>
                    <View style={{ flex: 0.8, marginTop: "10%" }}>
                        <View style={{ marginHorizontal: "5%" }}>
                            <Text style={{ fontSize: 16 }}>Enter your email</Text>
                            <TouchableOpacity onPress={() => this.setState({ emailModal: true })} style={{ borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: themeStyle.DASH_DARK, height: 45 }}>
                                <Text style={{ color: themeStyle.DASH_DARK }}>{email ? email : ""}</Text>
                            </TouchableOpacity>
                            {/* <Input value={email} label="Enter your email" onChangeText={(e) => this.setState({ email: e })} />
                            {
                                submit && !email ? <Text style={[themeStyle1.errorText, { marginBottom: 10 }]}>Please fill this field</Text> : null
                            }
                            {
                                submit && email.length && !isEmailValid(email) ? <Text style={[themeStyle1.errorText, { marginBottom: 10 }]}>Email is invalid</Text> : null
                            } */}
                        </View>
                        <View style={{ marginHorizontal: "2.5%", marginTop: "5%" }}>
                            <Input value={password} secureTextEntry={this.state.secureTextEntry} rightIcon={this.state.secureTextEntry ?
                                <Icon.Entypo name="eye-with-line" size={20} color={themeStyle.DASH_DARK}
                                    onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })} /> :
                                <Icon.Entypo name="eye" size={20} color={themeStyle.DASH_DARK}
                                    onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })} />} label="Enter your password" onChangeText={(e) => this.setState({ password: e })} />
                            {
                                submit && !password ? <Text style={[themeStyle1.errorText, { marginBottom: 10 }]}>Please fill this field</Text> : null
                            }
                            {
                                submit && password.length && !isPasswordValid(password) ? <Text style={[themeStyle1.errorText,]}>At lease 8 characters with 1 upper case letter, 1 digit, and 1 special character (Admin12$)</Text> : null
                            }
                        </View>
                        <View style={{ marginHorizontal: "2.5%", marginTop: "5%" }}>
                            <Input value={confirmPassword} secureTextEntry={this.state.secureTextEntryConfirmPassword} rightIcon={this.state.secureTextEntryConfirmPassword ?
                                <Icon.Entypo name="eye-with-line" size={20} color={themeStyle.DASH_DARK}
                                    onPress={() => this.setState({ secureTextEntryConfirmPassword: !this.state.secureTextEntryConfirmPassword })} /> :
                                <Icon.Entypo name="eye" size={20} color={themeStyle.DASH_DARK}
                                    onPress={() => this.setState({ secureTextEntryConfirmPassword: !this.state.secureTextEntryConfirmPassword })} />}
                                label="Enter confirm password" onChangeText={(e) => this.setState({ confirmPassword: e })} />
                            {
                                submit && !confirmPassword ? <Text style={[themeStyle1.errorText,]}>Please fill this field</Text> :
                                    submit && password != confirmPassword ? <Text style={[themeStyle1.errorText,]}>Password Mismatch</Text> : null
                            }
                        </View>

                        <View style={{ marginHorizontal: "15%", marginTop: "5%" }}>
                            <Button loading={this.props.user.loading || loading} title="Create " onPress={() => this.setState({ submit: true, loading: true }, () => this.handleCreateUserFunction())} />
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
                    reset={false}
                    email={email}
                    submit={submit1}
                    btnLoading={btnLoading}
                    setEmail={(email) => this.setState({ email: email })}
                    sendCodeOnEmail={() => this.setState({ submit1: true, btnLoading: true }, () => this.sendCodeOnEmail())}
                    onClose={() => this.setState({ emailModal: false, email: "" })}
                />
                <VerifyOtpModal
                    isVisible={this.state.confirmOtpModal}
                    code={code}
                    submit={submit1}
                    error={error}
                    email={email}
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