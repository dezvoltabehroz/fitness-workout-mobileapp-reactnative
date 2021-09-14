import React, { Component } from "react";
import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, Platform, UIManager, LayoutAnimation } from "react-native";
import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment';
import Modal from 'react-native-modal'
import { Button, Container, DietModal, HorizontalList, Icon } from '../../components';
import More from '../../assets/svg/more.svg';

import Active from '../../assets/svg/Diet-active-icon.svg';
import Inactive from '../../assets/svg/Diet-Deactive-icon.svg';
import Cup from '../../assets/svg/cup.svg';
import Trophy from '../../assets/svg/trophy.svg';
import BigCup from '../../assets/svg/img.svg';
import Mark from '../../assets/svg/mark.svg';

import styles from './style';
import { route, SCREEN_WIDTH } from "../../lib/utils/constants";
import themeStyle from "../../assets/styles/theme.style";

export default class DietScreen extends Component {
    constructor(props) {
        super(props);
        this.days = [
            {
                day: 'Mon',
                completed: true
            },
            {
                day: 'Tue',
                completed: true
            },
            {
                day: 'Wed',
                completed: true
            },
            {
                day: 'Thu',
                completed: true
            },
            {
                day: 'Fri',
                completed: true
            },
            {
                day: 'Sat',
                completed: true
            },
            {
                day: 'Sun',
                completed: true
            }]
        this.days1 = [
            {
                day: 'Mon',
                completed: true
            },
            {
                day: 'Tue',
                completed: true
            },
        ]
        this.state = {
            weekOneexpanded: false,
            week2ndexpanded: false,
            week3rdexpanded: false,
            week4thexpanded: false,
            week5thexpanded: false,
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
            ]
        }
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
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

