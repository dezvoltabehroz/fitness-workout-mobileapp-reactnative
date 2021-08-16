import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { Button, Container, Icon, NameModal } from "../../components";

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

export default class CompleteProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            nameModal: false,
            name: ""
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

    render() {
        const { tab, name } = this.state
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
                                    <Text style={styles.grayText}>Date of Month</Text>
                                </View>

                                <TouchableOpacity>
                                    <Plus />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowMeasureContainer}>
                                <View style={styles.rowStyle}>
                                    <Height />
                                    <Text style={styles.grayText}>Height</Text>
                                </View>

                                <TouchableOpacity>
                                    <Plus />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowMeasureContainer}>
                                <View style={styles.rowStyle}>
                                    <Icon.FontAwesome name="tachometer" color={'#797B7B'} size={20} />
                                    <Text style={styles.grayText}>Weight</Text>
                                </View>

                                <TouchableOpacity>
                                    <Plus />
                                </TouchableOpacity>
                            </View>
                            <View style={{ margin: "8%" }}>
                                <Button title={'Next'} onPress={() => this.setState({ tab: 1 })} />
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
                                        <Text style={styles.grayText}>Arm Size</Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Chest />
                                        <Text style={styles.grayText}>Chest Size</Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Shoulder />
                                        <Text style={styles.grayText}>Shoulder Size</Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Waist />
                                        <Text style={styles.grayText}>Waist</Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Tummy />
                                        <Text style={styles.grayText}>Tummy Size</Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Hip />
                                        <Text style={styles.grayText}>Hip Size</Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Thigh />
                                        <Text style={styles.grayText}>Thigh Size</Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <View style={styles.rowStyle}>
                                        <Calf />
                                        <Text style={styles.grayText}>Calft Size</Text>
                                    </View>

                                    <TouchableOpacity>
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ margin: "8%" }}>
                                    <Button title={'Next'} onPress={() => this.props.navigation.navigate(route.LOGIN)} />
                                </View>
                            </View>
                        </ScrollView>
                        :
                        null
                }
                <NameModal visible={this.state.nameModal} onChangeText={(name) => this.setState({ name: name })} onClose={() => this.setState({ nameModal: false })} onSave={() => this.setState({ nameModal: false })} />

            </Container>
        )
    }
}