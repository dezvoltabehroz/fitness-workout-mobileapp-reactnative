
import axios from 'axios';
import { BASE_URL } from '../enviroments';
import { MULTIPART, TOKEN } from '../lib/utils/constants';
import { apiHeaderConfiguration } from '../lib/utils/global';
import axiosInstance from './Interceptor';

const Api = {
    updateProfile: function (data, token) {
        return axiosInstance.put('profile/updatePersonalInfo', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateMeasurement: function (data, token) {
        return axiosInstance.post('profile/updateUserMeasurement', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateProgressPhoto: function (data, token) {
        return axiosInstance.post('profile/uploadProgressPicture', data, apiHeaderConfiguration(token, MULTIPART))
    },
    updateProgressPhoto1: function (data, token) {
        return axios.post(`${BASE_URL}profile/uploadProgressPicture`, data, apiHeaderConfiguration(token, MULTIPART));
    },
    updateUserEmail: function (data, token) {
        return axiosInstance.put('profile/updateEmail', data, apiHeaderConfiguration(token, TOKEN))
    },
    isEmailExist: function (data, token) {
        return axiosInstance.post('profile/isEmailCheck', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateFcmToken: function (data, token) {
        return axiosInstance.post('profile/updateFcmToken', data, apiHeaderConfiguration(token, TOKEN))
    },
    stripeCheckOut: function (data, token) {
        return axiosInstance.post('stripe/checkout', data, apiHeaderConfiguration(token, TOKEN))
    },
    getFullProfile: function (data, token) {
        return axiosInstance.post('profile/getFullProfile', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateStartDateUserWorkout: function (data, token) {
        return axiosInstance.post('profile/updateStartDateUserWorkout', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateStartDateUserDiet: function (data, token) {
        return axiosInstance.post('profile/updateStartDateUserDiet', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateDailyDiet: function (data, token) {
        return axiosInstance.post('profile/updateDailyDiet', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateDailyWorkout: function (data, token) {
        return axiosInstance.post('profile/updateDayWorkout', data, apiHeaderConfiguration(token, TOKEN))
    },


};

export default Api;