    changeWeekOne = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ weekOneexpanded: !this.state.weekOneexpanded });
    }

    changeWeek2nd = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ week2ndexpanded: !this.state.week2ndexpanded });
    }
    changeWeek3rd = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ week3rdexpanded: !this.state.week3rdexpanded });
    }
    changeWeek4th = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ week4thexpanded: !this.state.week4thexpanded });
    }
    changeWeek5th = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ week5thexpanded: !this.state.week5thexpanded });
    }


    render() {
        return (
            <Container color>
                <ScrollView contentContainerStyle={{ paddingVertical: "5%" }}>
                    <HorizontalList data={this.state.data1} video />

                    <View>
                        <View style={styles.week1Style}>
                            <View style={styles.itemContainer} >
                                <TouchableOpacity onPress={() => this.changeWeekOne()} style={[styles.textContainer, { paddingBottom: this.state.weekOneexpanded ? 0 : '5%' }]}>
                                    <View style={styles.rowContainer}>
                                        <View style={[styles.row, { flex: 1 }]}>
                                            {this.state.weekOneexpanded ? <Active /> : <Inactive />}
                                            <Text style={this.state.weekOneexpanded ? { ...styles.colorText, marginLeft: 5 } : { ...styles.greyText, marginLeft: 5 }}>{'Week 1'}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: "center" }} >
                                            <View style={{ top: -27 }}>
                                                <Mark />
                                            </View>
                                            <View style={{ top: -15 }}>
                                                <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                            </View>
                                        </View>
                                    </View>
                                    {this.state.weekOneexpanded ? <View style={{ borderWidth: 0.5, marginVertical: "2.5%" }}></View> : null}
                                </TouchableOpacity>
                                {this.state.weekOneexpanded ?
                                    <View style={styles.descriptionContainer}>
                                        {
                                            this.days.map((item, index) => {
                                                return (
                                                    <View style={styles.itemContainer1}>
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate(route.DIETPLANDETAILS)} style={[styles.dayStyle, { backgroundColor: this.state.completed ? themeStyle.BAR_COLOR : 'transparent' }]}>
                                                            <Text style={[styles.textDescription, { color: this.state.completed ? 'white' : '#9B9B9B' }]}>{item.day}</Text>
                                                        </TouchableOpacity>
                                                        {
                                                            index == 3 ?
                                                                null
                                                                :
                                                                <View style={{ marginLeft: 10, }}>
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
                                    :
                                    null
                                }
                            </View>
                        </View>
                        <View style={styles.week1Style}>
                            <View style={styles.itemContainer} >
                                <TouchableOpacity onPress={() => this.changeWeek2nd()} style={[styles.textContainer, { paddingBottom: this.state.week2ndexpanded ? 0 : '5%' }]}>
                                    <View style={styles.rowContainer}>
                                        <View style={[styles.row, { flex: 1 }]}>
                                            {this.state.week2ndexpanded ? <Active /> : <Inactive />}
                                            <Text style={this.state.week2ndexpanded ? { ...styles.colorText, marginLeft: 5 } : { ...styles.greyText, marginLeft: 5 }}>{'Week 2'}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: "center" }} >
                                            <View style={{ top: -27 }}>
                                                <Mark />
                                            </View>
                                            <View style={{ top: -15 }}>
                                                <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                            </View>
                                        </View>
                                    </View>
                                    {this.state.week2ndexpanded ? <View style={{ borderWidth: 0.5, marginVertical: "2.5%" }}></View> : null}
                                </TouchableOpacity>
                                {this.state.week2ndexpanded ?
                                    <View style={styles.descriptionContainer}>
                                        {
                                            this.days.map((item, index) => {
                                                return (
                                                    <View style={styles.itemContainer1}>
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate(route.DIETPLANDETAILS)} style={[styles.dayStyle, { backgroundColor: this.state.completed ? themeStyle.BAR_COLOR : 'transparent' }]}>
                                                            <Text style={[styles.textDescription, { color: this.state.completed ? 'white' : '#9B9B9B' }]}>{item.day}</Text>
                                                        </TouchableOpacity>
                                                        {
                                                            index == 3 ?
                                                                null
                                                                :
                                                                <View style={{ marginLeft: 10, }}>
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
                                    :
                                    null
                                }
                            </View>
                        </View>
                        <View style={styles.week1Style}>
                            <View style={styles.itemContainer} >
                                <TouchableOpacity onPress={() => this.changeWeek3rd()} style={[styles.textContainer, { paddingBottom: this.state.week3rdexpanded ? 0 : '5%' }]}>
                                    <View style={styles.rowContainer}>
                                        <View style={[styles.row, { flex: 1 }]}>
                                            {this.state.week3rdexpanded ? <Active /> : <Inactive />}
                                            <Text style={this.state.week3rdexpanded ? { ...styles.colorText, marginLeft: 5 } : { ...styles.greyText, marginLeft: 5 }}>{'Week 3'}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: "center" }} >
                                            <View style={{ top: -27 }}>
                                                <Mark />
                                            </View>
                                            <View style={{ top: -15 }}>
                                                <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                            </View>
                                        </View>
                                    </View>
                                    {this.state.week3rdexpanded ? <View style={{ borderWidth: 0.5, marginVertical: "2.5%" }}></View> : null}
                                </TouchableOpacity>
                                {this.state.week3rdexpanded ?
                                    <View style={styles.descriptionContainer}>
                                        {
                                            this.days.map((item, index) => {
                                                return (
                                                    <View style={styles.itemContainer1}>
                                                       <TouchableOpacity onPress={() => this.props.navigation.navigate(route.DIETPLANDETAILS)} style={[styles.dayStyle, { backgroundColor: this.state.completed ? themeStyle.BAR_COLOR : 'transparent' }]}>
                                                            <Text style={[styles.textDescription, { color: this.state.completed ? 'white' : '#9B9B9B' }]}>{item.day}</Text>
                                                        </TouchableOpacity>
                                                        {
                                                            index == 3 ?
                                                                null
                                                                :
                                                                <View style={{ marginLeft: 10, }}>
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
                                    :
                                    null
                                }
                            </View>
                        </View>
                        <View style={styles.week1Style}>
                            <View style={styles.itemContainer} >
                                <TouchableOpacity onPress={() => this.changeWeek4th()} style={[styles.textContainer, { paddingBottom: this.state.week4thexpanded ? 0 : '5%' }]}>
                                    <View style={styles.rowContainer}>
                                        <View style={[styles.row, { flex: 1 }]}>
                                            {this.state.week4thexpanded ? <Active /> : <Inactive />}
                                            <Text style={this.state.week4thexpanded ? { ...styles.colorText, marginLeft: 5 } : { ...styles.greyText, marginLeft: 5 }}>{'Week 4'}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: "center" }} >
                                            <View style={{ top: -27 }}>
                                                <Mark />
                                            </View>
                                            <View style={{ top: -15 }}>
                                                <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                            </View>
                                        </View>
                                    </View>
                                    {this.state.week4thexpanded ? <View style={{ borderWidth: 0.5, marginBottom: "2.5%" }}></View> : null}
                                </TouchableOpacity>
                                {this.state.week4thexpanded ?
                                    <View style={styles.descriptionContainer}>
                                        {
                                            this.days.map((item, index) => {
                                                return (
                                                    <View style={styles.itemContainer1}>
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate(route.DIETPLANDETAILS)} style={[styles.dayStyle, { backgroundColor: this.state.completed ? themeStyle.BAR_COLOR : 'transparent' }]}>
                                                            <Text style={[styles.textDescription, { color: this.state.completed ? 'white' : '#9B9B9B' }]}>{item.day}</Text>
                                                        </TouchableOpacity>
                                                        {
                                                            index == 3 ?
                                                                null
                                                                :
                                                                <View style={{ marginLeft: 10, }}>
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
                                    :
                                    null
                                }
                            </View>
                        </View>
                        <View style={styles.week1Style}>
                            <View style={styles.itemContainer} >
                                <TouchableOpacity onPress={() => this.changeWeek5th()} style={[styles.textContainer, { paddingBottom: this.state.week5thexpanded ? 0 : '5%', }]}>
                                    <View style={styles.rowContainer}>
                                        <View style={[styles.row, { flex: 1 }]}>
                                            {this.state.week5thexpanded ? <Active /> : <Inactive />}
                                            <Text style={this.state.week5thexpanded ? { ...styles.colorText, marginLeft: 5 } : { ...styles.greyText, marginLeft: 5 }}>{'Week 5'}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: "center" }} >
                                            <View style={{ top: -27 }}>
                                                <Mark />
                                            </View>
                                            <View style={{ top: -15 }}>
                                                <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                            </View>
                                        </View>
                                    </View>
                                    {this.state.week5thexpanded ? <View style={{ borderWidth: 0.5, marginVertical: "2.5%" }}></View> : null}
                                </TouchableOpacity>
                                {this.state.week5thexpanded ?
                                    <View style={styles.descriptionContainer}>
                                        {
                                            this.days1.map((item, index) => {
                                                return (
                                                    <View style={styles.itemContainer1}>
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate(route.DIETPLANDETAILS)} style={[styles.dayStyle, { backgroundColor: this.state.completed ? themeStyle.BAR_COLOR : 'transparent' }]}>
                                                            <Text style={[styles.textDescription, { color: this.state.completed ? 'white' : '#9B9B9B' }]}>{item.day}</Text>
                                                        </TouchableOpacity>
                                                        {
                                                            index == 3 ?
                                                                null
                                                                :
                                                                <View style={{ marginLeft: 10, }}>
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
                                    :
                                    null
                                }
                            </View>
                        </View>
                        {/* <Timeline
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
                        /> */}
                    </View>
                </ScrollView>
                <Modal isVisible={this.state.modal}>
                    <View style={styles.cardContainer}>
                        <View style={{ marginTop: "5%", alignItems: "center" }}>
                            <BigCup />
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
