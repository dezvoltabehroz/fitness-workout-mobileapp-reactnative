import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { route, screen } from '../../lib/utils/constants';
import { AppIntro1st, AppIntro2nd, AppIntro3rd, AppIntro4th, AppIntro5th, AppIntroZero, CreatingPlan, Home } from '../../screens';
import Logo from '../../assets/svg/logo.svg'
import LogoWhite from '../../assets/svg/white-logo.svg'
import styles from '../style';
import { HeaderLeft, Icon } from '../../components';
const Stack = createStackNavigator();

function IntroRoutes() {
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
        <Stack.Navigator initialRouteName={route.APPINTRO1st} >
            <Stack.Screen name={route.APPINTRO1st} component={AppIntro1st} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerTitle: () => (<HeaderLogo />),
            })} />
            <Stack.Screen name={route.APPINTRO2nd} component={AppIntro2nd} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: () => (<HeaderLogo />),
            })} />
            <Stack.Screen name={route.APPINTRO3rd} component={AppIntro3rd} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: () => (<HeaderLogo />),
            })} />
            <Stack.Screen name={route.APPINTRO4th} component={AppIntro4th} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: () => (<HeaderLogo />),
            })} />
            <Stack.Screen name={route.APPINTRO5th} component={AppIntro5th} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerTransparent: true,
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: () => (<HeaderWhiteLogo />),
            })} />
            <Stack.Screen name={route.CREATINGPLAN} component={CreatingPlan} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle,
                headerLeft: () => (<HeaderLeft navigation={navigation} />),
                headerTitle: () => (<HeaderLogo />),
            })} />
        </Stack.Navigator>
    );
}


export default IntroRoutes;


