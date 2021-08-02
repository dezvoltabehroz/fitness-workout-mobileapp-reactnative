import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { route } from '../../lib/utils/constants';
import { Home } from '../../screens';


const Stack = createStackNavigator();

function HomeRoutes() {
    return (
        <Stack.Navigator initialRouteName={route.HOME} >
            <Stack.Screen name={route.HOME} component={Home} options={{
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

export default HomeRoutes;


