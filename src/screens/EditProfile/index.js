import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { Button, Container, DateModal, Icon, NameModal } from "../../components";

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
import moment from "moment";

export default class CompleteProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            nameModal: false,
            dateModal: false,
            name: '',
            date: new Date(),
            dateValue:""
        }
    }

    render() {
        const { tab, name, date,dateValue } = this.state
        return (
            <Container>


                <View style={styles.cardContainer}>

                    <View style={{ marginTop: "10%", alignItems: "center" }}>
                        <Text style={styles.headingText}>MY ACCOUNT</Text>
                        <Text style={styles.textStyle}>Lets us know you better to help boost your workout result lorem ipsum...</Text>
                    </View>
                    <View style={styles.rowMeasureContainer}>
                        <View style={styles.row}>
                            <Name />
                            <Text style={styles.grayText}>{name ? name : 'Full Name'}</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.setState({ nameModal: true })} >
                            <Plus />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowMeasureContainer}>
                        <View style={styles.row}>
                            <DOB />
                            <Text style={styles.grayText}>{dateValue?dateValue:"Date of Month"}Date of Month</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.setState({ dateModal: true })}>
                            <Plus />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowMeasureContainer}>
                        <View style={styles.row}>
                            <Height />
                            <Text style={styles.grayText}>Height</Text>
                        </View>

                        <TouchableOpacity>
                            <Plus />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowMeasureContainer}>
                        <View style={styles.row}>
                            <Icon.FontAwesome name="tachometer" color={'#797B7B'} size={20} />
                            <Text style={styles.grayText}>Weight</Text>
                        </View>

                        <TouchableOpacity>
                            <Plus />
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: "8%", marginHorizontal: "20%" }}>
                        <Button title={'Save'} onPress={() => this.props.navigation.goBack()} />
                    </View>
                </View>
                <NameModal visible={this.state.nameModal} onChangeText={(name) => this.setState({ name: name })} onClose={() => this.setState({ nameModal: false })} onSave={() => this.setState({ nameModal: false })} />
                <DateModal date={date} visible={this.state.dateModal} setDate={(name) => this.setState({ date: name })} onClose={() => this.setState({ dateModal: false })} onSave={() => this.setState({ dateModal: false, dateValue: moment(this.state.date).format('llll') })} />
            </Container>
        )
    }
}