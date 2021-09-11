import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Linking } from 'react-native';

import { Button, ColorContainer, ClearButton } from '../../components';
import messaging from '@react-native-firebase/messaging';
import HeaderView from './components/headerView';
import { route, screen } from '../../lib/utils/constants';
import Target from '../../assets/svg/target.svg';
import Fit from '../../assets/svg/Fit.svg';
import Muscles from '../../assets/svg/muscles.svg';
import Weight from '../../assets/svg/lose-weight.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import { AuthServices } from '../../services';
import { getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import { connect } from 'react-redux';

const SVG_HEIGHT = 36;
const SVG_WIDTH = 36;

class FitnessGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
        };
    }
    componentDidMount = () => {
        switch (this.props.user.userData.fitness_goal) {
            case screen.APP_INTRO_Button_1:
                this.setState({ value: 0 })
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessGoal, JSON.stringify(screen.APP_INTRO_Button_1))
                break;
            case screen.APP_INTRO_Button_2:
                this.setState({ value: 1 })
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessGoal, JSON.stringify(screen.APP_INTRO_Button_2))
                break;
            case screen.APP_INTRO_Button_3:
                this.setState({ value: 2 })
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessGoal, JSON.stringify(screen.APP_INTRO_Button_3))
                break;
            default:
                break;
        }
    }

    style_Func_1 = () => {
        let style = {};
        switch (this.state.value) {
            case 0:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    style_Func_2 = () => {
        let style = {};
        switch (this.state.value) {
            case 1:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    style_Func_3 = () => {
        let style = {};
        switch (this.state.value) {
            case 2:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    setValue = async (value) => {
        this.setState({ value });
        switch (value) {
            case 0:
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessGoal, JSON.stringify(screen.APP_INTRO_Button_1))
                break;
            case 1:
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessGoal, JSON.stringify(screen.APP_INTRO_Button_2))
                break;
            case 2:
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessGoal, JSON.stringify(screen.APP_INTRO_Button_3))
                break;
        }
    }

    render() {

        const { navigate } = this.props.navigation;
        const { value } = this.state;

        return (
            <ColorContainer>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                <HeaderView navigation={this.props.navigation} />
                <View style={styles.container}>
                    <View style={styles.targetContainer}>
                        <Target />
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_1}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setValue(0)} style={this.style_Func_1()}>
                        <View style={styles.marginHorizontal1}>
                            <Fit height={SVG_HEIGHT} width={SVG_WIDTH} />
                        </View>
                        <View style={styles.marginHorizontal}>
                            <Text style={styles.decsHeading}>{screen.APP_INTRO_Button_1}</Text>
                            <Text style={styles.decsTextStyle}>{screen.APP_INTRO_Button_DESCRIPTION_1}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setValue(1)} style={this.style_Func_2()}>
                        <View style={styles.marginHorizontal1}>
                            <Muscles height={SVG_HEIGHT} width={SVG_WIDTH} />
                        </View>
                        <View style={styles.marginHorizontal}>
                            <Text style={styles.decsHeading}>{screen.APP_INTRO_Button_2}</Text>
                            <Text style={styles.decsTextStyle}>{screen.APP_INTRO_Button_DESCRIPTION_2}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setValue(2)} style={this.style_Func_3()}>
                        <View style={styles.marginHorizontal1}>
                            <Weight height={SVG_HEIGHT} width={SVG_WIDTH} />
                        </View>
                        <View style={styles.marginHorizontal}>
                            <Text style={styles.decsHeading}>{screen.APP_INTRO_Button_3}</Text>
                            <Text style={styles.decsTextStyle}>{screen.APP_INTRO_Button_DESCRIPTION_3}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <ClearButton title={screen.NEXT} onPress={() => navigate(route.FITNESSLEVEL)} />
                </View>
            </ColorContainer>

        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(FitnessGoal);

let data=[
    {
        week: "01",
        date: new Date(),
        days: [{
            day: 'Mon',
            video: [
                {
                name: "Push up's",
                duration:30,
                description: ["test description","test description"],
                url: "www.google.com"
            },
            {
                name: "Push up's",
                duration:30,
                description: ["test description","test description"],
                url: "www.google.com"
            }]
        },
        {
            day: 'Tue',
            video: [{
                name: "Push up's",
                duration:30,
                description: ["test description","test description"],
                url: "www.google.com"
            },
            {
                name: "Push up's",
                duration:30,
                description: ["test description","test description"],
                url: "www.google.com"
            }]
        }]
    },
    {
        week: "02",
        date: new Date(),
        days: [{
            day: 'Mon',
            video: [{
                name: "Push up's",
                duration:30,
                description: ["test description","test description"],
                url: "www.google.com"
            },
            {
                name: "Push up's",
                duration:30,
                description: ["test description","test description"],
                url: "www.google.com"
            }]
        },
        {
            day: 'Tue',
            video: [{
                name: "Push up's",
                duration:30,
                description: ["test description","test description"],
                url: "www.google.com"
            },
            {
                name: "",
                description: ["test description","test description"],
                url: "www.google.com"
            }]
        }]
    }
]