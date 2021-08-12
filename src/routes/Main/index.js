
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Container, Icon, } from '../../components';
import { DietScreen } from '../../screens'

import THEME from '../../assets/styles/theme.style'
import { route } from '../../lib/utils/constants';
import Home from '../../assets/svg/home.svg';
import Diet from '../../assets/svg/diet.svg';

import Progress from '../../assets/svg/progress.svg';
import Setting from '../../assets/svg/setting.svg';
import HomeRoutes from '../Home';
import DietRoutes from '../Diet';
import SettingRoutes from '../Setting';
import ProgressRoutes from '../Progress';
const Bottom = createBottomTabNavigator();


function MainRoutes(props) {


    const CreatePlaceholder = () => {
        return (
            <Container>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={[{ marginTop: '10%', textAlign: 'center' },]}>
                        Screen is Underdevelopment
                    </Text>
                </View>
            </Container>
        )
    };


    return (
        <Bottom.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;
                    if (route.name === 'Home') {
                        icon = focused
                            ?
                            <View style={styles.circleStyle} >
                                <Home height={size} width={size} fill={color} />
                                <Text style={styles.colorText}>{route.name}</Text>
                            </View>
                            :
                            <View style={styles.simpleStyle} >
                                <Home height={20} width={20} fill={color} />
                                <Text style={styles.grayColor}>{route.name}</Text>
                            </View>
                    } else if (route.name === 'Diet') {
                        icon = focused
                            ?
                            <View style={styles.circleStyle}>
                                <Diet height={size} width={size} fill={color} />
                                <Text style={styles.colorText}>{route.name}</Text>
                            </View>
                            :
                            <View style={styles.simpleStyle} >
                                <Diet height={20} width={20} fill={color} />
                                <Text style={styles.grayColor}>{route.name}</Text>
                            </View>
                    } else if (route.name === 'Progress') {
                        icon = focused
                            ?
                            <View style={styles.circleStyle} >
                                <Progress height={size} width={size} fill={color} />
                                <Text style={styles.colorText}>{route.name}</Text>
                            </View>
                            :
                            <View style={styles.simpleStyle} >
                                <Progress height={20} width={20} fill={color} />
                                <Text style={styles.grayColor}>{route.name}</Text>
                            </View>
                    } else if (route.name === 'Setting') {
                        icon = focused
                            ?
                            <View style={styles.circleStyle} >
                                <Setting height={size} width={size} fill={color} />
                                <Text style={styles.colorText}>{route.name}</Text>
                            </View>
                            :
                            <View style={styles.simpleStyle} >
                                <Setting height={20} width={20} fill={color} />
                                <Text style={styles.grayColor}>{route.name}</Text>
                            </View>
                    }
                    return icon;
                },


            })}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: THEME.BAR_COLOR,
                inactiveTintColor: '#9B9B9B',
            }}>
            <Bottom.Screen name={route.HOME} component={HomeRoutes} />
            <Bottom.Screen name={route.DIET} component={DietRoutes} />
            <Bottom.Screen name={route.PROGRESS} component={ProgressRoutes} />
            <Bottom.Screen name={route.SETTING} component={SettingRoutes} />
        </Bottom.Navigator>
    )

}


const styles = StyleSheet.create({
    circleStyle: {
        height: 70, width: 70, marginTop: -40, borderRadius: 40, justifyContent: "center", alignItems: "center", backgroundColor: "white"
    },
    simpleStyle: {
        justifyContent: "center",
        alignItems: "center"
    },
    colorText: {
        color: THEME.BAR_COLOR,
        fontFamily: THEME.FONT_REGULAR,
        marginTop: 5
    },
    grayColor: {
        color: THEME.PRIMARY_TEXT_COLOR,
        fontFamily: THEME.FONT_REGULAR,
    }
})

export default MainRoutes;