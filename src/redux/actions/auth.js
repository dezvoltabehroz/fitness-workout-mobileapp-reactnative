import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS,
    SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
    IS_USER_VERIFIED_SUCCESS,
    LOADING_SUCCESS,
    USER_UPDATE_PROFILE_INFO_SUCCESS,
    USER_EMAIL_AND_PASSWORD_SUCCESS,
    HEALTH_AND_SEFATY_SUCCESS,
    CART_SUCCESS
} from '../types';
import { AuthServices, ProfileServices, RegisterUser } from '../../services';
import { Alert, Linking, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { clearAllLocalData, getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import { LOGO, route } from '../../lib/utils/constants';

const setUserProfile = (userData,authData, navigate) => {
    return async (dispatch) => {
        let token = await getLocalData(LOCAL_STORAGE_KEYS.userToken)
        let data = JSON.parse(token)
        if (userData) {
            let userDataJson={
                ...userData,
                user_id:authData.user_id,
                token:authData.token
            }
            await dispatch({ type: USER_LOGIN_SUCCESS, userData: userDataJson, userToken: data, loading: false });
            if (navigate != null)
                navigate(route.MAIN);
        }
    }
};

const getUserProfile = (userData, navigate) => {
    console.log(userData)
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        ProfileServices.getFullProfile({ user_id: userData.user_id }, userData.token)
            .then(async (responseData) => {
                console.log(responseData.data)
                if (responseData.data.success) {
                    await storeLocalData('USER', JSON.stringify(responseData.data.data))
                    await dispatch(setUserProfile(responseData.data.data,userData, navigate))
                }
                else {
                    // navigate(route.MAIN)
                    await dispatch(setUserProfile({},userData, navigate))
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }

            })
            .catch(err => { console.log(err) })
    };
};

const removeUser = (navigate) => {
    return async (dispatch) => {
        await clearAllLocalData();
       let id= await getLocalData(LOCAL_STORAGE_KEYS.user_id)
       console.log(id);
        await navigate(route.APPINTROZERO)
        setTimeout(() => {
        dispatch({ type: USER_LOGOUT_SUCCESS })
        }, 2000);
    }
};

const userLogin = (navigate) => {
    return (dispatch) => {
        requestUserPermission(dispatch, navigate);
        console.log("userLogin")
    }
}

const requestUserPermission = async function (dispatch, navigate) {
    const authorizationStatus = await messaging().requestPermission({
        alert: true,
        announcement: false,
        badge: true,
        carPlay: true,
        provisional: true,
        sound: true,
    });
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('User has provisional notification permissions.');
    } else {
        Alert.alert("Attension", "You need to allow push notification from settings",
            [
                { text: "OK", onPress: () => Linking.openSettings() }
            ])
        console.log('User has notification permissions disabled');
    }

    const authStatus = await messaging().hasPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        getFcmToken(dispatch, navigate);
    } else {
        console.log('Authorization status:', authStatus);
    }

}

const getFcmToken = async (dispatch, navigate) => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        const localFcm = await getLocalData(LOCAL_STORAGE_KEYS.fcmToken)
        if (fcmToken == JSON.parse(localFcm)) {
            console.log('fcm Token Macthder')
            const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
            AuthServices.refreshToken({ user_id: user_id })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        storeLocalData(LOCAL_STORAGE_KEYS.fcmToken, JSON.stringify(fcmToken))
                        storeLocalData(LOCAL_STORAGE_KEYS.userToken, JSON.stringify(res.data.data))
                        dispatch(getUserProfile({ user_id: user_id, token: res.data.data }, navigate))
                        // navigate(route.MAIN);
                    } else {
                        navigate(route.APPINTRO)
                    }

                })
                .catch((err) => {
                    console.log(err.response)
                })
        } else {
            console.log('fcm Token not Macthder')
            const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id)
            AuthServices.refreshToken({ user_id: user_id })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        let data = {
                            "user_id": JSON.parse(user_id),
                            "fcm_token": fcmToken
                        }
                        ProfileServices.updateFcmToken(data, res.data.data)
                            .then((response) => {
                                if (response.data.success) {
                                    storeLocalData(LOCAL_STORAGE_KEYS.fcmToken, JSON.stringify(fcmToken))
                                    storeLocalData(LOCAL_STORAGE_KEYS.userToken, JSON.stringify(res.data.data))
                                    // navigate(route.MAIN);
                                    dispatch(getUserProfile({ user_id: user_id, token: res.data.data }, navigate))
                                }
                            })
                            .catch((err) => {
                                console.log( "",err.response)
                            })
                    }
                    else {
                        navigate(route.APPINTRO)
                    }
                })
                .catch((err) => {
                    console.log(err.response)
                })

        }

    } else {
        console.log("Failed", "No token received");
    }
}

export const authActions = {
    setUserProfile,
    removeUser,
    getUserProfile,
    userLogin,
};