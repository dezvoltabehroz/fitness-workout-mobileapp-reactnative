import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { route, screen } from '../../lib/utils/constants';
import { AppIntro1st, AppIntro2nd, AppIntro3rd, AppIntro4th, AppIntro5th, CreatingPlan, FitnessGoal, FitnessLevel, FocusArea, Home, SelectEuipment, UpdatingPlan } from '../../screens';
import Logo from '../../assets/svg/logo.svg'
import LogoWhite from '../../assets/svg/white-logo.svg'
import styles from '../style';
import { HeaderLeft, Icon } from '../../components';
const Stack = createStackNavigator();

function WorkoutSettingsRoutes() {
    const HeaderLogo = () => {
        return (
            <View><Logo /></View>
        )
    }
    const HeaderWhiteLogo = () => {
        return (
            <View><LogoWhite /></View>
        )
    }
    return (
        <Stack.Navigator initialRouteName={route.FITNESSGOAL} >
            <Stack.Screen name={route.FITNESSGOAL} component={FitnessGoal} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerTitle: () => (<HeaderLogo />),
            })} />
            <Stack.Screen name={route.FITNESSLEVEL} component={FitnessLevel} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: () => (<HeaderLogo />),
            })} />
            <Stack.Screen name={route.SELECTEUIPMENT} component={SelectEuipment} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: () => (<HeaderLogo />),
            })} />
            <Stack.Screen name={route.FOCUSAREA} component={FocusArea} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerTransparent: true,
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: () => (<HeaderWhiteLogo />),
            })} />
            <Stack.Screen name={route.UPDATINGPLAN} component={UpdatingPlan} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: () => (<HeaderLogo />),
            })} />
        </Stack.Navigator>
    );
}


export default WorkoutSettingsRoutes;


