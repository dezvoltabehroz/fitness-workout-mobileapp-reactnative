import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Button, ColorContainer, CustomSlider1, Icon } from '../../components';
import { route, screen, SCREEN_WIDTH } from '../../lib/utils/constants';

import HeaderView from './components/headerView';
import Volume from '../../assets/svg/volume.svg';
import Bar from '../../assets/svg/Lines.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import { getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import { connect } from 'react-redux';

class FitnessLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
            seclectedValue: null
        };
    }
    componentDidMount = async () => {
        console.log(this.props.user.userData.fitness_level)
        switch (this.props.user.userData.fitness_level) {
            case 'Not Fit':
                this.setState({ seclectedValue: 1, value: 1 })
                await storeLocalData(LOCAL_STORAGE_KEYS.fitnessLevel, JSON.stringify('Not Fit'))
                break;
            case 'Average Fit':
                this.setState({ seclectedValue: 2, value: 2 })
                await storeLocalData(LOCAL_STORAGE_KEYS.fitnessLevel, JSON.stringify('Average Fit'))
                break;
            case 'Good Fit':
                this.setState({ seclectedValue: 3, value: 3 })
                await storeLocalData(LOCAL_STORAGE_KEYS.fitnessLevel, JSON.stringify('Good Fit'))
                break;
            case 'Very Fit':
                this.setState({ seclectedValue: 4, value: 4 })
                await storeLocalData(LOCAL_STORAGE_KEYS.fitnessLevel, JSON.stringify('Very Fit'))
                break;
            default:
                this.setState({ seclectedValue: 1, value: 1 })
                await storeLocalData(LOCAL_STORAGE_KEYS.fitnessLevel, JSON.stringify('Not Fit'))
                break;
        }
        this.resetSlider;

    }

    multiSliderValueCallback = async (values) => {
        this.setState({ seclectedValue: values })
        let goal;
        switch (values) {
            case 1:
                await storeLocalData(LOCAL_STORAGE_KEYS.fitnessLevel, JSON.stringify('Not Fit'))
                this.setState({ value: values })
                goal = await getLocalData(LOCAL_STORAGE_KEYS.fitnessLevel)
                break;
            case 2:
                await storeLocalData(LOCAL_STORAGE_KEYS.fitnessLevel, JSON.stringify('Average Fit'))
                this.setState({ value: values })
                goal = await getLocalData(LOCAL_STORAGE_KEYS.fitnessLevel)
                break;
            case 3:
                await storeLocalData(LOCAL_STORAGE_KEYS.fitnessLevel, JSON.stringify('Good Fit'))
                this.setState({ value: values })
                goal = await getLocalData(LOCAL_STORAGE_KEYS.fitnessLevel)
                break;
            case 4:
                await storeLocalData(LOCAL_STORAGE_KEYS.fitnessLevel, JSON.stringify('Very Fit'))
                this.setState({ value: values })
                goal = await getLocalData(LOCAL_STORAGE_KEYS.fitnessLevel)
                break;
        }
    }

    handleText = () => {
        let text = "";
        switch (this.state.value) {
            case 1:
                text = "No exercise for at least a month"
                break;
            case 2:
                text = "I take part in little exercise without difficulty"
                break;
            case 3:
                text = "I exercise regularly & with ease"
                break;
            case 4:
                text = "Oh, trust me, Exercise is part of my lifestyle"
                break;
        }
        return text
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { seclectedValue } = this.state;
        return (
            <ColorContainer>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                <HeaderView goBack={() => goBack()} />

                <View style={styles.container}>
                    <View style={[styles.networkContainer, { flex: 0.1 }]}>
                        <Volume />
                    </View>
                    <View style={[styles.headingContainer, { flex: 0.2 }]}>
                        <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_2}</Text>
                        <Text style={styles.decsTextStyle}>{screen.APP_INTRO_DESCRIPTION_2}</Text>
                    </View>
                    <View style={[styles.secondHeadingContainer, { flex: 0.2 }]} >
                        <Text style={styles.secondHeadingStyle}>
                            {this.handleText()}
                        </Text>
                    </View>
                    <View style={{ flex: 0.5 }} >
                        {
                            seclectedValue ?
                                <>
                                    <View style={{ position: "absolute", top: 30 }}>
                                        <Image resizeMode={"contain"} style={styles.imageStyle} source={require('../../assets/images/outfit.png')} />
                                    </View>
                                    <View style={{ position: "absolute", top: 18 }}>
                                        <Bar width={SCREEN_WIDTH * 0.9} />
                                    </View>
                                    <CustomSlider1
                                        min={1}
                                        max={4}
                                        selectedValue={seclectedValue}
                                        resetValue={(reset) => this.resetSlider = reset}
                                        LRpadding={40}
                                        callback={this.multiSliderValueCallback}
                                        single={true}
                                    />
                                </>

                                :
                                <ActivityIndicator color="red" size={"small"} />

                        }
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigate(route.SELECTEUIPMENT)} style={styles.buttonStyle}>
                        <Icon.AntDesign name="right" size={25} color={themeStyle.BAR_COLOR} />
                    </TouchableOpacity>
                </View>
            </ColorContainer >

        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(FitnessLevel);