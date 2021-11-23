
import axios from 'axios';
import { BASE_URL } from '../enviroments';
import { EMPTY, MULTIPART, TOKEN } from '../lib/utils/constants';
import { apiHeaderConfiguration } from '../lib/utils/global';
import axiosInstance from './Interceptor';

const Api = {
    getQuestions: function (token) {
        return axiosInstance.post('survey/getQuestions', {}, apiHeaderConfiguration(token, TOKEN))
    },

    submitAnswers: function (data, token) {
        return axiosInstance.post('survey/submitAnswers', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateSurveySubmitDate: function (data, token) {
        return axiosInstance.post('survey/updateSurveySubmitDate', data, apiHeaderConfiguration(token, TOKEN))
    },
    isSurveySubmitted: function (data, token) {
        return axiosInstance.post('survey/isSurveySubmitted', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateSurveyAnswers: function (data, token) {
        return axiosInstance.post('survey/updateSurveyAnswers', data, apiHeaderConfiguration(token, TOKEN))
    },
    updateSurveyMeasurements: function (data, token) {
        return axiosInstance.post('survey/surveyMeasurement', data, apiHeaderConfiguration(token, TOKEN))
    },
    uploadSurveyImages: function (data, token) {
        return axios.post(`${BASE_URL}survey/uploadSurveyImages`, data, apiHeaderConfiguration(token, TOKEN))
    }

};

export default Api;