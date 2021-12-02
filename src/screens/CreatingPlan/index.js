import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { ClearButton, ColorContainer } from '../../components';
import { AuthServices, ProfileServices } from '../../services';
import { route, screen } from '../../lib/utils/constants';
import Tick from '../../assets/svg/Tick.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import { getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';

class CreatingPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
        };
    }

    componentDidMount = async () => {
        const { navigate, replace } = this.props.navigation;
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
        const goal = await getLocalData(LOCAL_STORAGE_KEYS.fitnessGoal)
        const level = await getLocalData(LOCAL_STORAGE_KEYS.fitnessLevel)
        const equipment = await getLocalData(LOCAL_STORAGE_KEYS.fitnessEquipment)
        const arm = await getLocalData(LOCAL_STORAGE_KEYS.focusAreaArms)
        const shoulder = await getLocalData(LOCAL_STORAGE_KEYS.focusAreaShoulder)
        const waist = await getLocalData(LOCAL_STORAGE_KEYS.focusAreaWaist)
        const back = await getLocalData(LOCAL_STORAGE_KEYS.focusAreaBack)
        const chest = await getLocalData(LOCAL_STORAGE_KEYS.focusAreaChest)
        const glute = await getLocalData(LOCAL_STORAGE_KEYS.focusAreaGlutes)
        const leg = await getLocalData(LOCAL_STORAGE_KEYS.focusAreaLegs)
        const gender = await getLocalData(LOCAL_STORAGE_KEYS.gender)

        let fitnessEuipment = JSON.parse(equipment) == "Mixed Equipment" ? "All Equipment" : JSON.parse(equipment)

        let data = {
            "fitness_goal": JSON.parse(goal),
            "fitness_level": JSON.parse(level),
            "fitness_equipment": fitnessEuipment,
            "focus_area_arms": JSON.parse(arm),
            "focus_area_waist": JSON.parse(waist),
            "focus_area_legs": JSON.parse(leg),
            "focus_area_glutes": JSON.parse(glute),
            "focus_area_back": JSON.parse(back),
            "focus_area_chest": JSON.parse(chest),
            "focus_area_shoulder": JSON.parse(shoulder),
            "gender": JSON.parse(gender),
            "user_id": JSON.parse(user_id),
        }
        AuthServices.userPrefrences(data, JSON.parse(userToken))
            .then(async (res) => {
                console.log(res.data)
                let userData = {
                    user_id: JSON.parse(user_id),
                    token: JSON.parse(userToken)
                }
                await this.props.authActions.getUserProfile(userData);
            })
            .catch((error) => console.log(error.response))

    }

    handleFinished = async () => {
        const { navigate, replace } = this.props.navigation;
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
        storeLocalData(LOCAL_STORAGE_KEYS.appIntro, JSON.stringify({ data: true }))
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: route.MAIN }]
        })
        // let userData = {
        //     user_id: JSON.parse(user_id),
        //     token: JSON.parse(userToken)
        // }
        // await this.props.authActions.getUserProfile(userData, replace);
    }


    render() {
        const { navigate, replace } = this.props.navigation;
        const { value } = this.state;

        return (
            <ColorContainer>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        {value ? <Tick /> : null}
                        <Text style={styles.headingTextStyle}>{screen.CREATINGPLAN_HEADING}</Text>
                        <Text style={styles.decsTextStyle}>{value ? screen.CREATINGPLAN_DESCRIPTION : "In Progress..."}</Text>
                    </View>

                    <View style={styles.progressContainer}>
                        <CircularProgress
                            value={100}
                            duration={5000}
                            radius={120}
                            textColor={themeStyle.BAR_COLOR}
                            textStyle={styles.textStyle}
                            activeStrokeWidth={20}
                            inActiveStrokeWidth={15}
                            activeStrokeColor={themeStyle.BAR_COLOR}
                            inActiveStrokeColor={'#0000ffff'}
                            inActiveStrokeOpacity={0}
                            valueSuffix={'%'}
                            onAnimationComplete={() => { this.setState({ value: true }) }}
                        />
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    {
                        !value ?
                            <Text style={styles.headingTextStyle}>{'please Wait...'}</Text>
                            :
                            <ClearButton title={'FINISHED'} onPress={() => this.handleFinished()} />
                    }

                </View>
            </ColorContainer>

        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch)

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatingPlan);