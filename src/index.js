import React, { Component } from 'react';
import { StatusBar, Linking, Platform, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes'
import THEME from './assets/styles/theme.style';

import { Provider } from "react-redux";
import createStore from "./redux/CreateStore";
import SplashScreen from 'react-native-splash-screen';
const store = createStore();

export default function App() {

    React.useEffect(() => {
        LogBox.ignoreAllLogs();
    }, [])

    const onNavigationReady = () => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 700);
    }

    return (
        <>
            <Provider store={store}>
                <NavigationContainer  onReady={onNavigationReady}>
                    <SafeAreaProvider style={{backgroundColor:THEME.PRIMARY_BACKGROUND_COLOR}}>
                        <StatusBar backgroundColor={THEME.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                        <AppRoutes />
                    </SafeAreaProvider>
                </NavigationContainer>
            </Provider>
        </>
    );
}


