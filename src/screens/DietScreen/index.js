import React, { Component } from "react";
import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Image } from "react-native";
import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment';
import Modal from 'react-native-modal'
import { Button, Container, DietModal, HorizontalList, Icon } from '../../components';
import More from '../../assets/svg/more.svg';

import Active from '../../assets/svg/Diet-active-icon.svg';
import Inactive from '../../assets/svg/Diet-Deactive-icon.svg';
import Cup from '../../assets/svg/cup.svg';
import Trophy from '../../assets/svg/trophy.svg';

import styles from './style';
import { route, SCREEN_WIDTH } from "../../lib/utils/constants";
import themeStyle from "../../assets/styles/theme.style";

export default class DietScreen extends Component {
    constructor(props) {
        super(props);
        this.onEndReached = this.onEndReached.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
        this.days = [
            {
                day: '1',
                completed: true
            },
            {
                day: '2',
                completed: true
            },
            {
                day: '3',
                completed: true
            },
            {
                day: '4',
                completed: true
            },
            {
                day: '5',
                completed: true
            },
            {
                day: '6',
                completed: true
            },
            {
                day: '7',
                completed: true
            }]
        this.days1 = [
            {
                day: '1',
                completed: true
            },
            {
                day: '2',
                completed: true
            },
        ]
        this.state = {
            like: false,
            noOfPurchased: 28,
            selected: null,
            isRefreshing: false,
            waiting: false,
            loading: true,
            value: "",
            dietModal: true,
            modal: false,
            completed: false,
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
                    title: 'Week 1',
                    days: this.days,
                    current: true,
                    description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                    icon: <Active />,
                },
                {
                    title: 'Week 2',
                    current: false,
                    days: this.days,
                    icon: <Inactive />,
                },
                {
                    title: 'Week 3',
                    current: false,
                    days: this.days,
                    icon: <Inactive />,
                },
                {
                    title: 'Week 4',
                    current: false,
                    days: this.days,
                    icon: <Inactive />,
                },
                {
                    title: 'Week 5',
                    current: false,
                    days: this.days1,
                    icon: <Inactive />,
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

    onRefresh() {
        this.setState({ isRefreshing: true });
        //refresh to initial data
        setTimeout(() => {
            //refresh to initial data
            this.setState({
                data: this.state.data,
                isRefreshing: false
            });
        }, 2000);
    }

    renderDetail = (rowData, sectionID, rowID) => {
        let title = <View style={styles.titleContainer}>
            <View style={styles.titleStyle}>
                <Text style={styles.title}>{rowData.title}</Text>
            </View>
            <View style={styles.leftTitleStyle}>
                <Text style={styles.title}>{rowData.current ? `${sectionID + 1}/4` : ""}</Text>
            </View>
        </View>
        var desc = null
        if (rowData.days)
            desc = (
                <View style={styles.descriptionContainer}>
                    {
                        rowData.days.map((item, index) => {
                            return (
                                <View style={styles.itemContainer}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate(route.DIETPLANDETAILS)} style={styles.dayStyle}>
                                        <Text style={[styles.textDescription]}>{item.day}</Text>
                                    </TouchableOpacity>
                                    {
                                        index == 3 ?
                                            null
                                            :
                                            <View style={{ marginLeft: 18, }}>
                                                <Icon.AntDesign name={"right"} size={20} color={"#9B9B9B"} />
                                            </View>
                                    }
                                </View>
                            )
                        })
                    }
                    <TouchableOpacity onPress={() => this.setState({ modal: true })} style={{ marginLeft: 12.5, }}>
                        {
                            this.state.completed ?
                                <Trophy />
                                :
                                <Cup />
                        }

                    </TouchableOpacity>
                </View>
            )

        return (
            <View style={{ flex: 1, }}>
                {title}
                {desc}
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
                            time: '09:00',
                            title: 'Archery Training',
                            description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                            lineColor: '#009688',
                            icon: <Active />,
                            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
                        },
                        {
                            time: '10:45',
                            title: 'Play Badminton',
                            description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
                            icon: <Inactive />,
                            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
                        },
                        {
                            time: '12:00',
                            title: 'Lunch',
                            icon: <Inactive />,
                        },
                        {
                            time: '14:00',
                            title: 'Watch Soccer',
                            description: 'Team sport played between two teams of eleven players with a spherical ball. ',
                            lineColor: '#009688',
                            icon: <Inactive />,
                            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
                        },
                        {
                            time: '16:30',
                            title: 'Go to Fitness center',
                            description: 'Look out for the Best Gym & Fitness Centers around me :)',
                            icon: <Inactive />,
                            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
                        }
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
                            lineColor={themeStyle.DASH_DARK}
                            circleStyle={{ marginTop: 0 }}
                            listViewContainerStyle={{ paddingTop: 10 }}
                            timeContainerStyle={{ minWidth: 52, marginTop: 15 }}
                            timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
                            descriptionStyle={{ color: 'gray' }}
                            options={{
                                style: { paddingTop: 5 },
                                refreshControl: (
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh} />),
                                renderFooter: this.renderFooter,
                                // onEndReached: this.onEndReached
                            }}
                            showTime={false}

                            innerCircle={'icon'}
                            onEventPress={this.onEventPress}
                            renderDetail={this.renderDetail}
                        />
                    </View>
                </ScrollView>
                <Modal isVisible={this.state.modal}>
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop:"5%", alignItems: "center" }}>
                            <Trophy fill={'#FFD31D'} />
                            <Text style={styles.headingText}>Congrats!</Text>
                            <Text style={styles.textStyle}>You just completed your 1st week</Text>
                        </View>

                        <View style={{ marginHorizontal: "15%", marginVertical: "5%" }}>
                            <Button title={'Continue'} onPress={() => this.setState({ modal: false, completed: true })} />
                        </View>
                    </View>

                </Modal>
                <DietModal visible={this.state.dietModal} onValue={(e) => this.setState({ value: e })} value={this.state.value} onSkip={() => this.setState({ dietModal: false })} />
            </Container>
        )
    }
}
