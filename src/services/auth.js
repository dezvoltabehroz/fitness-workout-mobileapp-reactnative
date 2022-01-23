
import axiosInstance from './Interceptor';
import { apiHeaderConfiguration } from '../lib/utils/global'
import { EMPTY, TOKEN } from '../lib/utils/constants'
const Api = {
    generateUserId: function (data) {
        console.log(data);
        return axiosInstance.post('registration/generateUserId', { fcm_token: data.fcmToken, time_zone: data.time_zone }, apiHeaderConfiguration(EMPTY, EMPTY))
    },
    userPrefrences: function (data, token) {
        return axiosInstance.post('registration/updateUserPref', data, apiHeaderConfiguration(token, TOKEN))
    },
    refreshToken: function (data) {
        return axiosInstance.post('registration/refreshToken', data, apiHeaderConfiguration(EMPTY, EMPTY))
    },
    userLogin: function (data) {
        return axiosInstance.post('auth/loginUser', data, apiHeaderConfiguration(EMPTY, EMPTY))
    },
    forgetPassword: function (data) {
        return axiosInstance.post('auth/forgetPassword', data, apiHeaderConfiguration(EMPTY, EMPTY))
    },
    sendCodeOnEmail: function (data, token) {
        return axiosInstance.post('auth/sendCodeOnEmail', data, apiHeaderConfiguration(EMPTY, EMPTY))
    },
    updatePassword: function (data, token) {
        return axiosInstance.post('auth/updatePassword', data, apiHeaderConfiguration(token, TOKEN))
    },
    verifyCodeForReset: function (data) {
        return axiosInstance.post('auth/verifyCodeForResetPass', data, apiHeaderConfiguration(EMPTY, EMPTY))
    },
    changePassword: function (data, token) {
        return axiosInstance.post('auth/changePassword', data, apiHeaderConfiguration(token, TOKEN))
    },
    createUserWithEmailPassword: function (data) {
        return axiosInstance.post('registration/registerEmailPassword', data, apiHeaderConfiguration(EMPTY, EMPTY))
    },
    updateTimeZone: function (data, token) {
        console.log(data);
        return axiosInstance.post('registration/updateUserTimeZone', data, apiHeaderConfiguration(token, TOKEN))
    }
};

export default Api;