
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
    updateProgressPhoto1:function (data,token) {
        return axios.post(`${BASE_URL}profile/uploadProgressPicture`, data, apiHeaderConfiguration(token, MULTIPART));
    }
};

export default Api;