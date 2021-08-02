
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Container, Icon, } from '../../components';

import THEME from '../../assets/styles/theme.style'
import { route } from '../../lib/utils/constants';
import Bell from '../../assets/svg/target.svg';
import HomeRoutes from '../Home';
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
                tabBarStyle: {
                    height: 60,
                    borderTopWidth: 0,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;
                    if (route.name === 'Home') {
                        icon = focused
                            ?
                            <View style={styles.circleStyle} >
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.colorText}>{route.name}</Text>
                            </View>
                            : <View style={styles.simpleStyle} >
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.grayColor}>{route.name}</Text>
                            </View>
                    } else if (route.name === 'Diet') {
                        icon = focused
                            ?
                            <View style={styles.circleStyle}>
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.colorText}>{route.name}</Text>
                            </View>
                            : <View style={styles.simpleStyle} >
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.grayColor}>{route.name}</Text>
                            </View>
                    } else if (route.name === 'Progress') {
                        icon = focused
                            ?
                            <View style={styles.circleStyle} >
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.colorText}>{route.name}</Text>
                            </View>
                            : <View style={styles.simpleStyle} >
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.grayColor}>{route.name}</Text>
                            </View>
                    } else if (route.name === 'Market') {
                        icon = focused
                            ?
                            <View style={styles.circleStyle}>
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.colorText} >{route.name}</Text>
                            </View>
                            : <View style={styles.simpleStyle} >
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.grayColor}>{route.name}</Text>
                            </View>
                    } else if (route.name === 'Setting') {
                        icon = focused
                            ?
                            <View style={styles.circleStyle} >
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.colorText}>{route.name}</Text>
                            </View>
                            :
                            <View style={styles.simpleStyle} >
                                <Bell height={size} width={size} fill={color} />
                                <Text style={styles.grayColor}>{route.name}</Text>
                            </View>
                    }
                    return icon;
                },
            })}
            tabBarOptions={{
                showLabel: false,

                labelStyle: {
                    fontSize: 12,
                    fontWeight: "bold"
                },
                activeTintColor: THEME.BAR_COLOR,
                inactiveTintColor: THEME.COLOR_WHITE,

            }}
        >
            <Bottom.Screen name={route.HOME} component={HomeRoutes} />
            <Bottom.Screen name={route.DIET} component={CreatePlaceholder} />
            <Bottom.Screen name={route.PROGRESS} component={CreatePlaceholder} />
            <Bottom.Screen name={route.SETTING} component={CreatePlaceholder} />

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
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5
    },
    grayColor: {
        color: THEME.PRIMARY_TEXT_COLOR,
        fontSize: 12,
        fontWeight: 'bold'
    }
})

export default MainRoutes;