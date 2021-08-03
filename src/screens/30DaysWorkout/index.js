import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import CircularProgress from 'react-native-circular-progress-indicator';

import { Container, HorizontalList, Icon, UpgradeModal } from '../../components';
import { SCREEN_WIDTH } from '../../lib/utils/constants';
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
                    date: "2021-08-02"
                },
                {
                    day: "02",
                    date: "2021-08-02"
                },
                {
                    day: "03",
                    date: "2021-08-03",
                },
                {
                    day: "04",
                    date: "2021-08-04"
                },
                {
                    day: "05",
                    date: "2021-08-05"
                },
                {
                    day: "06",
                    date: "2021-08-06"
                },
                {
                    day: "07",
                    date: "2021-08-07"
                },
                {
                    day: "08",
                    date: "2021-08-08"
                },
                {
                    day: "09",
                    date: "2021-08-09"
                },
                {
                    day: "10",
                    date: "2021-08-10",
                    locked: true,
                },
                {
                    day: "11",
                    date: "2021-08-11",
                    locked: true,
                },
                {
                    day: "12",
                    locked: true,
                    date: "2021-08-12"
                },
                {
                    day: "13",
                    locked: true,
                    date: "2021-08-13"
                },
                {
                    day: "14",
                    locked: true,
                    date: "2021-08-14"
                },
                {
                    day: "15",
                    locked: true,
                    date: "2021-08-15"
                },
                {
                    day: "16",
                    locked: true,
                    date: "2021-08-16"
                },
                {
                    day: "17",
                    locked: true,
                    date: "2021-08-17"
                },
                {
                    day: "18",
                    locked: true,
                    date: "2021-08-18"
                },
                {
                    day: "19",
                    locked: true,
                    date: "2021-08-19"
                },
                {
                    day: "20",
                    locked: true,
                    date: "2021-08-20"
                },
                {
                    day: "21",
                    locked: true,
                    date: "2021-08-21"
                },
                {
                    day: "22",
                    locked: true,
                    date: "2021-08-22"
                },
                {
                    day: "23",
                    locked: true,
                    date: "2021-08-23"
                },
                {
                    day: "24",
                    locked: true,
                    date: "2021-08-24"
                },
                {
                    day: "25",
                    locked: true,
                    date: "2021-08-25"
                },
                {
                    day: "26",
                    locked: true,
                    date: "2021-08-26"
                },
                {
                    day: "27",
                    locked: true,
                    date: "2021-08-27"
                },
                {
                    day: "28",
                    locked: true,
                    date: "2021-08-28"
                },
                {
                    day: "29",
                    locked: true,
                    date: "2021-08-29"
                },
                {
                    day: "30",
                    locked: true,
                    date: "2021-08-30"
                },
            ],
            upgradeModal: false,
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity disabled={item.locked ? false : true} onPress={() => this.setState({ upgradeModal: true })} style={styles.itemContainer} >
                <View style={styles.textContainer}>
                    <Text style={styles.greyText}>{'Day'}</Text>
                    <View style={styles.rowContainer}>
                        <View style={[styles.row, { flex: 1 }]}>
                            <Text style={styles.dayText}>{item.day}</Text>
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
                            {
                                item.locked ?
                                    <View style={{ top: -50 }}>
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
                            {/* {
                                moment(item.date).format('YYYY-MM-DD') != moment().format('YYYY-MM-DD') ?
                                    <Icon.SimpleLineIcons name="lock" size={20} color={'gray'} />
                                    :
                                    null
                            } */}
                        </View>
                    </View>
                    {
                        moment(item.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ?
                            <Button title={'GO'} />
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        return (
            <Container>
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
                <UpgradeModal visible={this.state.upgradeModal} />
            </Container>

        )
    }
}

export default PowerOfMind;