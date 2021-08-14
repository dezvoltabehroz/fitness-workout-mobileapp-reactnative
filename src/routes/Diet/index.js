import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { route, screen } from '../../lib/utils/constants';
import { DietPlanDetails, DietScreen, } from '../../screens';
import LogoWhite from '../../assets/svg/white-logo.svg'
import More from '../../assets/svg/more.svg';
import styles from '../style';
import THEME from '../../assets/styles/theme.style';
import { HeaderLeft } from '../../components';

const Stack = createStackNavigator();

function DietRoutes() {
    const HeaderRight = (props) => {
        return (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { }} ><More /></TouchableOpacity>
        )
    }
    const HeaderWhiteLogo = (props) => {
        return (
            <View><LogoWhite /></View>
        )
    }
    return (
        <Stack.Navigator initialRouteName={route.DIETSCREEN} >

            <Stack.Screen name={route.DIETSCREEN} component={DietScreen} options={({ navigation, route }) => ({
                headerRight: () => (<HeaderRight navigation={navigation} params={route.params} />),
                headerTitle: () => (<HeaderWhiteLogo />),
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle1,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle,
            })} />

            <Stack.Screen name={route.DIETPLANDETAILS} component={DietPlanDetails} options={({ navigation, route }) => ({
                headerLeft: () => (<HeaderLeft navigation={navigation} color />),
                headerTitle: () => (<HeaderWhiteLogo />),
                headerTitleAlign: screen.SCREEN_TITLE_ALIGN_CENTER,
                headerStyle: styles.headerStyle1,
                headerTintColor: THEME.COLOR_WHITE,
                headerTitleStyle: styles.headerTextStyle,
            })} />

        </Stack.Navigator>
    );
}



export default DietRoutes;


