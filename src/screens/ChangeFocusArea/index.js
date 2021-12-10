import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';

import { Button, CheckBox, ClearButton, Container } from '../../components';
import { route, screen } from '../../lib/utils/constants';

import Target from '../../assets/svg/706.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import { LOCAL_STORAGE_KEYS, storeLocalData, getLocalData } from '../../lib/utils/localstorage';
import { connect } from 'react-redux';
import { ProfileServices } from '../../services';
import { bindActionCreators } from 'redux';
import { authActions } from '../../redux/actions/auth';

class ChangeFocusArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            arr: [],
            value: 0,
            btnLoading: false,
            shoulder: false,
            chest: false,
            arm: false,
            back: false,
            glute: false,
            leg: false,
            waist: false,
            equipment: ""
        };
    }
    componentDidMount = async () => {
        let equipment = await getLocalData(LOCAL_STORAGE_KEYS.fitnessEquipment)
        this.setState({ equipment: JSON.parse(equipment) })
        let array = [];
        console.log(this.props.user.userData.tags)
        let focusAreaString = this.props.user.userData.tags;
        let focusAreaArray = focusAreaString.split(',')
        focusAreaArray.forEach(element => {
            if (element) {
                array.push(element)
                if (element == 'shoulder') {
                    this.setState({ shoulder: true })
                } else if (element == 'arms') {
                    this.setState({ arm: true })
                } else if (element == 'chest') {
                    this.setState({ chest: true })
                } else if (element == 'back') {
                    this.setState({ back: true })
                } else if (element == 'glutes') {
                    this.setState({ glute: true })
                } else if (element == 'legs') {
                    this.setState({ leg: true })
                } else if (element == 'waist') {
                    this.setState({ waist: true })
                }
            }
        });
        console.log(array)
        this.setState({ arr: array })
    }

    handleDone = () => {
        const { user_id, token } = this.props.user.userData;
        this.setState({ btnLoading: true })
        let array = [...this.state.arr];
        let data = {
            "focus_area_arms": 0,
            "focus_area_waist": 0,
            "focus_area_legs": 0,
            "focus_area_glutes": 0,
            "focus_area_back": 0,
            "focus_area_chest": 0,
            "focus_area_shoulder": 0,
            "user_id": user_id,
        }
        array.forEach(element => {
            if (element == 'shoulder') {
                data.focus_area_shoulder = 1
            } else if (element == 'arms') {
                data.focus_area_arms = 1
            } else if (element == 'chest') {
                data.focus_area_chest = 1
            } else if (element == 'back') {
                data.focus_area_back = 1
            } else if (element == 'glutes') {
                data.focus_area_glutes = 1
            } else if (element == 'legs') {
                data.focus_area_legs = 1
            } else if (element == 'waist') {
                data.focus_area_waist = 1
            }
        });
        console.log(data);
        ProfileServices.updateFocusArea(data, token)
            .then((res) => {
                console.log(res.data);
                this.props.authActions.getUserProfile({ user_id: user_id, token: token });
                setTimeout(() => {
                    this.setState({ btnLoading: false });
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: route.MAIN }]
                    })
                }, 2000);
            })
            .catch((err) => err.response)
        // this.props.navigation.navigate(route.UPDATINGPLAN)
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        let { gender } = this.props.route?.params;
        const { shoulder, chest, glute, back, arm, leg, waist, arr, equipment, btnLoading } = this.state;
        return (
            <Container>
                <StatusBar backgroundColor={themeStyle.DASH_DARK} />
                <ImageBackground resizeMode={"cover"} source={require('../../assets/images/bg.png')} style={styles.bgStyle}>
                    {/* <HeaderView goBack={() => goBack()} /> */}

                    <View style={styles.container}>
                        <View style={styles.targetContainer}>
                            <Target />
                        </View>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_5}</Text>
                            <Text style={styles.decsTextStyle}>Select two focus areas so we can personalize your plan.</Text>
                        </View>
                        <ImageBackground style={this.props.route?.params?.gender == 'Male' ? styles.imageStyle : styles.imageStyleGirl} resizeMode="contain" source={this.props.route?.params?.gender == 'Male' ? require('../../assets/images/male.jpeg') : require('../../assets/images/female.jpeg')}>
                            {
                                this.props.route?.params?.gender == 'Male' ?
                                    <>
                                        <View style={styles.shoulderContainer1}>
                                            <View style={styles.shoulderStyle1}>
                                                <CheckBox
                                                    disabled={shoulder ? false : arr.length >= 2 ? true : false}
                                                    isChecked={shoulder} label="Shoulders" onPress={() => {
                                                        if (shoulder) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'shoulder');
                                                            console.log(data.filter((_, i) => i != index))
                                                            this.setState({ shoulder: !shoulder, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('shoulder')
                                                            this.setState({ shoulder: !shoulder, arr: data })

                                                        }
                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.chestContainer1}>
                                            <View style={styles.chestStyle1}>
                                                <CheckBox
                                                    disabled={chest ? false : arr.length >= 2 ? true : false}
                                                    isChecked={chest} label="Chest" onPress={() => {
                                                        if (chest) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'chest');
                                                            console.log(data.filter((_, i) => i != index))
                                                            this.setState({ chest: !chest, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('chest')
                                                            this.setState({ chest: !chest, arr: data })

                                                        }
                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.armContainer1}>
                                            <View style={styles.armStyle1}>
                                                <CheckBox
                                                    disabled={arm ? false : arr.length >= 2 ? true : false}
                                                    isChecked={arm} label="Arms" onPress={() => {
                                                        if (arm) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'arms');
                                                            console.log(data.filter((_, i) => i != index))
                                                            this.setState({ arm: !arm, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('arms')
                                                            this.setState({ arm: !arm, arr: data })

                                                        }
                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.gluteContainer1}>
                                            <View style={styles.gluteStyle1}>
                                                <CheckBox
                                                    disabled={glute ? false : arr.length >= 2 ? true : false}
                                                    isChecked={glute} label="Glutes" onPress={() => {
                                                        if (glute) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'glutes');
                                                            console.log(data.filter((_, i) => i != index))
                                                            this.setState({ glute: !glute, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('glutes')
                                                            this.setState({ glute: !glute, arr: data })

                                                        }
                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.backContainer1}>
                                            <View style={styles.backStyle1}>
                                                <CheckBox
                                                    isChecked={back}
                                                    disabled={back ? false : arr.length >= 2 ? true : false}
                                                    label="Back"
                                                    onPress={() => {
                                                        if (back) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'back');
                                                            console.log(data.filter((_, i) => i != index))
                                                            this.setState({ back: !back, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('back')
                                                            this.setState({ back: !back, arr: data })

                                                        }
                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.waistContainer1}>
                                            <View style={styles.waistStyle1}>
                                                <CheckBox
                                                    isChecked={waist}
                                                    disabled={waist ? false : arr.length >= 2 ? true : false}
                                                    label="Waist"
                                                    onPress={() => {
                                                        if (waist) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'waist');
                                                            console.log(data.filter((_, i) => i != index))
                                                            this.setState({ waist: !waist, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('waist')
                                                            this.setState({ waist: !waist, arr: data })

                                                        }
                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.legContainer1}>
                                            <View style={styles.legStyle1}>
                                                <CheckBox
                                                    disabled={leg ? false : arr.length >= 2 ? true : false}
                                                    isChecked={leg}
                                                    label="Legs"
                                                    onPress={() => {
                                                        if (leg) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'legs');
                                                            this.setState({ arr: data.filter((_, i) => i != index), leg: !leg, })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('legs')
                                                            this.setState({ leg: !leg, arr: data })

                                                        }
                                                    }} />
                                            </View>
                                        </View>
                                    </>
                                    :
                                    <>
                                        <View style={styles.shoulderContainer}>
                                            <View style={styles.shoulderStyle}>
                                                <CheckBox
                                                    disabled={shoulder ? false : arr.length >= 2 ? true : false}
                                                    isChecked={shoulder} label="Shoulders" onPress={() => {
                                                        if (shoulder) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'shoulder');
                                                            this.setState({ shoulder: !shoulder, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('shoulder')
                                                            this.setState({ shoulder: !shoulder, arr: data })

                                                        }

                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.chestContainer}>
                                            <View style={styles.chestStyle}>
                                                <CheckBox
                                                    disabled={chest ? false : arr.length >= 2 ? true : false}
                                                    isChecked={chest} label="Chest" onPress={() => {
                                                        if (chest) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'chest');
                                                            this.setState({ chest: !chest, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('chest')
                                                            this.setState({ chest: !chest, arr: data })

                                                        }

                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.armContainer}>
                                            <View style={styles.armStyle}>
                                                <CheckBox
                                                    disabled={arm ? false : arr.length >= 2 ? true : false}
                                                    isChecked={arm} label="Arms" onPress={() => {
                                                        if (arm) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'arms');
                                                            this.setState({ arm: !arm, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('arms')
                                                            this.setState({ arm: !arm, arr: data })
                                                        }

                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.gluteContainer}>
                                            <View style={styles.gluteStyle}>
                                                <CheckBox
                                                    disabled={glute ? false : arr.length >= 2 ? true : false}
                                                    isChecked={glute} label="Glutes" onPress={() => {
                                                        if (glute) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'glutes');
                                                            this.setState({ glute: !glute, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('glutes')
                                                            this.setState({ glute: !glute, arr: data })
                                                        }

                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.backContainer}>
                                            <View style={styles.backStyle}>
                                                <CheckBox
                                                    disabled={back ? false : arr.length >= 2 ? true : false}
                                                    isChecked={back}
                                                    label="Back"
                                                    onPress={() => {
                                                        if (back) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'back');
                                                            this.setState({ back: !back, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('back')
                                                            this.setState({ back: !back, arr: data })
                                                        }

                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.legContainer}>
                                            <View style={styles.legStyle}>
                                                <CheckBox
                                                    disabled={leg ? false : arr.length >= 2 ? true : false}
                                                    isChecked={leg}
                                                    label="Legs"
                                                    onPress={() => {
                                                        if (leg) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'legs');
                                                            this.setState({ leg: !leg, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('legs')
                                                            this.setState({ leg: !leg, arr: data })
                                                        }

                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.waistContainer}>
                                            <View style={styles.waistStyle}>
                                                <CheckBox
                                                    disabled={waist ? false : arr.length >= 2 ? true : false}
                                                    isChecked={waist}
                                                    label="Waist"
                                                    onPress={() => {
                                                        if (waist) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'waist');
                                                            this.setState({ waist: !waist, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('waist')
                                                            this.setState({ waist: !waist, arr: data })
                                                        }

                                                    }} />
                                            </View>
                                        </View>
                                    </>}
                        </ImageBackground>
                        <View style={styles.buttonContainer}>
                            <ClearButton disabled={arr.length == 2 ? false : true} loading={btnLoading} title={'Save'} onPress={() => this.handleDone()} />
                        </View>
                    </View>
                </ImageBackground>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChangeFocusArea);