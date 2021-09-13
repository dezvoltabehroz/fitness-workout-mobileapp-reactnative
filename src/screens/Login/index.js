import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Container, Input, Button, Icon } from '../../components';

import OutLine from '../../assets/svg/out-line.svg';

import styles from './style'
import { AuthServices } from '../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../redux/actions/auth';
import { isEmailValid } from '../../lib/utils/global';

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
            console.log(userData)
            AuthServices.userLogin(userData)
                .then(async (res) => {
                    console.log(res.data.data)
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

    sendCodeOnEmail = () => {
        const { emailReset, submit1 } = this.state;
        if (emailReset && submit1 && isEmailValid(email)) {
            let userData = {
                "email": emailReset,
            }
            AuthServices.forgetPassword(userData).then((res) => {
                console.log(res.data.data)
                if (res.data.success) {
                    this.setState({ loading: false })
                }
            })
                .catch((err) => {
                    console.log(err.response)
                })
            // this.props.authActions.userLogin(userData, this.props.navigation.replace)
        } else {
            this.setState({ submit1: true })
        }
    }

    render() {
        const { email, password, submit, submit1, btnLoading, emailReset, code, loading } = this.state
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
                            <Button loading={this.props.user.loading || loading} title="Login " onPress={() => this.setState({ submit: true,loading:true }, () => this.handleLoginFunction())} />
                        </View>
                    </View>
                </View>
                <Modal isVisible={this.state.emailModal}>
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop: "5%", }}>
                            <View style={{ alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={() => this.setState({ emailModal: false, })}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                            </View>
                            <Text style={styles.headingText}>Enter Your Email to reset code</Text>
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
                            <Button loading={btnLoading} disabled={email && !submit1 ? false : true} title={'Continue'} onPress={() => this.sendCodeOnEmail()} />
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