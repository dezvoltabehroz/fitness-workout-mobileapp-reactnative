import React, { Component } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import themeStyle from "../../assets/styles/theme.style";
import themeStyle1 from "../../assets/styles/common.style";
import { Button, Container, Icon, NameModal, DateModal, HeightModal, WeightModal, Input, VerifyOtpModal, EmailModal } from "../../components";

import Plus from '../../assets/svg/plus.svg'
import DOB from '../../assets/svg/DOB.svg'
import Name from '../../assets/svg/name.svg'
import Height from '../../assets/svg/Height.svg'


import styles from './style';
import moment from "moment";
import { isEmailValid, isPasswordValid } from "../../lib/utils/global";
import { connect } from "react-redux";
import { AuthServices, ProfileServices } from "../../services";
import { bindActionCreators } from "redux";
import { authActions } from "../../redux/actions/auth";
import { getLocalData, LOCAL_STORAGE_KEYS } from "../../lib/utils/localstorage";

class CompleteProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            nameModal: false,
            email: "",
            emailModal: false,
            dateModal: false,
            weightModal: false,
            heightModal: false,
            date: new Date(),
            dateValue: "",
            name: "",
            weight: "",
            feet: "",
            inch: "",
            password: "",
            confirmPassword: "",
            code: "",
            submit: false,
            nextLoading: false,
            btnLoading: false,
            passwordModal: false,
            confirmPasswordModal: false,
            confirmOtpModal: false,
            submit1: false,
            sendedCode: ""
        }
    }

    handleOnPressNext = async () => {
        const { tab, name, email, password, date, dateValue, weight, height, feet, inch } = this.state;
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)

        // if (name && dateValue && inch && weight && feet) {
        //     if (userData.email) {
        let { userData } = this.props.user;
        let data = {
            "email": email ? email : userData.email,
            "full_name": name ? name : userData.full_name,
            "dob": dateValue ? moment(dateValue).format('YYYY-MM-DD') : moment(userData.dob).format('YYYY-MM-DD'),
            "height_feet": feet ? parseInt(feet) : userData.height_feet,
            "height_inches": inch ? parseInt(inch) : userData.height_inches,
            "weight": weight ? parseFloat(weight) : userData.weight,
            "password": password ? password : "Admin@123",
            "user_id": JSON.parse(user_id)
        }
        console.log(data)
        console.log(JSON.parse(userToken))
        ProfileServices.updateProfile(data, JSON.parse(userToken))
            .then(async (response) => {
                console.log(response.data)
                if (response.data.success) {
                    this.setState({ nextLoading: false, })
                    await this.props.authActions.userLogin(this.props.navigation.replace)
                }
            })
            .catch((err) => console.log(err.response))
        // } else {
        //     let data = {
        //         "email": email,
        //         "full_name": name,
        //         "dob": moment(dateValue).format('YYYY-MM-DD'),
        //         "height_feet": parseInt(feet),
        //         "height_inches": parseInt(inch),
        //         "weight": parseFloat(weight),
        //         "password": password,
        //         "user_id": JSON.parse(user_id)
        //     }
        //     console.log(data)
        //     ProfileServices.updateProfile(data, JSON.parse(userToken))
        //         .then((response) => {
        //             if (response.data.success) {
        //                 this.setState({ nextLoading: false, })
        //                 this.props.authActions.getUserProfile(this.props.navigation.replace)
        //             }
        //         })
        //         .catch((err) => console.log(err.response))
        // }
        // } else {
        //     this.setState({ nextLoading: false })
        //     alert('Please fill complete data')
        // }
    }

    setPassword = async () => {
        const { password, submit, confirmPassword } = this.state;
        if (password && isPasswordValid(password) && submit && confirmPassword && confirmPassword == password) {

            this.setState({
                btnLoading: false, submit: false,
                passwordModal: false
            })
        } else {
            this.setState({ submit: true, btnLoading: false })
        }

    }

    sendCodeOnEmail = () => {
        const { email, submit } = this.state;
        if (email && isEmailValid(email) && submit) {
            let data = {
                "email": email,
            }
            AuthServices.sendCodeOnEmail(data, this.props.user.userData.token)
                .then((res) => {
                    console.log(res.data.data)
                    this.setState({ emailModal: false, btnLoading: false, confirmOtpModal: true, submit: false, sendedCode: res.data.data })
                })
                .catch((error) => console.log(error.response))
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
                    if (code == sendedCode) {
                        this.setState({
                            emailModal: false, btnLoading: false, confirmOtpModal: false, code: "", submit1: false,
                            passwordModal: this.props.user.userData.email ? false : true
                        })
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
        const { tab, name, date, dateValue, weight, submit, submit1, error,
            feet, inch, code, nextLoading, email, emailModal, btnLoading,
            password, confirmPassword } = this.state;
        const { userData } = this.props.user;
        return (
            <Container>
                <View style={styles.cardContainer}>
                    <View style={{ marginTop: "10%", alignItems: "center" }}>
                        <Text style={styles.headingText}>MY ACCOUNT</Text>
                        <Text style={styles.textStyle}>Lets us know you better to help boost your workout result lorem ipsum...</Text>
                    </View>
                    <View style={styles.rowMeasureContainer}>
                        <View style={styles.rowStyle}>
                            <Name />
                            <Text style={styles.grayText}>{name ? name : userData.full_name ? userData.full_name : 'Full Name'}</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.setState({ nameModal: true })}>
                            <Plus />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowMeasureContainer}>
                        <View style={styles.rowStyle}>
                            <Icon.Entypo name="email" color={'#797B7B'} size={20} />
                            <Text style={styles.grayText}>{email ? email : userData.email ? userData.email : 'Email'}</Text>
                        </View>

                        <TouchableOpacity disabled={userData.email ? true : false} onPress={() => this.setState({ emailModal: true })}>
                            <Plus />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowMeasureContainer}>
                        <View style={styles.rowStyle}>
                            <DOB />
                            <Text style={styles.grayText}>{dateValue ? moment(dateValue).format('YYYY-MM-DD') : userData.dob ? moment(userData.dob).format('YYYY-MM-DD') : 'Date of Birth'}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ dateModal: true })}>
                            <Plus />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowMeasureContainer}>
                        <View style={styles.rowStyle}>
                            <Height />
                            <Text style={styles.grayText}>{feet && inch ? `${feet}'${inch}"` : userData.height_feet ? `${userData.height_feet}'${userData.height_inches}"` : "Height"}</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.setState({ heightModal: true })}>
                            <Plus />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowMeasureContainer}>
                        <View style={styles.rowStyle}>
                            <Icon.FontAwesome name="tachometer" color={'#797B7B'} size={20} />
                            <Text style={styles.grayText}>{weight ? weight : userData.weight ? userData.weight : "Weight"}</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.setState({ weightModal: true })} >
                            <Plus />
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: "8%", marginHorizontal: "20%" }}>
                        <Button title={'Save'} onPress={() => this.handleOnPressNext()} />
                    </View>
                    {userData.email ?
                        <View style={{ marginHorizontal: "20%" }}>
                            <Button title={'Change Email'} onPress={() => this.setState({ emailModal: true }, () => console.log('Hllo'))} />
                        </View> : null}

                </View>
                <NameModal
                    visible={this.state.nameModal}
                    onChangeText={(name) => this.setState({ name: name })}
                    onClose={() => this.setState({ nameModal: false })}
                    onSave={() => this.setState({ nameModal: false })} />
                <DateModal
                    date={date}
                    visible={this.state.dateModal}
                    setDate={(name) => this.setState({ date: name })}
                    onClose={() => this.setState({ dateModal: false })}
                    onSave={() => this.setState({ dateModal: false, dateValue: moment(this.state.date).format('ll') })} />
                <HeightModal
                    visible={this.state.heightModal}
                    onChangeInches={(name) => this.setState({ inch: name })}
                    onChangeFeet={(name) => this.setState({ feet: name })}
                    feet={feet}
                    inches={inch}
                    onClose={() => this.setState({ heightModal: false })}
                    onSave={() => this.setState({ heightModal: false })} />
                <WeightModal
                    visible={this.state.weightModal}
                    onChangeText={(name) => this.setState({ weight: name })}
                    onClose={() => this.setState({ weightModal: false })}
                    onSave={() => this.setState({ weightModal: false })} />
                <EmailModal isVisible={emailModal}
                    email={email}
                    submit={submit}
                    btnLoading={btnLoading}
                    setEmail={(email) => this.setState({ email: email })}
                    sendCodeOnEmail={() => this.setState({ submit: true, btnLoading: true }, () => this.sendCodeOnEmail())}
                    onClose={() => this.setState({ emailModal: false })}
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
                <Modal isVisible={this.state.passwordModal}>
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop: "5%", }}>
                            <View style={{ alignItems: "flex-end" }}>
                                <TouchableOpacity disabled={!btnLoading} onPress={() => this.setState({ passwordModal: false, })}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                            </View>
                            <Text style={styles.headingText}>Enter Your Password</Text>
                            <View style={{ marginTop: "10%", }}>
                                <Input editable={!btnLoading} secureTextEntry={true} bottomMargin={true} value={password} placeholder="" onChangeText={(email) => this.setState({ password: email })} />
                                {
                                    submit && !password ? <Text style={[themeStyle1.errorText,]}>Please fill this field</Text> : null
                                }
                                {
                                    submit && password.length && !isPasswordValid(password) ? <Text style={[themeStyle1.errorText,]}>At lease 8 characters with 1 upper case letter, 1 digit, and 1 special character (Admin12$)</Text> : null
                                }
                            </View>
                            <Text style={styles.headingText}>Re-type your password</Text>
                            <View style={{ marginTop: "10%", }}>
                                <Input editable={!btnLoading} secureTextEntry={true} bottomMargin={true} value={confirmPassword} placeholder="" onChangeText={(email) => this.setState({ confirmPassword: email })} />
                                {
                                    submit && !confirmPassword ? <Text style={[themeStyle1.errorText,]}>Please fill this field</Text> :
                                        submit && password != confirmPassword ? <Text style={[themeStyle1.errorText,]}>Password Mismatch</Text> : null
                                }
                            </View>


                        </View>

                        <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                            <Button loading={btnLoading} disabled={password == confirmPassword ? false : true} title={'Continue'} onPress={() => this.setState({ btnLoading: true, submit: true }, () => this.setPassword())} />
                        </View>
                    </View>

                </Modal>
                {/* <Modal isVisible={this.state.confirmPasswordModal}>
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop: "5%", }}>
                            <View style={{ alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={() => this.setState({ confirmPasswordModal: false, })}><Icon.AntDesign name="close" size={20} /></TouchableOpacity>
                            </View>
                         
                        </View>

                        <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                            <Button loading={btnLoading} disabled={email && !submit ? false : true} title={'Continue'} onPress={() => this.updateUserEmail()} />
                        </View>
                    </View>

                </Modal> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfile);