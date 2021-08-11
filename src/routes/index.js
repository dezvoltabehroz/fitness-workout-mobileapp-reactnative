import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

import { route, screen } from '../lib/utils/constants';
import { AuthLoading, PaymentMethod, DaysWorkout, DaysWorkoutVideos, DayWorkoutVideoPlayer, PowerOfMindAudio } from '../screens';
import IntroRoutes from './Intro';
import MainRoutes from './Main';
import { HeaderLeft } from '../components';
import LogoWhite from '../assets/svg/white-logo.svg'


import styles from './style';
import THEME from '../assets/styles/theme.style';



const HeaderWhiteLogo = () => {
    return (
        <View><LogoWhite /></View>
    )
}

const Stack = createStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName={route.AUTH_LOADING} >
            <Stack.Screen name={route.AUTH_LOADING} component={AuthLoading} options={{
                headerShown: false
            }} />
            <Stack.Screen name={route.APPINTRO} component={IntroRoutes} options={{ headerShown: false }} />
            <Stack.Screen name={route.MAIN} component={MainRoutes}
                options={{ headerShown: false }} />

            <Stack.Screen name={route.POWEROFMINDAUDIO} component={PowerOfMindAudio} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} color />),
                tabBarVisible: false,
                headerTitle: screen.POWER_OF_MIND,
                headerStyle: styles.headerStyle1,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle,
            })} />
            <Stack.Screen name={route.DAYSWORKOUTVIDEOS} component={DaysWorkoutVideos} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: '',
                tabBarVisible: false,
                headerStyle: styles.headerStyle,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle,
            })} />
            <Stack.Screen name={route.DAYS_WORLOUT} component={DaysWorkout} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} color />),
                headerTitle: () => (<HeaderWhiteLogo />),
                headerStyle: styles.headerStyle1,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle,
            })} />
            <Stack.Screen name={route.DAYSWORKOUTVIDEOPLAYER} component={DayWorkoutVideoPlayer} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} cross />),
                headerTitle: '',
                tabBarVisible: false,
                headerStyle: styles.headerStyle,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle,
            })} />
            <Stack.Screen name={route.PAYMENTMETHOD} component={PaymentMethod} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} color />),
                headerTitle: screen.PAYMENTMETHOD,
                headerStyle: styles.headerStyle1,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle,
            })} />
        </Stack.Navigator>
    );
}

export default AppRoutes;


