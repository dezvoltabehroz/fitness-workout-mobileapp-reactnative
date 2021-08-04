import React, { Component } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

import { Container, DietModal, HorizontalList } from '../../components';
import More from '../../assets/svg/more.svg';

export default class DietScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            dietModal: true,
            data1: [
                {
                    title: "Diet Video Name",
                },
                {
                    title: "Body Warmups",
                }
            ]
        }
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerRight: () => this.headerRight(),
        });
    }

    headerRight = () => {
        return (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { this.setState({ dietModal: !this.state.dietModal }) }} ><More /></TouchableOpacity>
        )
    }


    render() {
        return (
            <Container>
                <ScrollView contentContainerStyle={{ paddingVertical: "5%" }}>
                    <HorizontalList data={this.state.data1} video />
                </ScrollView>
                <DietModal visible={this.state.dietModal} onValue={(e) => this.setState({ value: e })} value={this.state.value} onSkip={() => this.setState({ dietModal: false })} />
            </Container>
        )
    }
}
