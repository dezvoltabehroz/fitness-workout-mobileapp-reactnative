import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';

import { Button, CheckBox, ClearButton, Container } from '../../components';
import { route, screen } from '../../lib/utils/constants';

import HeaderView from './components/headerView';
import Target from '../../assets/svg/706.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import { LOCAL_STORAGE_KEYS, storeLocalData, getLocalData } from '../../lib/utils/localstorage';

class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            arr: [],
            value: 0,
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
    }

    handleDone = () => {
        let array = [...this.state.arr];
        array.forEach(element => {
            if (element == 'shoulder') {
                storeLocalData(LOCAL_STORAGE_KEYS.focusAreaShoulder, JSON.stringify('1'))
            } else if (element == 'arm') {
                storeLocalData(LOCAL_STORAGE_KEYS.focusAreaArms, JSON.stringify('1'))
            } else if (element == 'chest') {
                storeLocalData(LOCAL_STORAGE_KEYS.focusAreaChest, JSON.stringify('1'))
            } else if (element == 'back') {
                storeLocalData(LOCAL_STORAGE_KEYS.focusAreaBack, JSON.stringify('1'))
            } else if (element == 'glute') {
                storeLocalData(LOCAL_STORAGE_KEYS.focusAreaGlutes, JSON.stringify('1'))
            } else if (element == 'leg') {
                storeLocalData(LOCAL_STORAGE_KEYS.focusAreaLegs, JSON.stringify('1'))
            } else if (element == 'waist') {
                storeLocalData(LOCAL_STORAGE_KEYS.focusAreaWaist, JSON.stringify('1'))
            }
        });
        this.props.navigation.navigate(route.CREATINGPLAN)
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        let { gender } = this.props.route.params
        const { shoulder, chest, glute, back, arm, leg, waist, arr, equipment } = this.state;
        return (
            <Container>
                <StatusBar backgroundColor={themeStyle.DASH_DARK} />
                <ImageBackground resizeMode={"cover"} source={require('../../assets/images/bg.png')} style={styles.bgStyle}>
                    <HeaderView goBack={() => goBack()} />

                    <View style={styles.container}>
                        <View style={styles.targetContainer}>
                            <Target />
                        </View>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_5}</Text>
                            <Text style={styles.decsTextStyle}>Select two focus areas so we could personalize your plan.</Text>
                        </View>
                        <ImageBackground style={styles.imageStyle} resizeMode="cover" source={gender == 'male' ? require('../../assets/images/boy.png') : require('../../assets/images/girl.png')}>
                            {
                                gender == 'male' ?
                                    <>
                                        <View style={styles.shoulderContainer1}>
                                            <View style={styles.shoulderStyle1}>
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
                                        <View style={styles.chestContainer1}>
                                            <View style={styles.chestStyle1}>
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
                                        <View style={styles.armContainer1}>
                                            <View style={styles.armStyle1}>
                                                <CheckBox isChecked={arm}
                                                    disabled={arm ? false : arr.length >= 2 ? true : false}
                                                    label="Arms" onPress={() => {
                                                        if (arm) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'arm');
                                                            this.setState({ arm: !arm, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('arm')
                                                            this.setState({ arm: !arm, arr: data })

                                                        }
                                                    }} />
                                            </View>
                                        </View>
                                        <View style={styles.gluteContainer1}>
                                            <View style={styles.gluteStyle1}>
                                                <CheckBox disabled={glute ? false : arr.length >= 2 ? true : false} isChecked={glute} label="Glutes" onPress={() => {
                                                    if (glute) {
                                                        let data = [...arr];
                                                        const index = data.findIndex(item => item === 'glute');
                                                        this.setState({ glute: !glute, arr: data.filter((_, i) => i != index) })
                                                    } else {
                                                        let data = [...arr];
                                                        data.push('glute')
                                                        this.setState({ glute: !glute, arr: data })

                                                    }
                                                }} />
                                            </View>
                                        </View>
                                        <View style={styles.backContainer1}>
                                            <View style={styles.backStyle1}>
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
                                        <View style={styles.waistContainer1}>
                                            <View style={styles.waistStyle1}>
                                                <CheckBox
                                                    disabled={waist ? false : arr.length >= 2 ? true : false}
                                                    isChecked={waist}
                                                    label="Wasit"
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
                                        <View style={styles.legContainer1}>
                                            <View style={styles.legStyle1}>
                                                <CheckBox
                                                    disabled={leg ? false : arr.length >= 2 ? true : false}
                                                    isChecked={leg}
                                                    label="Legs"
                                                    onPress={() => {
                                                        if (leg) {
                                                            let data = [...arr];
                                                            const index = data.findIndex(item => item === 'leg');
                                                            this.setState({ leg: !leg, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('leg')
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
                                                            const index = data.findIndex(item => item === 'arm');
                                                            this.setState({ arm: !arm, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('arm')
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
                                                            const index = data.findIndex(item => item === 'glute');
                                                            this.setState({ glute: !glute, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('glute')
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
                                                            const index = data.findIndex(item => item === 'leg');
                                                            this.setState({ leg: !leg, arr: data.filter((_, i) => i != index) })
                                                        } else {
                                                            let data = [...arr];
                                                            data.push('leg')
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
                            <ClearButton disabled={equipment == screen.APP_INTRO_Button_4_3 && arr.length == 2 ? false : equipment != screen.APP_INTRO_Button_4_3 && arr.length == 2 ? false : true} title={'DONE'} onPress={() => this.handleDone()} />
                        </View>
                    </View>
                </ImageBackground>
            </Container>

        )
    }
}
export default AppIntro;