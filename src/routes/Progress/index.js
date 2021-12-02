import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

import { route, screen } from '../../lib/utils/constants';
import { DaysWorkout, DietPlan, DaysWorkoutVideos, DayWorkoutVideoPlayer, Home, PowerOfMind, PowerOfMindAudio, Progress } from '../../screens';
import LogoWhite from '../../assets/svg/white-logo.svg'
import styles from '../style';
import THEME from '../../assets/styles/theme.style';
import { HeaderLeft } from '../../components';

const Stack = createStackNavigator();

function ProgressRoutes() {
    const HeaderWhiteLogo = () => {
        return (
            <View><LogoWhite /></View>
        )
    }

    return (
        <Stack.Navigator initialRouteName={route.PROGRESSSCREEN} >
            <Stack.Screen name={route.PROGRESSSCREEN} component={Progress} options={{
                headerTitle: () => (<HeaderWhiteLogo />),
                headerLeft: () => {},
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle1,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle,
            }} />
        </Stack.Navigator>
    );
}



export default ProgressRoutes;


