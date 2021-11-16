import React, { Component } from "react";
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
            editEmail: "",
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
            date:dob,
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
        ProfileServices.updateSpecificPersonalInfo(data, JSON.parse(userToken))
            .then(async (response) => {
                if (response.data.success) {
                    await this.props.authActions.userLogin("");
                    this.setState({ nextLoading: false, })
                    this.props.navigation.goBack();
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
        const { email, submit, editEmail } = this.state;
        if (editEmail && isEmailValid(editEmail) && submit) {
            let data = {
                "email": editEmail,
            }
            AuthServices.sendCodeOnEmail(data, this.props.user.userData.token)
                .then((res) => {
                    console.log(res.data.data)
                    this.setState({ emailModal: false, btnLoading: false, submit: false, sendedCode: res.data.data })
                    setTimeout(() => { this.setState({ confirmOtpModal: true, }) }, 350);
                })
                .catch((error) => console.log(error.response))
        } else {
            this.setState({ submit: true, btnLoading: false })
        }
    }

    verifyCode = () => {
        const { code, submit1, sendedCode, email, editEmail } = this.state;
        const { user_id, token } = this.props.user.userData;
        if (code && code.length == 6 && submit1) {
            if (code == sendedCode) {
                let data = {
                    "email": editEmail,
                    "user_id": user_id
                }
                ProfileServices.updateUserEmail(data, token)
                    .then(async (res) => {
                        if (res.data.success) {
                            let userData = { "token": token, "user_id": user_id }
                            await this.props.authActions.getUserProfile(userData)
                            this.setState({ emailModal: false, btnLoading: false, confirmOtpModal: false, email: editEmail, code: "", submit1: false, })
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
            password, confirmPassword, kilo, gram, editEmail } = this.state;
        const { userData } = this.props.user;
        return (
            <Container>
                <ScrollView contentContainerStyle={{ paddingBottom: "10%" }}>
                    <View style={styles.cardContainer}>

                        <View style={{ marginTop: "10%", alignItems: "center" }}>
                            <Text style={styles.headingText}>MY ACCOUNT</Text>
                            <Text style={styles.textStyle}>Lets us know you better to help boost your workout result...</Text>
                        </View>
                        <View style={styles.rowMeasureContainer}>
                            <View style={styles.rowStyle}>
                                <Name />
                                <Text style={styles.grayText}>{name ? name : userData.full_name ? userData.full_name : 'Full Name'}</Text>
                            </View>

                            <TouchableOpacity onPress={() => this.setState({ nameModal: true, name: userData.full_name })}>
                                <Plus />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowMeasureContainer}>
                            <View style={styles.rowStyle}>
                                <Icon.Entypo name="email" color={'#9b9b9b'} size={20} />
                                <Text style={styles.grayText}>{email ? email : userData.email ? userData.email : 'Email'}</Text>
                            </View>
                            {userData.email ?
                                null :
                                <TouchableOpacity disabled={userData.email ? true : false} onPress={() => this.setState({ emailModal: true, email: userData.email })}>
                                    <Plus />
                                </TouchableOpacity>}
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
                            <TouchableOpacity onPress={() => this.setState({ feet: userData.height_feet, inch: userData.height_inches, heightModal: true, })}>
                                <Plus />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowMeasureContainer}>
                            <View style={styles.rowStyle}>
                                <Icon.FontAwesome name="tachometer" color={'#9b9b9b'} size={20} />
                                <Text style={styles.grayText}>{weight ? weight : userData.weight ? userData.weight : "Weight"}</Text>
                            </View>

                            <TouchableOpacity onPress={() => {
                                let string = `${userData.weight}`
                                let array = string.split('.');
                                this.setState({ kilo: `${array[0]}`, gram: `${array[1]}`, weightModal: true, })
                            }} >
                                <Plus />
                            </TouchableOpacity>
                        </View>
                        <View style={{ margin: "8%", marginHorizontal: "20%" }}>
                            <Button loading={nextLoading || this.props.user.loading} title={'Save'} disabled={this.btnDisabled()} onPress={() => this.setState({ nextLoading: true }, () => this.handleOnPressNext())} />
                        </View>
                        {userData.email ?
                            <View style={{ marginHorizontal: "20%" }}>
                                <Button title={'Change Email'} onPress={() => this.setState({ editEmail: userData.email, emailModal: true, email: "" })} />
                            </View> : null}

                    </View>
                </ScrollView>
                <NameModal
                    visible={this.state.nameModal}
                    name={name}
                    onChangeText={(name) => this.setState({ name: name },)}
                    onClose={() => this.setState({ nameModal: false, name: "" })}
                    onSave={() => this.setState({ nameModal: false })} />
                <DateModal
                    date={Platform.OS == 'ios' ? new Date(date) : moment(date)}
                    visible={this.state.dateModal}
                    setDate={(name) => this.setState({ date: name })}
                    onClose={() => this.setState({ dateModal: false, dateValue: "", date: moment() })}
                    onSave={() => this.setState({ dateModal: false, dateValue: moment(this.state.date).format('ll') })} />
                <HeightModal
                    visible={this.state.heightModal}
                    onChangeInches={(name) => this.setState({ inch: name })}
                    onChangeFeet={(name) => this.setState({ feet: name })}
                    feet={feet}
                    inches={inch}
                    onClose={() => this.setState({ heightModal: false, feet: "", inch: "" })}
                    onSave={() => this.setState({ heightModal: false })} />
                <WeightModal
                    visible={this.state.weightModal}
                    kg={kilo}
                    gram={gram}
                    onChangeGram={(gram) => this.setState({ gram: gram, weight: `${kilo ? kilo : 0}.${gram ? gram : 0}` })}
                    onChangeKilo={(kilo) => this.setState({ kilo: kilo, weight: `${kilo ? kilo : 0}.${gram ? gram : 0}` })}
                    onClose={() => this.setState({ weightModal: false })}
                    onSave={() => this.setState({ weightModal: false })} />
                <EmailModal isVisible={emailModal}
                    email={editEmail}
                    submit={submit}
                    btnLoading={btnLoading}
                    setEmail={(email) => this.setState({ editEmail: email.trim() })}
                    sendCodeOnEmail={() => this.setState({ submit: true, btnLoading: true }, () => this.sendCodeOnEmail())}
                    onClose={() => this.setState({ emailModal: false, editEmail: "" })}
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