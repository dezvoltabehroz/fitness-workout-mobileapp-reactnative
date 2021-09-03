import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import { ClearButton, ColorContainer } from '../../components';
import { AuthServices } from '../../services';
import { route, screen } from '../../lib/utils/constants';
import Tick from '../../assets/svg/Tick.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';

class CreatingPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
        };
    }

    componentDidMount = async () => {
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
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
        console.log("goal : ", goal)
        console.log("level : ", level)
        console.log("equipment : ", equipment)
        console.log("arm : ", arm)
        console.log("shoulder : ", shoulder)
        console.log("waist : ", waist)
        console.log("back : ", back)
        console.log("chest : ", chest)
        console.log("glute : ", glute)
        console.log("leg : ", leg)
        let data = {
            "fitness_goal": goal,
            "fitness_level": level,
            "fitness_equipment": equipment,
            "focus_area_arms": arm,
            "focus_area_waist": waist,
            "focus_area_legs": leg,
            "focus_area_glutes": glute,
            "focus_area_chest": chest,
            "focus_area_shoulder": shoulder,
            "gender": gender,
            "user_id": user_id
        }
        AuthServices.userPrefrences(data)
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => console.log(error))
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
                        <Text style={styles.decsTextStyle}>{screen.CREATINGPLAN_DESCRIPTION}</Text>
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
                            <ClearButton title={'FINISHED'} onPress={() => replace(route.MAIN)} />
                    }

                </View>
            </ColorContainer>

        )
    }
}
export default CreatingPlan;