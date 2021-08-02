import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { AuthLoading } from '../screens';
import { route } from '../lib/utils/constants';
import IntroRoutes from './Intro';
import MainRoutes from './Main';


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


        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
    }
})

export default AppRoutes;


