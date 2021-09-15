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
            loading: true,
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

    componentDidMount = () => {
        let { full_name, dob, weight, height_inches, height_feet } = this.props.user.userData;
        this.setState({
            name: full_name,
            dateValue: dob,
            weight: weight,
            feet: height_feet,
            inch: height_inches,
            loading: false
        })
    }


    btnDisabled = () => {
        const { name, dateValue, weight, feet, inch } = this.state;
        let { userData } = this.props.user;
        if (name !== userData.full_name || userData.dob != dateValue || weight !== userData.weight || userData.height_feet != feet || userData.height_inches !== inch) {
            return false
        }
        else {
            return true
        }
    }

    handleOnPressNext = async () => {
        const { tab, name, email, password, date, dateValue, weight, height, feet, inch } = this.state;
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
        let { userData } = this.props.user;
        let data = {
            "full_name": name ? name : userData.full_name,
            "dob": dateValue ? moment(dateValue).format('YYYY-MM-DD') : moment(userData.dob).format('YYYY-MM-DD'),
            "height_feet": feet ? parseInt(feet) : userData.height_feet,
            "height_inches": inch ? parseInt(inch) : userData.height_inches,
            "weight": weight ? parseFloat(weight) : userData.weight,
            "user_id": JSON.parse(user_id)
        }
        console.log(data)
        console.log(JSON.parse(userToken))
        ProfileServices.updateSpecificPersonalInfo(data, JSON.parse(userToken))
            .then(async (response) => {
                console.log(response.data)
                if (response.data.success) {
                    this.setState({ nextLoading: false, })
                    await this.props.authActions.userLogin(this.props.navigation.replace)
                }
            })
            .catch((err) => console.log(err.response))
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
        const { code, submit1, sendedCode, email } = this.state;
        const { user_id, token } = this.props.user.userData;
        if (code && code.length == 6 && submit1) {
            if (code == sendedCode) {
                let data = {
                    "email": email,
                    "user_id": user_id
                }
                ProfileServices.updateUserEmail(data, token)
                    .then(async (res) => {
                        if (res.data.success) {
                            this.setState({
                                emailModal: false, btnLoading: false, confirmOtpModal: false, code: "", submit1: false,
                            })
                            let userData = {
                                "token": token,
                                "user_id": user_id
                            }
                            await this.props.authActions.getUserProfile(userData)
                        }

                    })
                    .catch((err) => { console.log(err.response) })


            } else {
                Alert.alert("Code is incorrect!", 'Please enter a valid code ')
            }
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
                        <Button loading={nextLoading||this.props.user.loading} title={'Save'} disabled={this.btnDisabled()} onPress={() => this.setState({ nextLoading: true }, () => this.handleOnPressNext())} />
                    </View>
                    {userData.email ?
                        <View style={{ marginHorizontal: "20%" }}>
                            <Button title={'Change Email'} onPress={() => this.setState({ emailModal: true }, () => console.log('Hllo'))} />
                        </View> : null}

                </View>
                <NameModal
                    visible={this.state.nameModal}
                    onChangeText={(name) => this.setState({ name: name },)}
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