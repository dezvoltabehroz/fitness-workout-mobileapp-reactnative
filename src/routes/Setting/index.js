import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

import { route, screen } from '../../lib/utils/constants';
import { DaysWorkout, DaysWorkoutVideos, DayWorkoutVideoPlayer, EditProfile, Home, MyProfile, PaymentMethod, PowerOfMind, PowerOfMindAudio, Settings } from '../../screens';
import LogoWhite from '../../assets/svg/white-logo.svg'
import styles from '../style';
import THEME from '../../assets/styles/theme.style';
import { HeaderLeft, HeaderRight } from '../../components';

const Stack = createStackNavigator();

function SettingRoutes() {
    const HeaderWhiteLogo = () => {
        return (
            <View><LogoWhite /></View>
        )
    }
    return (
        <Stack.Navigator initialRouteName={route.SETTINGS} >
            <Stack.Screen name={route.SETTINGS} component={Settings} options={{
                headerTitle: screen.SETTINGS,
                headerStyle: styles.headerStyle1,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle1,
            }} />
            <Stack.Screen name={route.PROFILE} component={MyProfile} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} color />),
                headerRight: () => (<HeaderRight navigation={navigation} color edit />),
                headerTitle: screen.MY_PROFILE,
                headerStyle: styles.headerStyle1,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle1,
            })} />
              <Stack.Screen name={route.EDITPROFILE} component={EditProfile} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} color />),
                headerTitle: screen.EDIT_PROFILE,
                headerStyle: styles.headerStyle1,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle1,
            })} />
            <Stack.Screen name={route.DAYS_WORLOUT} component={DaysWorkout} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} color />),
                headerTitle: () => (<HeaderWhiteLogo />),
                headerStyle: styles.headerStyle1,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
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
            <Stack.Screen name={route.DAYSWORKOUTVIDEOS} component={DaysWorkoutVideos} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: '',
                tabBarVisible: false,
                headerStyle: styles.headerStyle,
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
        </Stack.Navigator>
    );
}



export default SettingRoutes;


