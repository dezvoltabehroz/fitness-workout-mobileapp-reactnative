import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { route } from '../../lib/utils/constants';
import { AppIntro1st, AppIntro2nd, AppIntro3rd,AppIntro4th,AppIntro5th } from '../../screens';


const Stack = createStackNavigator();

function IntroRoutes() {
    return (
        <Stack.Navigator initialRouteName={route.APPINTRO1st} >
            <Stack.Screen name={route.APPINTRO1st} component={AppIntro1st} options={{
                headerShown: false
            }} />
            <Stack.Screen name={route.APPINTRO2nd} component={AppIntro2nd} options={{
                headerShown: false
            }} />
            <Stack.Screen name={route.APPINTRO3rd} component={AppIntro3rd} options={{
                headerShown: false
            }} />
            <Stack.Screen name={route.APPINTRO4th} component={AppIntro4th} options={{
                headerShown: false
            }} />
            <Stack.Screen name={route.APPINTRO5th} component={AppIntro5th} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
    }
})

export default IntroRoutes;


