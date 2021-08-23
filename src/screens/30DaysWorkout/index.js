import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, ImageBackground, TouchableOpacity, UIManager, Platform, LayoutAnimation } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import CircularProgress from 'react-native-circular-progress-indicator';

import { Container, HorizontalList, Icon, UpgradeModal } from '../../components';
import { route, SCREEN_WIDTH } from '../../lib/utils/constants';
import { VerticalSpacer } from '../../lib/utils/global';
import WFire from '../../assets/svg/white-fire.svg';
import Fire from '../../assets/svg/stopwatch.svg';
import Mark from '../../assets/svg/mark.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import moment from 'moment';
import Button from '../../components/Button';
const progressCustomStyles = {
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: "center",
    backgroundColor: themeStyle.BAR_COLOR
};
class PowerOfMind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    day: "01",
                    expanded: false,
                    date: new Date(),
                },
                {
                    day: "02",
                    expanded: false,
                    date: "2021-08-02",
                    locked: true
                },
                {
                    day: "03",
                    expanded: false,
                    date: "2021-08-03",
                    locked: true
                },
                {
                    day: "04",
                    expanded: false,
                    date: "2021-08-04",
                    locked: true
                },
                {
                    day: "05",
                    expanded: false,
                    date: "2021-08-05",
                    locked: true
                },
            ],
            upgradeModal: false,
        }
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
        ];
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    changeLayout = (index) => {
        let array = [...this.state.data];
        if (array[index].expanded) {
            array[index] = { ...array[index], expanded: false }
        } else {
            array[index] = { ...array[index], expanded: true }
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ data: array });
    }

    _renderItem = ({ item, index }) => {
        let array = index == 4 ? [...this.days1] : [...this.days]
        return (
            <View style={styles.itemContainer} >
                <TouchableOpacity onPress={() => {
                    if (item.locked) {
                        this.setState({ upgradeModal: true })
                    } else {
                        this.changeLayout(index)
                    }
                }
                } style={styles.textContainer}>
                    <Text style={styles.greyText}>{'Week'}</Text>
                    <View style={styles.rowContainer}>
                        <View style={[styles.row, { flex: 1 }]}>
                            <Text style={styles.dayText}>{item.day}</Text>
                            <View style={{ flex: 1 }}>
                                <View style={[styles.row, { marginLeft: 10 }]}>
                                    <Icon.FontAwesome5 name="calendar-day" size={20} color={'gray'} />
                                    <Text style={[styles.greyText, { marginLeft: 5 }]}>7 Days</Text>
                                </View>
                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                    <ProgressBarAnimated
                                        width={SCREEN_WIDTH * 0.15}
                                        height={5}
                                        value={20}
                                        {...progressCustomStyles}
                                        onComplete={() => { Alert.alert('Hey!', 'onComplete event fired!'); }}
                                    />
                                </View>

                            </View>
                        </View>
                        <View style={{ flex: 0.2, alignItems: "center" }} >
                            {
                                item.locked ?
                                    <View style={{ top: -42 }}>
                                        <Mark />
                                    </View>
                                    :
                                    null
                            }
                            {
                                moment(item.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ?
                                    <CircularProgress
                                        value={100}
                                        duration={2000}
                                        radius={30}
                                        textColor={'#1F2729'}
                                        textStyle={styles.textStyle}
                                        activeStrokeWidth={1}
                                        inActiveStrokeWidth={1}
                                        activeStrokeColor={themeStyle.BAR_COLOR}
                                        inActiveStrokeColor={'lightgray'}
                                        inActiveStrokeOpacity={1}
                                        valueSuffix={'%'}
                                        onAnimationComplete={() => { this.setState({ value: true }) }}
                                    />
                                    :
                                    <View style={{ top: item.locked ? -15 : 0 }}>
                                        <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                    </View>

                            }

                        </View>
                    </View>

                </TouchableOpacity>
                {item.expanded ?
                    array.map((i, inde) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                if (item.locked) {
                                    this.setState({ upgradeModal: true })
                                } else {
                                    this.props.navigation.navigate(route.DAYSWORKOUTVIDEOS)
                                }
                            }} style={styles.itemContainer} >
                                <View style={styles.textContainer}>
                                    <Text style={styles.greyText}>{'Day'}</Text>
                                    <View style={styles.rowContainer1}>
                                        <View style={[styles.row, { flex: 1 }]}>
                                            <Text style={styles.dayText}>{i.day}</Text>
                                            <View style={{ flex: 1 }}>
                                                <View style={[styles.row, { marginLeft: 10 }]}>
                                                    <Fire />
                                                    <Text style={[styles.greyText, { marginLeft: 5 }]}>9 Min</Text>
                                                </View>
                                                <View style={{ marginLeft: 10, marginTop: 5 }}>
                                                    <ProgressBarAnimated
                                                        width={SCREEN_WIDTH * 0.15}
                                                        height={5}
                                                        value={20}
                                                        {...progressCustomStyles}
                                                        onComplete={() => { Alert.alert('Hey!', 'onComplete event fired!'); }}
                                                    />
                                                </View>

                                            </View>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: "center" }} >

                                            <CircularProgress
                                                value={100}
                                                duration={2000}
                                                radius={30}
                                                textColor={'#1F2729'}
                                                textStyle={styles.textStyle}
                                                activeStrokeWidth={1}
                                                inActiveStrokeWidth={1}
                                                activeStrokeColor={themeStyle.BAR_COLOR}
                                                inActiveStrokeColor={'lightgray'}
                                                inActiveStrokeOpacity={1}
                                                valueSuffix={'%'}
                                                onAnimationComplete={() => { this.setState({ value: true }) }}
                                            />
                                        </View>
                                    </View>
                                    {/* {
                                            moment(item.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ?
                                                <Button title={'GO'} onPress={() => this.props.navigation.navigate(route.DAYSWORKOUTVIDEOS)} />
                                                :
                                                null
                                        } */}
                                </View>
                            </TouchableOpacity>
                        )
                    })

                    :
                    null
                }
            </View>
        )
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container color>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.upperContainer}>
                            <ImageBackground imageStyle={styles.stylingImage} style={styles.imageStyle} source={require('../../assets/images/chest-work.jpg')}>
                                <Text style={styles.headingText1} >30 DAY'S WORKOUT</Text>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.headingText}>Day {this.state.data[0].day}</Text>
                                    <View style={styles.row}>
                                        <WFire />
                                        <Text style={[styles.whiteText, { marginHorizontal: 5 }]}>10 Workouts</Text>
                                    </View>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.whiteText}>30 Days Left</Text>
                                    <Text style={styles.whiteText} >10 %</Text>
                                </View>
                                <ProgressBarAnimated
                                    width={SCREEN_WIDTH * 0.9}
                                    height={10}
                                    value={20}
                                    {...progressCustomStyles}
                                    onComplete={() => { Alert.alert('Hey!', 'onComplete event fired!'); }}
                                />
                            </ImageBackground>
                        </View>
                        <FlatList
                            data={this.state.data}
                            contentContainerStyle={{ paddingTop: "5%", paddingBottom: "10%" }}
                            renderItem={this._renderItem}
                            keyExtractor={item => item.route}
                            ItemSeparatorComponent={VerticalSpacer}
                        />
                    </ScrollView>
                </View>
                <UpgradeModal visible={this.state.upgradeModal} onUpgrade={() => navigation.navigate(route.PAYMENTMETHOD, { data: true })} onSkip={() => this.setState({ upgradeModal: false })} />
            </Container>

        )
    }
}

export default PowerOfMind;