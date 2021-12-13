import React, { Component } from 'react';
import { StatusBar, Linking, Platform, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes'
import THEME from './assets/styles/theme.style';
import { Provider } from "react-redux";
import createStore from "./redux/CreateStore";
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { route } from './lib/utils/constants';
import Notifications from './Notifications';
import moment from 'moment';
const store = createStore();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
export default function App() {

    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState();
    LogBox.ignoreAllLogs();

    React.useEffect(() => {
        setInterval(() => {
            if (moment().format('HH:mm').toString() > "08:00" && moment().format('HH:mm').toString() < "09:00") {
                console.log("Scheduled Notification has been called at : ", new Date(Date.now() + 10 * 1000))
                Notifications.schduleNotification(new Date(Date.now() + 10 * 1000));
            }
            // Notifications.schduleNotification(new Date(Date.now() + 10 * 1000));
        }, 3600000);
    }, []);

    const onNavigationReady = () => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 700);
    }

    React.useEffect(() => {
        const restoreState = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();
                if (Platform.OS !== 'web' && initialUrl == null) {
                    const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                    const state = savedStateString ? JSON.parse(savedStateString) : undefined;
                    if (state !== undefined) {
                        setInitialState(state);
                    }
                }
            } finally {
                setIsReady(true);
            }
        };
        if (!isReady) {
            restoreState();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }
    return (
        <>
            <Provider store={store}>
                <NavigationContainer onReady={onNavigationReady}
                    initialState={initialState}
                    onStateChange={(state) => {
                        state.routes.forEach(element => {
                            if (element.name == route.APPINTRO) {
                                AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
                            }
                            else {
                                AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(null))
                            }
                        });
                    }}
                >
                    <SafeAreaProvider style={{ backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR }}>
                        <StatusBar backgroundColor={THEME.BAR_COLOR} barStyle={"light-content"} />
                        <AppRoutes />
                    </SafeAreaProvider>
                </NavigationContainer>
            </Provider>
        </>
    );
}


