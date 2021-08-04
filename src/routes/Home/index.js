import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

import { route, screen } from '../../lib/utils/constants';
import { DaysWorkout, Home, PowerOfMind, PowerOfMindAudio } from '../../screens';
import LogoWhite from '../../assets/svg/white-logo.svg'
import styles from '../style';
import THEME from '../../assets/styles/theme.style';
import { HeaderLeft } from '../../components';

const Stack = createStackNavigator();

function HomeRoutes() {
    const HeaderWhiteLogo = () => {
        return (
            <View><LogoWhite /></View>
        )
    }
    return (
        <Stack.Navigator initialRouteName={route.HOME} >
            <Stack.Screen name={route.HOME} component={Home} options={{
                headerShown: false
            }} />
            <Stack.Screen name={route.POWER_OF_MIND} component={PowerOfMind} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} color />),
                headerTitle: screen.POWER_OF_MIND,
                headerStyle: styles.headerStyle1,
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
              <Stack.Screen name={route.POWEROFMINDAUDIO} component={PowerOfMindAudio}  options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} color />),
                headerTitle: screen.POWER_OF_MIND,
                headerStyle: styles.headerStyle1,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle,
            })} />
        </Stack.Navigator>
    );
}



export default HomeRoutes;


