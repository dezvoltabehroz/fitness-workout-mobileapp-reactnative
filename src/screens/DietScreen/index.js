import React, { Component } from "react";
import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Image } from "react-native";
import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment';

import { Container, DietModal, HorizontalList } from '../../components';
import More from '../../assets/svg/more.svg';

import styles from './style';
import { SCREEN_WIDTH } from "../../lib/utils/constants";

export default class DietScreen extends Component {
    constructor(props) {
        super(props);
        this.onEndReached = this.onEndReached.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
        this.state = {
            like: false,
            noOfPurchased: 28,
            selected: null,
            isRefreshing: false,
            waiting: false,
            loading: true,
            value: "",
            dietModal: true,
            data1: [
                {
                    title: "Diet Video Name",
                },
                {
                    title: "Body Warmups",
                }
            ],
            data: [
                {
                    jobName: 'Security Guard',
                    responsibitlity: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    experience: '6 Months',
                    period: '6 dec, 2020 - 12 jun , 2021',
                },
                {
                    jobName: 'Security Guard',
                    responsibitlity: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    experience: '6 Months',
                    period: '6 dec, 2020 - 12 jun , 2021',
                },
                {
                    jobName: 'Security Guard',
                    responsibitlity: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    experience: '6 Months',
                    period: '6 dec, 2020 - 12 jun , 2021',
                },
                {
                    jobName: 'Security Guard',
                    responsibitlity: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    experience: '6 Months',
                    period: '6 dec, 2020 - 12 jun , 2021',
                    start_year: "6 dec, 2020",
                    end_year: "12 jun , 2021"
                },
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

    onRefresh() {
        this.setState({ isRefreshing: true });
        //refresh to initial data
        setTimeout(() => {
            //refresh to initial data
            this.setState({
                data: this.data,
                isRefreshing: false
            });
        }, 2000);
    }
    getRandomColor = () => {
        var letters = '01234ABCDEF';
        var color = '#';
        for (var i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    renderDetail(rowData, sectionID, rowID) {
        let title = <View style={{ backgroundColor: 'hsla(' + (Math.random() * 350) + ', 70%, 50%, 1)', marginTop: -10, right: 35, borderRadius: 50, height: 30, width: SCREEN_WIDTH * 0.4, justifyContent: 'center', }}>
            <Text style={[styles.title, { textTransform: "capitalize" }]}>{rowData.jobName}</Text>
        </View>
        var desc = null
        if (rowData.jobName)
            desc = (
                <View style={[styles.purchasedListContainer]}>
                    <TouchableOpacity  >
                        <View style={styles.featureCardContainer}>
                            <View style={styles.purchasedNameContainer}>
                                <View>
                                    <Text style={styles.dateOfPurchasedTextStyle}>Responsibitlity</Text>
                                    <Text style={[styles.purchasedTextStyle, { width: SCREEN_WIDTH * 0.7 }]}>{rowData.responsibitlity}</Text>
                                </View>
                                <TouchableOpacity style={{}}>
                                    <Image source={require('../../assets/images/diet.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.purchasedNameContainer}>
                                <View>
                                    <Text style={styles.dateOfPurchasedTextStyle}>Experience</Text>
                                    <Text style={styles.purchasedTextStyle}>{parseInt(moment(rowData.end_year).format("YYYY")) - parseInt(moment(rowData.start_year).format("YYYY"))} years</Text>
                                </View>
                            </View>
                            <View style={styles.purchasedNameContainer}>
                                <View>
                                    <Text style={styles.dateOfPurchasedTextStyle}>Period</Text>
                                    <Text style={[styles.purchasedTextStyle, { width: SCREEN_WIDTH * 0.7 }]}>{moment(rowData.start_year).format("DD MMM, YYYY")} - {moment(rowData.end_year).format("DD MMM, YYYY")} </Text>
                                </View>
                                <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/diet.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        return (
            <View style={{ flex: 1 }}>
                {title}
                <View style={{ padding: 0 }}>
                    {desc}
                </View>
            </View>
        )
    }

    // After scroll reach at then fecth data and load it 
    onEndReached() {
        if (!this.state.waiting) {
            this.setState({ waiting: true });
            //fetch and concat data
            setTimeout(() => {
                // refresh to initial data
                var data = this.state.data.concat(
                    [
                        {
                            jobName: 'Security Guard',
                            responsibitlity: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                            experience: '6 Months',
                            period: '6 dec, 2020 - 12 jun , 2021',
                        },
                        {
                            jobName: 'Security Guard',
                            responsibitlity: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                            experience: '6 Months',
                            period: '6 dec, 2020 - 12 jun , 2021',
                        },
                        {
                            jobName: 'Security Guard',
                            responsibitlity: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                            experience: '6 Months',
                            period: '6 dec, 2020 - 12 jun , 2021',
                        },
                        {
                            jobName: 'Security Guard',
                            responsibitlity: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                            experience: '6 Months',
                            period: '6 dec, 2020 - 12 jun , 2021',
                        },
                    ]
                )
                this.setState({
                    waiting: false,
                    data: data,
                });
            }, 2000);
        }
    }

    renderFooter() {
        if (this.state.waiting) {
            return <ActivityIndicator />;
        } else {
            return <Text>~</Text>;
        }
    }



    render() {
        return (
            <Container>
                <ScrollView contentContainerStyle={{ paddingVertical: "5%" }}>
                    <HorizontalList data={this.state.data1} video />

                    <View>
                        <Timeline
                            style={styles.list}
                            data={this.state.data}
                            circleSize={20}
                            circleColor='rgb(255, 200, 0)'
                            lineColor='grey'
                            options={{
                                style: { paddingTop: 5 }
                            }}
                            timeContainerStyle={{ minWidth: 52, marginTop: -15 }}
                            options={{
                                style: { paddingTop: 5 },
                                refreshControl: (
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh} />),
                                // renderFooter: this.renderFooter,
                                // onEndReached: this.onEndReached
                            }}
                            renderCircle={() => { }}
                            innerCircle={'dot'}
                            showTime={false}
                            renderDetail={(navigation) => this.renderDetail(navigation)} />
                    </View>

                </ScrollView>
                <DietModal visible={this.state.dietModal} onValue={(e) => this.setState({ value: e })} value={this.state.value} onSkip={() => this.setState({ dietModal: false })} />
            </Container>
        )
    }
}
