import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import {
    Button, Container, Icon, NameModal, DateModal, HeightModal, WeightModal,
    ArmSizeModal, ChestSizeModal, CalftSizeModal, ShoulderSizeModal, ThighSizeModal, TummySizeModal, HipSizeModal, WaistSizeModal
} from "../../components";

import Plus from '../../assets/svg/plus.svg'
import DOB from '../../assets/svg/DOB.svg'
import Name from '../../assets/svg/name.svg'
import Height from '../../assets/svg/Height.svg'

import Arm from '../../assets/svg/Arm.svg'
import Calf from '../../assets/svg/calf.svg'
import Chest from '../../assets/svg/chest.svg'
import Hip from '../../assets/svg/hip.svg'
import Shoulder from '../../assets/svg/Shoulder.svg'
import Thigh from '../../assets/svg/thigh.svg'
import Tummy from '../../assets/svg/tummy.svg'
import Waist from '../../assets/svg/waist.svg'

import styles from './style';
import { route } from "../../lib/utils/constants";
import moment from "moment";
import { getLocalData, LOCAL_STORAGE_KEYS } from "../../lib/utils/localstorage";
import { ProfileServices } from "../../services";

export default class CompleteProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            nameModal: false,
            dateModal: false,
            weightModal: false,
            heightModal: false,
            date: new Date(),
            dateValue: "",
            name: "",
            weight: "",
            feet: "",
            inch: "",
            nextLoading: false,
            arm: "",
            chest: "",
            shoulder: "",
            waist: "",
            hip: "",
            tummy: "",
            thigh: "",
            calft: ""
        }
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerLeft: () => this.headerLeft()
        });
    }

    headerLeft = () => {
        return (
            <TouchableOpacity onPress={() => {
                if (this.state.tab == 0) {
                    this.props.navigation.goBack()
                }
                else {
                    this.setState({ tab: 0 })
                }
            }} style={{ marginLeft: 20 }} ><Icon.AntDesign name="arrowleft" size={25} color="white" /></TouchableOpacity>
        )
    }

    handleOnPressNext = async () => {
        const { tab, name, date, dateValue, weight, height, feet, inch } = this.state;
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id);
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken);
        if (name && dateValue && inch && weight && feet) {
            let data = {
                "full_name": name,
                "dob": moment(dateValue).format('YYYY-MM-DD'),
                "height_feet": parseInt(feet),
                "height_inches": parseInt(inch),
                "weight": parseFloat(weight),
                "user_id": JSON.parse(user_id)
            }
            ProfileServices.updateProfile(data, JSON.parse(userToken))
                .then((response) => {
                    if (response.data.success) {
                        this.setState({ nextLoading: false, tab: 1 })
                    }
                })
                .catch((err) => console.log(err.response))
        } else {
            this.setState({ nextLoading: false })
            alert('Please fill complete data')
        }

    }

    handleOnPressNext2 = async () => {
        const { arm,
            chest,
            shoulder,
            waist,
            hip,
            tummy,
            thigh,
            calft, } = this.state;
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id);
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken);
        if (arm && chest && waist && hip && tummy && thigh && calft) {
            let data = {
                "arm_size": parseFloat(arm),
                "chest_size": parseFloat(chest),
                "shoulder_size": parseFloat(shoulder),
                "waist_size": parseFloat(waist),
                "tummy_size": parseFloat(tummy),
                "hip_size": parseFloat(hip),
                "thigh_size": parseFloat(thigh),
                "calf_size": parseFloat(calft),
                "user_id": JSON.parse(user_id)
            }
            ProfileServices.updateMeasurement(data, JSON.parse(userToken))
                .then((response) => {
                    if (response.data.success) {
                        this.setState({ next2Loading: false, })
                        this.props.navigation.navigate(route.LOGIN)
                    }
                })
                .catch((err) => console.log(err.response))
        } else {
            this.setState({ nextLoading: false })
            alert('Please fill complete data')
        }

    }

    render() {
        const { tab, name, date, dateValue, weight, height, feet, inch, nextLoading, arm,next2Loading, chest, shoulder, waist, hip, tummy, thigh, calft } = this.state

        return (
            <Container>




                {
                    tab == 0 ?
                        <View style={styles.cardContainer}>
                            <View style={styles.row}>
                                <Icon.Octicons name="primitive-dot" color={tab == 0 ? themeStyle.BAR_COLOR : '#797B7B'} size={15} />
                                <Icon.Octicons name="primitive-dot" color={tab == 1 ? themeStyle.BAR_COLOR : '#797B7B'} size={15} style={{ marginLeft: '5%' }} />
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.headingText}>MY ACCOUNT</Text>
                                <Text style={styles.textStyle}>Lets us know you better to help boost your workout result lorem ipsum...</Text>
                            </View>
                            <View style={styles.rowMeasureContainer}>
                                <View style={styles.rowStyle}>
                                    <Name />
                                    <Text style={styles.grayText}>{name ? name : 'Full Name'}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ nameModal: true })}>
                                    <Plus />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowMeasureContainer}>
                                <View style={styles.rowStyle}>
                                    <DOB />
                                    <Text style={styles.grayText}>{dateValue ? dateValue : 'Date of Birth'}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ dateModal: true })}>
                                    <Plus />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowMeasureContainer}>
                                <View style={styles.rowStyle}>
                                    <Height />
                                    <Text style={styles.grayText}>{feet && inch ? `${feet}'${inch}"` : 'Height'}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ heightModal: true })}>
                                    <Plus />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowMeasureContainer}>
                                <View style={styles.rowStyle}>
                                    <Icon.FontAwesome name="tachometer" color={'#797B7B'} size={20} />
                                    <Text style={styles.grayText}>{weight ? weight : 'Weight'}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ weightModal: true })} >
                                    <Plus />
                                </TouchableOpacity>
                            </View>
                            <View style={{ margin: "8%" }}>
                                <Button loading={nextLoading} title={'Next'} onPress={() => { this.setState({ nextLoading: true }, () => this.handleOnPressNext()) }} />
                            </View>
                        </View>
                        :
                        null
                }
                {
                    tab == 1 ?
                        <ScrollView contentContainerStyle={{ paddingBottom: "10%" }}>
                            <View style={styles.cardContainer}>
                                <View style={styles.row}>
                                    <Icon.Octicons name="primitive-dot" color={themeStyle.BAR_COLOR} size={15} />
                                    <Icon.Octicons name="primitive-dot" color={tab == 1 ? themeStyle.BAR_COLOR : '#797B7B'} size={15} style={{ marginLeft: '5%' }} />
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={styles.headingText}>MY MEASUREMENTS</Text>
                                    <Text style={styles.textStyle}>Lets us know you better to help boost your workout result lorem ipsum...</Text>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Arm />
                                        <Text style={styles.grayText}>{arm ? arm : "Arm Size"}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ armSizeModal: true })}>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Chest />
                                        <Text style={styles.grayText}>{chest ? chest : "Chest Size"}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ chestSizeModal: true })}>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Shoulder />
                                        <Text style={styles.grayText}>{shoulder ? shoulder : "Shoulder Size"}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ shoulderSizeModal: true })}>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Waist />
                                        <Text style={styles.grayText}>{waist ? waist : "Waist Size"}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ waistSizeModal: true })}>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Tummy />
                                        <Text style={styles.grayText}>{tummy ? tummy : "Tummy Size"}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ tummySizeModal: true })}>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Hip />
                                        <Text style={styles.grayText}>{hip ? hip : "Hip Size"}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ hipSizeModal: true })}>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Thigh />
                                        <Text style={styles.grayText}>{thigh ? thigh : "Thigh Size"}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ thighSizeModal: true })}>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Calf />
                                        <Text style={styles.grayText}>{calft ? calft : "Calft Size"}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ calftSizeModal: true })}>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ margin: "8%" }}>
                                    <Button loading={next2Loading} title={'Next'} onPress={() =>{ this.setState({ next2Loading: true }, () => this.handleOnPressNext2()) }} />
                                </View>
                            </View>
                        </ScrollView>
                        :
                        null
                }
                <NameModal
                    visible={this.state.nameModal}
                    onChangeText={(name) => this.setState({ name: name })}
                    onClose={() => this.setState({ nameModal: false })}
                    onSave={() => this.setState({ nameModal: false })}
                />
                <DateModal date={date} visible={this.state.dateModal}
                    setDate={(name) => this.setState({ date: name })}
                    onClose={() => this.setState({ dateModal: false })}
                    onSave={() => this.setState({ dateModal: false, dateValue: moment(this.state.date).format('ll') })}
                />
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
                <ArmSizeModal
                    visible={this.state.armSizeModal}
                    onChangeText={(name) => this.setState({ arm: name })}
                    onClose={() => this.setState({ armSizeModal: false })}
                    onSave={() => this.setState({ armSizeModal: false })} />
                <ChestSizeModal
                    visible={this.state.chestSizeModal}
                    onChangeText={(name) => this.setState({ chest: name })}
                    onClose={() => this.setState({ chestSizeModal: false })}
                    onSave={() => this.setState({ chestSizeModal: false })} />
                <ShoulderSizeModal
                    visible={this.state.shoulderSizeModal}
                    onChangeText={(name) => this.setState({ shoulder: name })}
                    onClose={() => this.setState({ shoulderSizeModal: false })}
                    onSave={() => this.setState({ shoulderSizeModal: false })} />
                <WaistSizeModal
                    visible={this.state.waistSizeModal}
                    onChangeText={(name) => this.setState({ waist: name })}
                    onClose={() => this.setState({ waistSizeModal: false })}
                    onSave={() => this.setState({ waistSizeModal: false })} />
                <TummySizeModal
                    visible={this.state.tummySizeModal}
                    onChangeText={(name) => this.setState({ tummy: name })}
                    onClose={() => this.setState({ tummySizeModal: false })}
                    onSave={() => this.setState({ tummySizeModal: false })} />
                <HipSizeModal
                    visible={this.state.hipSizeModal}
                    onChangeText={(name) => this.setState({ hip: name })}
                    onClose={() => this.setState({ hipSizeModal: false })}
                    onSave={() => this.setState({ hipSizeModal: false })} />
                <ThighSizeModal
                    visible={this.state.thighSizeModal}
                    onChangeText={(name) => this.setState({ thigh: name })}
                    onClose={() => this.setState({ thighSizeModal: false })}
                    onSave={() => this.setState({ thighSizeModal: false })} />
                <CalftSizeModal
                    visible={this.state.calftSizeModal}
                    onChangeText={(name) => this.setState({ calft: name })}
                    onClose={() => this.setState({ calftSizeModal: false })}
                    onSave={() => this.setState({ calftSizeModal: false })} />
            </Container>
        )
    }
}