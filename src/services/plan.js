
import axios from 'axios';
import { BASE_URL } from '../enviroments';
import { EMPTY, MULTIPART, TOKEN } from '../lib/utils/constants';
import { apiHeaderConfiguration } from '../lib/utils/global';
import axiosInstance from './Interceptor';

const Api = {
    getDietPlans: function (data, token) {
        return axiosInstance.post('plan/newGetDietPlans', data, apiHeaderConfiguration(token, TOKEN))
    },
    getFreeVideos: function (data, token) {
        return axiosInstance.post('plan/getFreeVideos', data, apiHeaderConfiguration(token, TOKEN))
    },
    getMealPlan: function (data, token) {
        return axiosInstance.post('plan/newMealPlans', data, apiHeaderConfiguration(token, TOKEN))
    },
    getWorkoutPlans: function (data, token) {
        return axiosInstance.post('plan/getWorkoutPlans', data, apiHeaderConfiguration(token, TOKEN))
    },
    getWorkoutPlanVideos: function (data, token) {
        return axiosInstance.post('plan/getWorkoutVideos', data, apiHeaderConfiguration(token, TOKEN))
    },

};

export default Api;