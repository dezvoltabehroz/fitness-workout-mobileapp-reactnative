import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, ImageBackground, Image, Platform, UIManager, LayoutAnimation, ActivityIndicator } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux'
import { Button, Container, HorizontalList, UpgradeModal, UploadingModal } from '../../components';
import { route, screen, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
import GFire from '../../assets/svg/gray-fire.svg';
import Camera from '../../assets/svg/camera.svg';
import Fire from '../../assets/svg/fire.svg';
import BMI from '../../assets/svg/bmi.svg';
import Apple from '../../assets/svg/apple.svg';
import Target from '../../assets/svg/pro-btn.svg';

import THEME from '../../assets/styles/theme.style';

import styles from './style';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';
import { ProfileServices } from '../../services';
import moment from 'moment';

const SVG_HEIGHT = 15;
const SVG_WIDTH = 15;

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            modal: false,
            value: 0,
            graphData: [],
            expanded: false,
            userMeasurement: {},
            laoding: true,
            data: []
        };
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    changeMeasurements = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.props.navigation.setOptions({
                headerRight: () => this.headerRight(),
            });
        })



        const { user_id, token } = this.props.user.userData;
        ProfileServices.userGraph(user_id, token)
            .then((res) => {
                console.log(res.data);
                let array = [...res.data.data];
                array.map((item, index) => {
                    // if (item.workout_user_id == this.props.user.userData.workout_user_id) {
                    //     array[index] = { ...array[index], selected: true }
                    //     console.log(array[index]?.user_images);
                    //     this.setState({ data: array[index]?.user_images ? array[index]?.user_images : [] })
                    // } else
                    array[index] = { ...array[index], selected: false }

                })
                array[array.length - 1] = { ...array[array.length - 1], selected: true }
                this.setState({
                    data: array[array.length - 1]?.user_images ? array[array.length - 1]?.user_images : [],
                    graphData: array,
                    userMeasurement: array[array.length - 1].user_measurement,
                    loading: false
                })


            })
            .catch((err) => { this.setState({ loading: false }); console.log(err) })
        // ProfileServices.getAllProgressPhoto({ user_id: user_id }, token)
        //     .then((res) => {
        //         console.log(res.data)
        //         if (res.data.success)
        //             this.setState({ data: res.data.data, loading: false })
        //         else
        //             this.setState({ data: [], loading: false })
        //     })
        //     .catch((err) => { this.setState({ data: [], loading: false }); console.log(err) })
    }

    headerRight = () => {
        return (
            this.props.user.userData.is_pro == 0 ?
                <TouchableOpacity style={{ marginRight: 0 }} onPress={() => { this.setState({ modal: !this.state.modal }) }} ><Target /></TouchableOpacity>
                : null)
    }

    chooseFile = async () => {
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id);
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken);
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {
            } else {
                this.setState({ uploading: true });
                let source = response;
                let formData = new FormData();
                formData.append('user_id', JSON.parse(user_id));
                formData.append('image', {
                    uri: Platform.OS === 'android' ? response.assets[0].uri : response.uri,
                    name: `${new Date().getTime().toString()}.jpg`,
                    filename: new Date().getTime().toString() + '.jpg',
                    type: 'image/jpg'
                });
                ProfileServices.updateProgressPhoto1(formData, JSON.parse(userToken))
                    .then((response) => {
                        if (response.data.success) {
                            this.setState({ uploading: false });
                            this.props.navigation.navigate(route.PROGRESSPICS)
                        }
                    })
                    .catch((err) => {
                        this.setState({ uploading: false });
                        console.log(err.response)
                    })
            }
        });
    };

    render() {

        const { navigate } = this.props.navigation;
        const { value, data, userMeasurement } = this.state;
        const { height_feet, height_inches, bmi, daily_diet_count, weight, daily_workout_count, is_pro } = this.props.user.userData;
        const { arm_size, chest_size, shoulder_size, waist_size, tummy_size, hip_size, thigh_size, calf_size } = this.props.user.userData.bodyMeasurementDetails;


        return (
            <Container>
                <StatusBar backgroundColor={THEME.BAR_COLOR} barStyle={"light-content"} />
                {this.state.loading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator color={'#44BDE8'} size="small" />
                    </View>
                    :
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={{ paddingBottom: "20%", backgroundColor: "white" }}>

                            <View style={styles.headingContainer1}>
                                <View style={styles.planContainer}>
                                    <View style={styles.alignItems}>
                                        <View style={styles.row}>
                                            <Fire height={SVG_HEIGHT} width={SVG_WIDTH} />
                                            <Text style={styles.barTextStyle}>{daily_workout_count != undefined && daily_workout_count ? daily_workout_count : 0}</Text>
                                        </View>
                                        <Text style={styles.decsTextStyle}>WORKOUT DAYS</Text>
                                    </View>
                                    <View style={styles.verticalLine} ></View>
                                    <View style={styles.alignItems}>
                                        <View style={styles.row}>
                                            <Apple height={SVG_HEIGHT} width={SVG_WIDTH} />
                                            <Text style={styles.barTextStyle}>{daily_diet_count != undefined && daily_diet_count ? daily_diet_count : 0}</Text>
                                        </View>
                                        <Text style={styles.decsTextStyle}>DIET DAYS</Text>
                                    </View>
                                    {/* <View style={styles.verticalLine} ></View>
                                <View style={styles.alignItems}>
                                    <View style={styles.row}>
                                        <BMI height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        <Text style={styles.barTextStyle}>{parseFloat(bmi).toFixed(2)}</Text>
                                    </View>
                                    <Text style={styles.decsTextStyle}>BMI</Text>
                                </View> */}
                                </View>
                            </View>
                            {
                                is_pro == 1 ?
                                    <View style={styles.rowContainer}>
                                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{ paddingRight: "10%" }}>
                                            {this.state.graphData.map((item, index) => {
                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        let array = [...this.state.graphData];
                                                        array.map((element, i) => {
                                                            array[i] = { ...array[i], selected: false }
                                                        })
                                                        array[index] = { ...array[index], selected: true }
                                                        console.log(array[index].user_measurement.hip_size);
                                                        this.setState({
                                                            graphData: array,
                                                            userMeasurement: array[index].user_measurement,
                                                            data: array[index]?.user_images ? array[index]?.user_images : []
                                                        })
                                                    }}  >
                                                        <Text style={item.selected ? styles.textStyle1 : styles.textStyle}>Month {index + 1}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </ScrollView>
                                    </View>
                                    :
                                    null
                            }
                            {is_pro == 1 ?
                                <>
                                    {this.state.graphData.map((item, index) => {
                                        return (
                                            <>
                                                {item.selected ?
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                        <LineChart
                                                            style={{
                                                                marginVertical: 8,
                                                                borderRadius: 16,
                                                            }}
                                                            data={{
                                                                labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
                                                                datasets: [
                                                                    {
                                                                        data: item.data
                                                                    }
                                                                ]
                                                            }}
                                                            width={SCREEN_WIDTH * 1.15}
                                                            height={220}
                                                            yAxisLabel=""
                                                            withHorizontalLines={true}
                                                            withVerticalLines={false}
                                                            withInnerLines={true}
                                                            withOuterLines={true}
                                                            withShadow={false}
                                                            yAxisInterval={0} // optional, defaults to 1
                                                            chartConfig={{
                                                                backgroundColor: 'white',
                                                                backgroundGradientFrom: "white",
                                                                backgroundGradientTo: "white",
                                                                decimalPlaces: 0, // optional, defaults to 2dp
                                                                color: () => `rgba(68, 189, 232, 1)`,
                                                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                                style: {
                                                                    borderRadius: 16,
                                                                },
                                                                propsForDots: {
                                                                    r: "3",
                                                                    strokeWidth: "1",
                                                                    stroke: "#44BDE8"

                                                                },
                                                                propsForHorizontalLabels: {
                                                                    alignmentBaseline: 'text-before-edge'
                                                                },
                                                                propsForBackgroundLines: {
                                                                    strokeDasharray: '',
                                                                    stroke: "lightgrey",
                                                                    // strokeWidth: "1"
                                                                },
                                                            }}
                                                            // bezier
                                                            style={{
                                                                marginVertical: 8,
                                                                borderRadius: 16,
                                                                marginLeft: 0,
                                                                paddingLeft: 0
                                                            }}
                                                            verticalLabelRotation={0}
                                                        />
                                                    </View> : null}

                                            </>
                                        )
                                    })}
                                    <View style={styles.divider}></View>
                                </>
                                : null}

                            <View style={styles.bmiContainer}>
                                {/* <View style={styles.rowContainer}>
                                <Text style={styles.blackheading}>BMI(kg/m2) : {parseFloat(bmi).toFixed(2)}</Text>
                                <TouchableOpacity>
                                    <Text style={styles.colorText}>{screen.EDIT}</Text>
                                </TouchableOpacity>
                            </View> */}
                                {/* <View style={styles.row} >
                                <View style={{ height: 10, width: SCREEN_WIDTH * 0.15, backgroundColor: "#9BE5FF" }}></View>
                                <View style={{ width: 5 }}></View>
                                <View style={{ height: 10, width: SCREEN_WIDTH * 0.15, backgroundColor: "#4E44E0" }}></View>
                                <View style={{ width: 5 }}></View>
                                <View style={{ height: 8, width: SCREEN_WIDTH * 0.3, backgroundColor: "#25B900" }}>
                                    <View style={{ position: "absolute", top: -10, left: '50%', backgroundColor: "#1F2729", width: 5, borderRadius: 4, height: 30 }}>

                                    </View>
                                    <View style={{ position: "absolute", top: -30, left: '35%', }}>
                                        <Text style={styles.blackText}>{parseFloat(bmi).toFixed(2)}</Text>
                                    </View>
                                    <View style={{ position: "absolute", top: 25, left: '20%', }}>
                                        <Text style={[styles.blackText, { color: '#25B900' }]}>Healty Weight</Text>
                                    </View>
                                </View>
                                <View style={{ width: 5 }}></View>
                                <View style={{ height: 10, width: SCREEN_WIDTH * 0.15, backgroundColor: "#C1C61E" }}></View>
                                <View style={{ width: 5 }}></View>
                                <View style={{ height: 10, width: SCREEN_WIDTH * 0.15, backgroundColor: "#B98D00" }}></View>
                                <View style={{ width: 5 }}></View>
                                <View style={{ height: 10, width: SCREEN_WIDTH * 0.05, backgroundColor: "#D33946" }}></View>
                            </View> */}
                                <View style={styles.rowContainer1}>
                                    <Text style={styles.blackText}>Height</Text>
                                    <Text style={[styles.grayText, { textDecorationLine: "underline" }]}>{`${height_feet != undefined && height_feet ? height_feet : 0} FT ${height_inches != undefined && height_inches ? height_inches : 0} IN`}</Text>
                                    {/* <TouchableOpacity>
                                    <Text style={styles.colorText}>{screen.EDIT}</Text>
                                </TouchableOpacity> */}
                                </View>
                                <View style={styles.rowContainer1}>
                                    <Text style={styles.blackText}>Weight</Text>
                                    <Text style={[styles.grayText, { textDecorationLine: "underline" }]}>{weight != undefined && weight ? weight : 0}</Text>
                                    {/* <TouchableOpacity>
                                    <Text style={styles.colorText}>{screen.EDIT}</Text>
                                </TouchableOpacity> */}
                                </View>
                                {/* <View style={styles.rowContainer1}>
                                <Text style={styles.colorText}>Current</Text>
                                <TouchableOpacity>
                                    <Text style={[styles.grayText, { textDecorationLine: "underline" }]}>{`${height_feet ? height_feet : 0} FT ${height_inches ? height_inches : 0} IN`}</Text>
                                </TouchableOpacity>
                            </View> */}
                            </View>
                            <View style={styles.divider}></View>
                            <View style={styles.bmiContainer}>
                                <View style={styles.rowContainer1}>
                                    <Text style={styles.blackheading}>MY MEASUREMENTS</Text>
                                    <TouchableOpacity onPress={this.changeMeasurements}>
                                        <Text style={styles.colorText}>{this.state.expanded ? 'SEE LESS' : screen.SEEMORE}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <Text style={styles.grayText}>Arm Size</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.colorText1}>{userMeasurement.arm_size ? `${userMeasurement.arm_size} IN` : ""}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rowMeasureContainer}>
                                    <Text style={styles.grayText}>Chest Size</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.colorText1}>{userMeasurement.chest_size ? `${userMeasurement.chest_size} IN` : ""}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={this.state.expanded ? styles.rowMeasureContainer : styles.rowContainer1}>
                                    <Text style={styles.grayText}>Shoulder Size</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.colorText1}>{userMeasurement.shoulder_size ? `${userMeasurement.shoulder_size} IN` : ""}</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.state.expanded ?
                                    <>
                                        <View style={styles.rowMeasureContainer}>
                                            <Text style={styles.grayText}>Waist Size</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.colorText1}>{userMeasurement.waist_size ? `${userMeasurement.waist_size} IN` : ""}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.rowMeasureContainer}>
                                            <Text style={styles.grayText}>Tummy Size</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.colorText1}>{userMeasurement.tummy_size ? `${userMeasurement.tummy_size} IN` : ""}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.rowMeasureContainer}>
                                            <Text style={styles.grayText}>Hip Size</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.colorText1}>{userMeasurement.hip_size == 0 ? "0 IN" : !userMeasurement.hip_size ? "" : `${userMeasurement.hip_size} IN`}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.rowMeasureContainer}>
                                            <Text style={styles.grayText}>Thigh Size</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.colorText1}>{userMeasurement.thigh_size ? `${userMeasurement.thigh_size} IN` : ""}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.rowContainer1}>
                                            <Text style={styles.grayText}>Calf Size</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.colorText1}>{userMeasurement.calf_size ? `${userMeasurement.calf_size} IN` : ""}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    : null
                                }
                            </View>
                            {
                                is_pro == 1 ?
                                    <>
                                        <View style={styles.divider}></View>
                                        <View style={styles.bmiContainer}>
                                            <View style={styles.rowContainer1}>
                                                <Text style={styles.blackheading}>PROGRESS PICS</Text>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate(route.PROGRESSPICS, { data: data })}>
                                                    <Text style={styles.colorText}>{screen.SEEMORE}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {
                                            this.state.data.length == 0 ?
                                                <View style={{ justifyContent: "center", alignItems: "center", height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH, backgroundColor: "#E4E4E4" }}>
                                                    <Text>No progress photo found!</Text>
                                                </View>
                                                :
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                                                    <View style={styles.container1} onPress={() => this.props.navigation.navigate(route.DIETPLAN)}>
                                                        <ImageBackground resizeMode="contain" source={{ uri: this.state.data[0] }} style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.49 }} >
                                                            <View style={styles.overlay} />
                                                            <View style={styles.dateContainer}>
                                                                <Text style={styles.dateText}>{moment().format('ll')}</Text>
                                                            </View>
                                                        </ImageBackground>
                                                    </View>
                                                    <View style={styles.container1} onPress={() => this.props.navigation.navigate(route.DIETPLAN)}>
                                                        <ImageBackground resizeMode="contain" source={{ uri: this.state.data[1] }} style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.49 }}>

                                                            <View style={styles.overlay} />
                                                            <View style={styles.dateContainer}>
                                                                <Text style={styles.dateText}>{moment().format('ll')}</Text>
                                                            </View>
                                                        </ImageBackground>
                                                    </View>
                                                </View>
                                        }
                                    </>
                                    :
                                    null
                            }
                        </ScrollView>
                    </View>
                }
                <UpgradeModal visible={this.state.modal} onUpgrade={() => this.setState({ modal: false }, () => this.props.navigation.navigate(route.PAYMENTMETHOD, {}))} onSkip={() => this.setState({ modal: false })} />
                <UploadingModal visible={this.state.uploading} />
            </Container >
        )
    }
}

const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(Progress);
