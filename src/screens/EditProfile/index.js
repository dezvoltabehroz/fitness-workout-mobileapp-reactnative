import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import themeStyle from "../../assets/styles/theme.style";
import { Button, Container, Icon, NameModal, DateModal, HeightModal, WeightModal } from "../../components";

import Plus from '../../assets/svg/plus.svg'
import DOB from '../../assets/svg/DOB.svg'
import Name from '../../assets/svg/name.svg'
import Height from '../../assets/svg/Height.svg'


import styles from './style';
import moment from "moment";

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
            nextLoading: false
        }
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
                        this.setState({ nextLoading: false, })
                        this.props.navigation.goBack()
                    }
                })
                .catch((err) => console.log(err.response))
        } else {
            this.setState({ nextLoading: false })
            alert('Please fill complete data')
        }

    }

    render() {
        const { tab, name, date, dateValue, weight, height, feet, inch, nextLoading } = this.state
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
                    <View style={{ margin: "8%", marginHorizontal: "20%" }}>
                        <Button title={'Save'} onPress={() => this.handleOnPressNext()} />
                    </View>
                </View>
                <NameModal visible={this.state.nameModal} onChangeText={(name) => this.setState({ name: name })} onClose={() => this.setState({ nameModal: false })} onSave={() => this.setState({ nameModal: false })} />
                <DateModal date={date} visible={this.state.dateModal} setDate={(name) => this.setState({ date: name })} onClose={() => this.setState({ dateModal: false })} onSave={() => this.setState({ dateModal: false, dateValue: moment(this.state.date).format('ll') })} />
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
            </Container>
        )
    }
}